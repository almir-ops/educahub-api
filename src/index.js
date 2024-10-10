
const express = require('express');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');
const { connectDB } = require('./config/db');
const Post = require('./models/Post');
const swaggerSetup = require('./swagger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api', postRoutes);

swaggerSetup(app);

connectDB()
  .then(() => {
    Post.sync() 
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
