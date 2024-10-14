const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./Category');

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
  image: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  categoryId: { // Adicionando o campo categoryId
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
  },
});

// Definindo as associações
Post.belongsTo(Category, {
  foreignKey: {
    name: 'categoryId',
    allowNull: false,
  },
});
Category.hasMany(Post, {
  foreignKey: 'categoryId',
});

module.exports = Post;
