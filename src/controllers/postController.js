const Post = require('../models/Post');
const Category = require('../models/Category');

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
    const { title, content, author, categoryId } = req.body;

    // Verifique se todos os campos estão presentes
    if (!title || !content || !author || !categoryId) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Verificar se a categoria existe
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ error: 'Categoria não encontrada' });
    }

    // Criação do post com associação à categoria
    const newPost = await Post.create({
      title,
      content,
      author,
      categoryId
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post', details: error.message });
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
