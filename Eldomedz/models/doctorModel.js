const pool = require('../config/db');

// Function to create a new doctor
exports.createDoctor = async (data) => {
    try {
        const sql = 'INSERT INTO doctors (doctor_name, email, doctor_specialization, availability, role) VALUES (?, ?, ?, ?, ?)';
        const [result] = await pool.execute(sql, [
            data.name,
            data.email,
            data.specialization,
            JSON.stringify(data.availability),
            'doctor' 
        ]);
        return result;
    } catch (error) {
        console.error('Error creating doctor:', error);
        throw error; 
    }
};

// Function to fetch all doctors
exports.findAll = async () => {
    try {
        const sql = 'SELECT * FROM doctors';
        const [rows] = await pool.execute(sql);
        return rows; 
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw error; 
    }
};

// Function to find a doctor by ID
exports.findById = async (doctorId) => {
    try {
        const sql = 'SELECT * FROM doctors WHERE doctor_id = ?';
        const [rows] = await pool.execute(sql, [doctorId]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching doctor by ID:', error);
        throw error; 
    }
};
