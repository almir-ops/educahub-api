const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'sua_chave_secreta'; // Use um segredo seguro e configure no .env

// Registro de usuários
const register = async (req, res) => {
  const { name, email, password, type } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, type });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user', details: error.message });
  }
};

// Login de usuários
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(406).json({ error: 'Usuario não encontrado' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Usuario ou senha invalida' });

    const token = jwt.sign({ id: user.id, type: user.type }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login', details: error.message });
  }
};

const getUserProfileById = async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID do usuário dos parâmetros da URL
    console.log('ID do usuário recebido:', id); // Log para verificar o ID

    if (!id) {
      return res.status(400).json({ error: 'ID do usuário não fornecido' });
    }

    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } }); // Excluímos a senha
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao recuperar o perfil do usuário:', error);
    res.status(500).json({ error: 'Falha ao recuperar os dados do perfil', details: error.message });
  }
};


const updateUserProfileById = async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID do usuário dos parâmetros da URL
    console.log('ID do usuário recebido:', id); // Log para verificar o ID

    if (!id) {
      return res.status(400).json({ error: 'ID do usuário não fornecido' });
    }

    const { name, email, password } = req.body; // Obtém os dados do corpo da requisição

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualizamos apenas os campos enviados
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10); // Criptografa a senha

    await user.save(); // Salva as mudanças

    res.status(200).json({ message: 'Perfil atualizado com sucesso', user });
  } catch (error) {
    console.error('Erro ao atualizar o perfil do usuário:', error);
    res.status(500).json({ error: 'Falha ao atualizar o perfil', details: error.message });
  }
};


module.exports = { register, login, getUserProfileById, updateUserProfileById }
