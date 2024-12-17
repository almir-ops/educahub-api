const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

console.log('Database Name:', process.env.DB_NAME);
console.log('Database User:', process.env.DB_USER);
console.log('Database Password:', process.env.DB_PASSWORD); // Cuidado ao exibir senhas no console em produção!
console.log('Database Host:', process.env.DB_HOST);
console.log('Database Port:', process.env.DB_PORT);
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
