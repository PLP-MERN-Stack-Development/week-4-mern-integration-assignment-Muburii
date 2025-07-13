const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { validatePost } = require('../middleware/validation');

// Get all posts
router.get('/', postController.getAllPosts);
// Get a specific post by ID or slug
router.get('/:idOrSlug', postController.getPostByIdOrSlug);
// Create a post
router.post('/', validatePost, postController.createPost);
// Update a post
router.put('/:id', validatePost, postController.updatePost);
// Delete a post
router.delete('/:id', postController.deletePost);
module.exports = router;
