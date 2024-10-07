// src/models/Post.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importe a instância de sequelize corretamente

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Post;
