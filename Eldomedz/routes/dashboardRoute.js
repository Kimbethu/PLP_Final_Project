const express = require('express');
const router = express.Router();
const appointmentModel = require('../models/appointmentModel'); 
const authMiddleware = require('../middleware/authMiddleware'); 

// Dashboard Route
router.get('/dashboard', authMiddleware, async (req, res) => {
    const successMessage = req.flash('success'); 

    try {
        // Fetch appointments for the logged-in user
        const appointments = await appointmentModel.findAppointmentsByPatient(req.user.id); 

        res.render('dashboard', {
            title: 'Eldomedz Dashboard',
            user: req.user, 
            message: successMessage,
            appointments: appointments || []
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.render('dashboard', {
            title: 'Eldomedz Dashboard',
            user: req.user,
            message: successMessage,
            appointments: [] 
        });
    }
});

module.exports = router;
