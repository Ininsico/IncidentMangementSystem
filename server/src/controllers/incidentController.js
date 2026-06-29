const Incident = require('../models/Incident');
const Comment = require('../models/Comment');
const Attachment = require('../models/Attachment');
const Notification = require('../models/Notification');
const AuditLog = require('../models/AuditLog');

async function createIncident(req, res) {
  try {
    const incident = await Incident.create({ ...req.body, reportedBy: req.user.uid });
    await AuditLog.create({ action: 'create', actor: req.user.uid, resource: 'Incident', resourceId: incident._id, details: { title: incident.title } });
    const populated = await Incident.findById(incident._id)
      .populate('reportedBy', 'name email')
      .populate('category', 'name color');
    return res.status(201).json({ success: true, data: populated });
  } catch (err) {
    console.error('Create incident error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function listIncidents(req, res) {
  try {
    const { page = 1, limit = 20, status, priority, category, assignedTo, reportedBy, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;
    if (assignedTo) query.assignedTo = assignedTo;
    if (reportedBy) query.reportedBy = reportedBy;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const incidents = await Incident.find(query)
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('category', 'name color')
      .populate('team', 'name')
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Incident.countDocuments(query);
    return res.status(200).json({ success: true, data: incidents, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('List incidents error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getIncident(req, res) {
  try {
    const incident = await Incident.findById(req.params.id)
      .populate('reportedBy', 'name email phone')
      .populate('assignedTo', 'name email')
      .populate('category', 'name color')
      .populate('team', 'name');
    if (!incident) return res.status(404).json({ error: 'Incident not found' });
    return res.status(200).json({ success: true, data: incident });
  } catch (err) {
    console.error('Get incident error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateIncident(req, res) {
  try {
    const allowed = ['title', 'description', 'priority', 'category', 'location', 'affectedService', 'dueDate', 'tags', 'team'];
    const updates = {};
    for (const field of allowed) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    const incident = await Incident.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('category', 'name color');
    if (!incident) return res.status(404).json({ error: 'Incident not found' });
    await AuditLog.create({ action: 'update', actor: req.user.uid, resource: 'Incident', resourceId: incident._id, details: updates });
    return res.status(200).json({ success: true, data: incident });
  } catch (err) {
    console.error('Update incident error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteIncident(req, res) {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) return res.status(404).json({ error: 'Incident not found' });
    await Comment.deleteMany({ incident: req.params.id });
    await Attachment.deleteMany({ incident: req.params.id });
    await AuditLog.create({ action: 'delete', actor: req.user.uid, resource: 'Incident', resourceId: req.params.id, details: { title: incident.title } });
    return res.status(200).json({ success: true, message: 'Incident deleted' });
  } catch (err) {
    console.error('Delete incident error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateIncidentStatus(req, res) {
  try {
    const { status, resolution } = req.body;
    const updates = { status };
    if (status === 'resolved') updates.resolvedAt = new Date();
    if (status === 'closed') updates.closedAt = new Date();
    if (resolution) updates.resolution = resolution;
    const incident = await Incident.findByIdAndUpdate(req.params.id, updates, { new: true })
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name email');
    if (!incident) return res.status(404).json({ error: 'Incident not found' });
    await Notification.create({
      recipient: incident.reportedBy._id,
      type: 'status_change',
      title: 'Incident status updated',
      message: `Incident "${incident.title}" is now ${status}`,
      incident: incident._id,
    });
    await AuditLog.create({ action: 'status_change', actor: req.user.uid, resource: 'Incident', resourceId: incident._id, details: { status } });
    return res.status(200).json({ success: true, data: incident });
  } catch (err) {
    console.error('Update status error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateIncidentPriority(req, res) {
  try {
    const { priority } = req.body;
    const incident = await Incident.findByIdAndUpdate(req.params.id, { priority }, { new: true });
    if (!incident) return res.status(404).json({ error: 'Incident not found' });
    await AuditLog.create({ action: 'priority_change', actor: req.user.uid, resource: 'Incident', resourceId: incident._id, details: { priority } });
    return res.status(200).json({ success: true, data: incident });
  } catch (err) {
    console.error('Update priority error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function assignIncident(req, res) {
  try {
    const { assignedTo } = req.body;
    const incident = await Incident.findByIdAndUpdate(req.params.id, { assignedTo }, { new: true })
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name email');
    if (!incident) return res.status(404).json({ error: 'Incident not found' });
    await Notification.create({
      recipient: assignedTo,
      type: 'incident_assigned',
      title: 'Incident assigned to you',
      message: `Incident "${incident.title}" has been assigned to you`,
      incident: incident._id,
    });
    await AuditLog.create({ action: 'assign', actor: req.user.uid, resource: 'Incident', resourceId: incident._id, details: { assignedTo } });
    return res.status(200).json({ success: true, data: incident });
  } catch (err) {
    console.error('Assign incident error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function addComment(req, res) {
  try {
    const comment = await Comment.create({ incident: req.params.id, author: req.user.uid, body: req.body.body, isInternal: req.body.isInternal || false });
    const populated = await Comment.findById(comment._id).populate('author', 'name email');
    const incident = await Incident.findById(req.params.id).populate('assignedTo', '_id');
    if (incident && incident.assignedTo && incident.assignedTo._id.toString() !== req.user.uid) {
      await Notification.create({
        recipient: incident.assignedTo._id,
        type: 'comment_added',
        title: 'New comment on incident',
        message: `${req.user.name || 'Someone'} commented on "${incident.title}"`,
        incident: incident._id,
      });
    }
    return res.status(201).json({ success: true, data: populated });
  } catch (err) {
    console.error('Add comment error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getComments(req, res) {
  try {
    const comments = await Comment.find({ incident: req.params.id })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: comments });
  } catch (err) {
    console.error('Get comments error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function addAttachment(req, res) {
  try {
    const attachment = await Attachment.create({ ...req.body, incident: req.params.id, uploadedBy: req.user.uid });
    return res.status(201).json({ success: true, data: attachment });
  } catch (err) {
    console.error('Add attachment error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAttachments(req, res) {
  try {
    const attachments = await Attachment.find({ incident: req.params.id }).populate('uploadedBy', 'name email');
    return res.status(200).json({ success: true, data: attachments });
  } catch (err) {
    console.error('Get attachments error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getIncidentStats(req, res) {
  try {
    const total = await Incident.countDocuments();
    const open = await Incident.countDocuments({ status: 'open' });
    const inProgress = await Incident.countDocuments({ status: 'in_progress' });
    const resolved = await Incident.countDocuments({ status: 'resolved' });
    const closed = await Incident.countDocuments({ status: 'closed' });
    const critical = await Incident.countDocuments({ priority: 'critical' });
    const high = await Incident.countDocuments({ priority: 'high' });
    const medium = await Incident.countDocuments({ priority: 'medium' });
    const low = await Incident.countDocuments({ priority: 'low' });
    const byCategory = await Incident.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
      { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
      { $project: { _id: 0, name: '$category.name', color: '$category.color', count: 1 } },
    ]);
    return res.status(200).json({ success: true, data: { total, open, inProgress, resolved, closed, byPriority: { critical, high, medium, low }, byCategory } });
  } catch (err) {
    console.error('Get stats error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getMyIncidents(req, res) {
  try {
    const incidents = await Incident.find({ reportedBy: req.user.uid })
      .populate('category', 'name color')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: incidents });
  } catch (err) {
    console.error('Get my incidents error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function searchIncidents(req, res) {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Search query is required' });
    const incidents = await Incident.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } },
        { affectedService: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } },
      ],
    })
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('category', 'name color')
      .limit(20);
    return res.status(200).json({ success: true, data: incidents });
  } catch (err) {
    console.error('Search incidents error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function exportIncidents(req, res) {
  try {
    const incidents = await Incident.find()
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('category', 'name color')
      .lean();
    return res.status(200).json({ success: true, data: incidents });
  } catch (err) {
    console.error('Export incidents error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function bulkCreateIncidents(req, res) {
  try {
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({ error: 'Array of incidents required' });
    }
    const incidents = req.body.map(item => ({ ...item, reportedBy: req.user.uid }));
    const created = await Incident.insertMany(incidents);
    return res.status(201).json({ success: true, data: created, count: created.length });
  } catch (err) {
    console.error('Bulk create error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function bulkUpdateStatus(req, res) {
  try {
    const { ids, status, resolution } = req.body;
    if (!Array.isArray(ids) || ids.length === 0 || !status) {
      return res.status(400).json({ error: 'ids array and status are required' });
    }
    const updates = { status };
    if (status === 'resolved') updates.resolvedAt = new Date();
    if (status === 'closed') updates.closedAt = new Date();
    if (resolution) updates.resolution = resolution;
    const result = await Incident.updateMany({ _id: { $in: ids } }, updates);
    return res.status(200).json({ success: true, modifiedCount: result.modifiedCount });
  } catch (err) {
    console.error('Bulk status update error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createIncident, listIncidents, getIncident, updateIncident, deleteIncident,
  updateIncidentStatus, updateIncidentPriority, assignIncident,
  addComment, getComments, addAttachment, getAttachments,
  getIncidentStats, getMyIncidents, searchIncidents, exportIncidents,
  bulkCreateIncidents, bulkUpdateStatus,
};
