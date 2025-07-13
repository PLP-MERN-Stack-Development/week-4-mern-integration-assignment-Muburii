const { body, validationResult } = require('express-validator');

// Post validation rules
exports.validatePost = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  
  body('content')
    .notEmpty().withMessage('Content is required'),

  body('category')
    .notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Category must be a valid ID'),

  body('author')
    .notEmpty().withMessage('Author is required')
    .isMongoId().withMessage('Author must be a valid ID'),

  // handle errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Category validation rules
exports.validateCategory = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),

  body('description')
    .optional()
    .isLength({ max: 300 }).withMessage('Description cannot exceed 300 characters'),

  // handle errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];