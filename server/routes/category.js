const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { validateCategory } = require('../middleware/validator');

// Get all categories
router.get('/', categoryController.getCategories); // Fixed: was getAllCategories

// Create a new category
router.post('/', validateCategory, categoryController.createCategory);

module.exports = router;