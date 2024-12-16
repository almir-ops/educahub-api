const express = require('express');
const { register, login, getUserProfileById, updateUserProfileById } = require('../controllers/authController');

const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/profile/:id', getUserProfileById);
router.put('/auth/update/:id', updateUserProfileById);

module.exports = router;
