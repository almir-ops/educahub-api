const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: parseInt(process.env.DB_PORT),
  logging: false,
});

const connectDB = async () => {
  try {
    console.log('Attempting to connect to the database...');
    await sequelize.authenticate();
    console.log('Connected to the SQL Server database successfully.');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

module.exports = { sequelize, connectDB };
