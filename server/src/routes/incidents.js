const { Router } = require('express');
const {
  createIncident, listIncidents, getIncident, updateIncident, deleteIncident,
  updateIncidentStatus, updateIncidentPriority, assignIncident,
  addComment, getComments, addAttachment, getAttachments,
  getIncidentStats, getMyIncidents, searchIncidents, exportIncidents,
  bulkCreateIncidents, bulkUpdateStatus,
} = require('../controllers/incidentController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

const router = Router();

router.get('/stats', authenticate, getIncidentStats);
router.get('/my', authenticate, getMyIncidents);
router.get('/search', authenticate, searchIncidents);
router.get('/export', authenticate, authorize('admin', 'manager'), exportIncidents);
router.post('/bulk', authenticate, authorize('admin'), bulkCreateIncidents);
router.patch('/bulk-status', authenticate, authorize('admin', 'manager'), bulkUpdateStatus);
router.post('/', authenticate, createIncident);
router.get('/', authenticate, listIncidents);
router.get('/:id', authenticate, getIncident);
router.put('/:id', authenticate, updateIncident);
router.delete('/:id', authenticate, authorize('admin', 'manager'), deleteIncident);
router.patch('/:id/status', authenticate, updateIncidentStatus);
router.patch('/:id/priority', authenticate, updateIncidentPriority);
router.post('/:id/assign', authenticate, authorize('admin', 'manager'), assignIncident);
router.post('/:id/comments', authenticate, addComment);
router.get('/:id/comments', authenticate, getComments);
router.post('/:id/attachments', authenticate, addAttachment);
router.get('/:id/attachments', authenticate, getAttachments);

module.exports = router;
