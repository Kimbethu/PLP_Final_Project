const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login Route
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});
router.post('/login', authController.login);

// Register Route
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});
router.post('/register', authController.register);

// Logout Route
router.post('/logout', authController.logout);

module.exports = router;
