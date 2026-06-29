const { Router } = require('express');
const { getDashboardStats, getRecentIncidents } = require('../controllers/dashboardController');
const { authenticate } = require('../middleware/auth');

const router = Router();

router.get('/stats', authenticate, getDashboardStats);
router.get('/recent-incidents', authenticate, getRecentIncidents);

module.exports = router;
