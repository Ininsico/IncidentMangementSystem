const { Router } = require('express');
const { listNotifications, markAsRead, markAllAsRead, getUnreadCount } = require('../controllers/notificationController');
const { authenticate } = require('../middleware/auth');

const router = Router();

router.get('/', authenticate, listNotifications);
router.get('/unread-count', authenticate, getUnreadCount);
router.put('/:id/read', authenticate, markAsRead);
router.put('/read-all', authenticate, markAllAsRead);

module.exports = router;
