const express = require('express');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const { connectDB } = require('./config/db');
const Post = require('./models/Post');
const swaggerSetup = require('./swagger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', postRoutes);
app.use('/api', categoryRoutes);

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
