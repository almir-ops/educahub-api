const Post = require('../models/Post');
const Category = require('../models/Category');
const User = require('../models/User'); // Importar o modelo User

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: [Category, User] }); // Incluindo associações
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, { include: [Category, User] }); // Incluindo associações
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve post' });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, author, categoryId, userId } = req.body;

    if (!title || !content || !author || !categoryId || !userId) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ error: 'Categoria não encontrada' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const newPost = await Post.create({
      title,
      content,
      author,
      categoryId,
      userId, // Associar ao usuário
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post', details: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, author, categoryId, userId } = req.body;
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ error: 'Categoria não encontrada' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    post.title = title;
    post.content = content;
    post.author = author;
    post.categoryId = categoryId;
    post.userId = userId; // Atualizar associação
    await post.save();

    res.status(200).json(post);
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
      res.status(404).json({ message: 'Post não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

const getUserPostsById = async (req, res) => {
  try {
    console.log('Início do getUserPostsById'); // Log para indicar o início da função

    const { iduser } = req.params; // Obtém o iduser dos parâmetros da rota
    console.log('ID do usuário recebido na rota:', iduser); // Log para verificar o iduser

    if (!iduser) {
      console.log('Erro: iduser não fornecido');
      return res.status(400).json({ error: 'ID do usuário não fornecido' });
    }

    console.log('Buscando posts do usuário no banco de dados...');
    const posts = await Post.findAll({
      where: { userId: iduser }, // Busca posts pelo ID do usuário fornecido
      include: [
        {
          model: Category,
          attributes: ['id', 'name'], // Apenas atributos relevantes da categoria
        },
      ],
    });

    console.log('Posts encontrados:', posts); // Log para verificar os posts recuperados

    if (posts.length === 0) {
      return res.status(404).json({ message: 'Nenhum post encontrado para este usuário' });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error('Erro no getUserPostsById:', error); // Log do erro completo para debugging
    res.status(500).json({
      error: 'Falha ao recuperar os posts do usuário',
      details: error.message,
    });
  }
};


module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost, getUserPostsById };