const { Router } = require('express');
const { createTeam, listTeams, getTeam, updateTeam, deleteTeam, addTeamMember, removeTeamMember } = require('../controllers/teamController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

const router = Router();

router.post('/', authenticate, authorize('admin'), createTeam);
router.get('/', authenticate, listTeams);
router.get('/:id', authenticate, getTeam);
router.put('/:id', authenticate, authorize('admin'), updateTeam);
router.delete('/:id', authenticate, authorize('admin'), deleteTeam);
router.post('/:id/members', authenticate, authorize('admin'), addTeamMember);
router.delete('/:id/members/:userId', authenticate, authorize('admin'), removeTeamMember);

module.exports = router;
