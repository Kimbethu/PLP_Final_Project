const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Route to render the appointment booking page
router.get('/book', appointmentController.renderAppointmentPage);

// Route to create a new appointment
router.post('/book', appointmentController.createAppointment);

// Route to get all appointments for a patient
router.get('/', appointmentController.getAppointmentsByPatient);

// Route to view appointment details
router.get('/details/:id', appointmentController.getAppointmentDetails);

// Route to render the edit appointment page
router.get('/edit/:id', appointmentController.renderEditAppointmentPage);

// Route to update an appointment
router.put('/:id', appointmentController.updateAppointment);

// Route to delete an appointment
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;