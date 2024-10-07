const Post = require('../models/Post');

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve post' });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = await Post.create({ title, content, author });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create post' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const post = await Post.findByPk(req.params.id);
    if (post) {
      post.title = title;
      post.content = content;
      post.author = author;
      await post.save();
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update post' });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      await post.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
