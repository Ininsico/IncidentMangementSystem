const User = require('../models/User');
const Incident = require('../models/Incident');

async function listUsers(req, res) {
  try {
    const { page = 1, limit = 20, role, isActive, search } = req.query;
    const query = {};
    if (role) query.role = role;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await User.countDocuments(query);
    return res.status(200).json({ success: true, data: users, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('List users error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error('Get user error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateUser(req, res) {
  try {
    const allowed = ['name', 'phone', 'role', 'isActive'];
    const updates = {};
    for (const field of allowed) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error('Update user error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json({ success: true, message: 'User deactivated' });
  } catch (err) {
    console.error('Delete user error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateUserRole(req, res) {
  try {
    const { role } = req.body;
    if (!['user', 'admin', 'manager'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error('Update role error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getUserIncidents(req, res) {
  try {
    const incidents = await Incident.find({ reportedBy: req.params.id }).sort({ createdAt: -1 }).populate('category', 'name color');
    return res.status(200).json({ success: true, data: incidents });
  } catch (err) {
    console.error('Get user incidents error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function exportUsers(req, res) {
  try {
    const users = await User.find({ isActive: true }).select('-password -__v').lean();
    return res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error('Export users error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { listUsers, getUser, updateUser, deleteUser, updateUserRole, getUserIncidents, exportUsers };
