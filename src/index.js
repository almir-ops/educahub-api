// src/index.js

const express = require('express');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');
const { connectDB } = require('./config/db');
const Post = require('./models/Post');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Adiciona o prefixo '/api' para as rotas de post
app.use('/api', postRoutes);

// Conectar ao banco de dados e sincronizar o modelo
connectDB()
  .then(() => {
    Post.sync() // Cria a tabela 'Posts' se ela ainda não existir
      .then(() => {
        console.log('Post model synchronized successfully.');
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
      })
      .catch((error) => {
        console.error('Failed to synchronize Post model:', error);
      });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
