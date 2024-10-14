const { sequelize, connectDB } = require('./db');
const Post = require('../models/Post');
const Category = require('../models/Category');

Category.hasMany(Post, { foreignKey: 'categoryId' });
Post.belongsTo(Category, { foreignKey: 'categoryId' });

const syncDatabase = async () => {
  try {
    await connectDB(); 
    await sequelize.sync({ force: false, alter: false });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

syncDatabase();
