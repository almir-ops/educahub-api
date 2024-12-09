const { sequelize, connectDB } = require('./db');
const Post = require('../models/Post');
const Category = require('../models/Category');
const User = require('../models/User');

Category.hasMany(Post, { foreignKey: 'categoryId' });
Post.belongsTo(Category, { foreignKey: 'categoryId' });

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

const syncDatabase = async () => {
  try {
    await connectDB(); 
    await sequelize.sync({ force: true, alter: false });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

syncDatabase();
