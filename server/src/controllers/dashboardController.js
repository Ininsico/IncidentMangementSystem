const Incident = require('../models/Incident');
const User = require('../models/User');

async function getDashboardStats(req, res) {
  try {
    const totalIncidents = await Incident.countDocuments();
    const openIncidents = await Incident.countDocuments({ status: 'open' });
    const inProgressIncidents = await Incident.countDocuments({ status: 'in_progress' });
    const resolvedIncidents = await Incident.countDocuments({ status: 'resolved' });
    const closedIncidents = await Incident.countDocuments({ status: 'closed' });
    const criticalIncidents = await Incident.countDocuments({ priority: 'critical' });
    const totalUsers = await User.countDocuments({ isActive: true });
    const unassignedIncidents = await Incident.countDocuments({ assignedTo: null, status: { $ne: 'closed' } });

    const incidentsByDay = await Incident.aggregate([
      { $match: { createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalIncidents, openIncidents, inProgressIncidents, resolvedIncidents, closedIncidents,
        criticalIncidents, totalUsers, unassignedIncidents,
        incidentsByDay,
      },
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getRecentIncidents(req, res) {
  try {
    const incidents = await Incident.find()
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('category', 'name color')
      .sort({ createdAt: -1 })
      .limit(10);
    return res.status(200).json({ success: true, data: incidents });
  } catch (err) {
    console.error('Recent incidents error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getDashboardStats, getRecentIncidents };
