const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./Category');
const User = require('./User'); // Importar o modelo User

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
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
  },
  userId: { // Adicionando o campo de referência ao User
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});

// Relacionamentos
Post.belongsTo(Category, {
  foreignKey: {
    name: 'categoryId',
    allowNull: false,
  },
});
Category.hasMany(Post, {
  foreignKey: 'categoryId',
});

Post.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
User.hasMany(Post, {
  foreignKey: 'userId',
});

module.exports = Post;
