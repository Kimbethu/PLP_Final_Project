const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');

// Function to format date and time
const formatDateTime = (appointmentDate) => {
    const dateObj = new Date(appointmentDate);
    return {
        date: dateObj.toISOString().split('T')[0],
        time: dateObj.toISOString().split('T')[1].substring(0, 5)
    };
};

// Controller to render the appointment booking page (GET /appointment/book)
exports.renderAppointmentPage = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        const patient_id = req.user?.id;

        if (!patient_id) {
            return res.status(400).json({ message: 'Patient ID is required.' });
        }

        const appointments = await Appointment.findAppointmentsByPatient(patient_id);
        const formattedAppointments = appointments.map(appointment => ({
            ...appointment,
            ...formatDateTime(appointment.appointment_date)
        }));

        res.render('appointment', { doctors, appointments: formattedAppointments });
    } catch (error) {
        console.error('Error fetching doctors or appointments:', error);
        res.status(500).json({ message: 'Failed to fetch doctors or appointments. Please try again later.' });
    }
};

// Controller to create an appointment (POST /appointment/book)
exports.createAppointment = async (req, res) => {
    const patient_id = req.user?.id;
    const { doctor_id, appointment_date, appointment_time } = req.body;

    if (!patient_id || !doctor_id || !appointment_date || !appointment_time) {
        return res.status(400).json({ message: 'All fields (patient, doctor, date, and time) are required.' });
    }

    const completeAppointmentDate = `${appointment_date}T${appointment_time}`;

    try {
        const result = await Appointment.createAppointment({
            patient_id,
            doctor_id,
            appointment_date: completeAppointmentDate,
            status: 'pending'
        });

        res.status(201).json({
            message: 'Appointment created successfully',
            appointmentId: result.insertId
        });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ message: 'Failed to create appointment. Please try again.' });
    }
};

// Controller to fetch all appointments for a patient (GET /appointments)
exports.getAppointmentsByPatient = async (req, res) => {
    const patient_id = req.user?.id;

    if (!patient_id) {
        return res.status(400).json({ message: 'Patient ID is required.' });
    }

    try {
        const appointments = await Appointment.findAppointmentsByPatient(patient_id);
        const formattedAppointments = appointments.map(appointment => ({
            ...appointment,
            ...formatDateTime(appointment.appointment_date)
        }));

        res.status(200).json(formattedAppointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Failed to fetch appointments. Please try again later.' });
    }
};

// Controller to render specific appointment details (GET /appointment/details/:id)
exports.getAppointmentDetails = async (req, res) => {
    const { id } = req.params;
    const patient_id = req.user?.id;

    if (!patient_id) {
        return res.status(400).json({ message: 'Patient ID is required.' });
    }

    try {
        const appointment = await Appointment.findAppointmentById(id, patient_id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        const { date, time } = formatDateTime(appointment.appointment_date);

        res.render('appointmentDetails', {
            id: appointment.id,
            doctor_name: appointment.doctor_name,
            doctor_specialization: appointment.doctor_specialization,
            date,
            time,
            status: appointment.status
        });
    } catch (error) {
        console.error('Error fetching appointment details:', error);
        res.status(500).json({ message: 'Failed to fetch appointment details.' });
    }
};

// Controller to render the edit appointment page (GET /appointment/edit/:id)
exports.renderEditAppointmentPage = async (req, res) => {
    const { id } = req.params;
    const patient_id = req.user?.id;

    try {
        const appointment = await Appointment.findAppointmentById(id, patient_id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        const { date, time } = formatDateTime(appointment.appointment_date);

        res.render('editappointment', {
            id: appointment.id,
            doctor_id: appointment.doctor_id,
            doctor_name: appointment.doctor_name,
            doctor_specialization: appointment.doctor_specialization,
            date,
            time,
            status: appointment.status
        });
    } catch (error) {
        console.error('Error fetching appointment for editing:', error);
        res.status(500).json({ message: 'Failed to fetch appointment for editing.' });
    }
};

// Controller to update an appointment (PUT /appointment/:id)
exports.updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { doctor_id, appointment_date, appointment_time, status } = req.body;

    if (!doctor_id || !appointment_date || !appointment_time || !status) {
        return res.status(400).json({ message: 'All fields (doctor, date, time, status) are required.' });
    }

    try {
        const completeAppointmentDate = `${appointment_date}T${appointment_time}`;
        const result = await Appointment.updateAppointment(id, {
            doctor_id,
            appointment_date: completeAppointmentDate,
            status
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        res.status(200).json({ message: 'Appointment updated successfully.' });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ message: 'Failed to update appointment. Please try again later.' });
    }
};

// Controller to delete an appointment (DELETE /appointment/:id)
exports.deleteAppointment = async (req, res) => {
    const { id } = req.params;
    const patient_id = req.user?.id;

    try {
        const result = await Appointment.deleteAppointment(id, patient_id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully.' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ message: 'Failed to delete appointment. Please try again later.' });
    }
};
