const AuditLog = require('../models/AuditLog');

async function listAuditLogs(req, res) {
  try {
    const { page = 1, limit = 50, action, resource } = req.query;
    const query = {};
    if (action) query.action = action;
    if (resource) query.resource = resource;
    const logs = await AuditLog.find(query)
      .populate('actor', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await AuditLog.countDocuments(query);
    return res.status(200).json({ success: true, data: logs, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('List audit logs error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { listAuditLogs };
