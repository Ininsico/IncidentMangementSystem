const Notification = require('../models/Notification');

async function listNotifications(req, res) {
  try {
    const notifications = await Notification.find({ recipient: req.user.uid })
      .populate('incident', 'title')
      .sort({ createdAt: -1 })
      .limit(50);
    return res.status(200).json({ success: true, data: notifications });
  } catch (err) {
    console.error('List notifications error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function markAsRead(req, res) {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user.uid },
      { isRead: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    return res.status(200).json({ success: true, data: notification });
  } catch (err) {
    console.error('Mark as read error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function markAllAsRead(req, res) {
  try {
    await Notification.updateMany({ recipient: req.user.uid, isRead: false }, { isRead: true });
    return res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (err) {
    console.error('Mark all as read error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getUnreadCount(req, res) {
  try {
    const count = await Notification.countDocuments({ recipient: req.user.uid, isRead: false });
    return res.status(200).json({ success: true, data: { unreadCount: count } });
  } catch (err) {
    console.error('Unread count error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { listNotifications, markAsRead, markAllAsRead, getUnreadCount };
