const Post = require('../models/post');
const Category = require('../models/category');

// Get all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('category', 'name').populate('author', 'username');
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// Get a specific post by ID or slug
exports.getPostByIdOrSlug = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const post = await Post.findOne({ 
      $or: [{ _id: idOrSlug }, { slug: idOrSlug }] 
    }).populate('category', 'name').populate('author', 'username');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Create a new post
exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

// Update a post
exports.updatePost = async (req, res, next) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Delete a post
exports.deletePost = async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};