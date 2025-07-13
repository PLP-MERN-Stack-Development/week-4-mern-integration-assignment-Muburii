const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { validateCategory } = require('../middleware/validation');
// Get all categories
router.get('/', categoryController.getAllCategories);
// Create a new category
router.post('/', validateCategory, categoryController.createCategory);
module.exports = router;
