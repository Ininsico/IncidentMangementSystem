const { Router } = require('express');
const { deleteAttachment } = require('../controllers/attachmentController');
const { authenticate } = require('../middleware/auth');

const router = Router();

router.delete('/:id', authenticate, deleteAttachment);

module.exports = router;
