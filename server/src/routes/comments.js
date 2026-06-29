const { Router } = require('express');
const { updateComment, deleteComment } = require('../controllers/commentController');
const { authenticate } = require('../middleware/auth');

const router = Router();

router.put('/:id', authenticate, updateComment);
router.delete('/:id', authenticate, deleteComment);

module.exports = router;
