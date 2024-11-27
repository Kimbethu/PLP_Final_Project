const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

// Profile routes
router.get('/', authMiddleware, profileController.getProfile);          
router.get('/edit', authMiddleware, profileController.getProfileEditMode); 
router.post('/update', authMiddleware, profileController.updateProfile);   

module.exports = router;