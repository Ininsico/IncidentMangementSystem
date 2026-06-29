const { Router } = require('express');
const { createCategory, listCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

const router = Router();

router.post('/', authenticate, authorize('admin'), createCategory);
router.get('/', authenticate, listCategories);
router.get('/:id', authenticate, getCategory);
router.put('/:id', authenticate, authorize('admin'), updateCategory);
router.delete('/:id', authenticate, authorize('admin'), deleteCategory);

module.exports = router;
