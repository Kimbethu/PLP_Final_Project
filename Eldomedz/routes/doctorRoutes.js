const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Route to render the add doctor form
router.get('/add', (req, res) => res.render('add_doctor', { title: 'Add Doctor' }));

// Route to handle the creation of a new doctor
router.post('/add', doctorController.createDoctor);

// Route to fetch all doctors and render them in a view
router.get('/', doctorController.getAllDoctors);

// Route to render the find doctor page
router.get('/find', doctorController.findDoctors); 

module.exports = router;
