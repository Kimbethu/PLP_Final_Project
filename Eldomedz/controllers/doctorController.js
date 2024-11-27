const Doctor = require('../models/doctorModel');

// Controller to create a doctor
exports.createDoctor = async (req, res) => {
    const { doctor_name, email, doctor_specialization, availability } = req.body;

    // Basic validation
    if (!doctor_name || !email || !doctor_specialization || !availability) {
        return res.status(400).json({ message: 'Name, email, specialization, and availability are required.' });
    }

    try {
        const result = await Doctor.createDoctor({ doctor_name, email, doctor_specialization, availability });

        if (!result || result.affectedRows === 0) {
            return res.status(500).json({ message: 'Failed to create doctor' });
        }

        // Return success response with the doctor ID
        res.status(201).json({ message: 'Doctor created successfully', doctorId: result.insertId });
    } catch (error) {
        console.error('Error creating doctor:', error);
        res.status(500).json({ message: 'An error occurred while creating the doctor. Please try again later.' });
    }
};

// Controller to fetch all doctors and render them in a view
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll(); // Fetch all doctors from the model
        res.render('doctors', { doctors: doctors, title: 'Doctors List' }); // Pass doctors to the view
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).render('error', { message: 'An error occurred while fetching doctors. Please try again later.' });
    }
};

// Controller to render the find doctors page
exports.findDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll(); // Fetch all doctors from the model
        res.render('findDoctors', { doctors: doctors, title: 'Find a Doctor' }); // Render the findDoctors view
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).render('error', { message: 'An error occurred while fetching doctors. Please try again later.' });
    }
};
