const express = require('express');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');
const { connectDB } = require('./config/db');
const Post = require('./models/Post');
const swaggerSetup = require('./swagger');
const cors = require('cors'); // Importando o CORS

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Usando o middleware cors para permitir requisições de qualquer origem
app.use(cors());

// Definindo a configuração de rotas
app.use(express.json());
app.use('/api', postRoutes);
app.use('/api', categoryRoutes);
app.use('/api', authRoutes);

// Configuração do Swagger
swaggerSetup(app);

const startServer = async () => {
  try {
    await connectDB();
    await Post.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize the server:', error);
  }
};

startServer();

module.exports = { app, startServer };
