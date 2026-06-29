const { Router } = require('express');
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

const router = Router();

router.get('/', authenticate, authorize('admin'), getSettings);
router.put('/', authenticate, authorize('admin'), updateSettings);

module.exports = router;
