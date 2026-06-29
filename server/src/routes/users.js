const { Router } = require('express');
const { listUsers, getUser, updateUser, deleteUser, updateUserRole, getUserIncidents, exportUsers } = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

const router = Router();

router.get('/', authenticate, authorize('admin', 'manager'), listUsers);
router.get('/export', authenticate, authorize('admin'), exportUsers);
router.get('/:id', authenticate, getUser);
router.put('/:id', authenticate, authorize('admin'), updateUser);
router.delete('/:id', authenticate, authorize('admin'), deleteUser);
router.put('/:id/role', authenticate, authorize('admin'), updateUserRole);
router.get('/:id/incidents', authenticate, getUserIncidents);

module.exports = router;
