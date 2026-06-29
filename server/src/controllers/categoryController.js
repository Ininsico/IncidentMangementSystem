const Category = require('../models/Category');

async function createCategory(req, res) {
  try {
    const category = await Category.create(req.body);
    return res.status(201).json({ success: true, data: category });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Category already exists' });
    console.error('Create category error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function listCategories(req, res) {
  try {
    const categories = await Category.find().sort({ name: 1 });
    return res.status(200).json({ success: true, data: categories });
  } catch (err) {
    console.error('List categories error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getCategory(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    return res.status(200).json({ success: true, data: category });
  } catch (err) {
    console.error('Get category error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateCategory(req, res) {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    return res.status(200).json({ success: true, data: category });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Category name already exists' });
    console.error('Update category error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteCategory(req, res) {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    return res.status(200).json({ success: true, message: 'Category deleted' });
  } catch (err) {
    console.error('Delete category error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createCategory, listCategories, getCategory, updateCategory, deleteCategory };
