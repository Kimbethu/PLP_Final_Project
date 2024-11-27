// routes/locationRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const locationController = require('../controllers/locationController');

// Route to render the locations page with authentication
router.get('/', authMiddleware, locationController.getLocations);

module.exports = router;
