const express = require('express');
const { getAllPosts, createPost, updatePost, deletePost, getPostById } = require('../controllers/postController');
const router = express.Router();

router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

module.exports = router;
