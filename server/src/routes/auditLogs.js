const { Router } = require('express');
const { listAuditLogs } = require('../controllers/auditLogController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

const router = Router();

router.get('/', authenticate, authorize('admin'), listAuditLogs);

module.exports = router;
