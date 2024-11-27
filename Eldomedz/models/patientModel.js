const pool = require('../config/db');

// Create a new patient in the database
exports.createPatient = async (data) => {
  const sql = `
    INSERT INTO patients (name, email, password, phone, address, role, date_of_birth, gender, profile_image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  try {
    const [result] = await pool.execute(sql, [
      data.name,
      data.email,
      data.password,
      data.phone,
      data.address,
      'patient', // Default role for the patient
      data.date_of_birth, 
      data.gender,
      data.profile_image || null 
    ]);
    return result;
  } catch (error) {
       throw error;
  }
};

// Find a patient by email
exports.findByEmail = async (email) => {
  const sql = 'SELECT * FROM patients WHERE email = ?';
  try {
    const [rows] = await pool.execute(sql, [email]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Update patient profile details
exports.updatePatientProfile = async (id, data) => {
  const sql = `
    UPDATE patients SET name = ?, email = ?, phone = ?, address = ?, date_of_birth = ?, gender = ?, profile_image = ?
    WHERE id = ?
  `;
  try {
    const [result] = await pool.execute(sql, [
      data.name,
      data.email,
      data.phone,
      data.address,
      data.date_of_birth,
      data.gender,
      data.profile_image,
      id
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Fetch patient profile by ID
exports.getPatientProfile = async (id) => {
  if (!id) {
      throw new Error('Patient ID is undefined');
  }
  const sql = 'SELECT * FROM patients WHERE id = ?';
  try {
      const [rows] = await pool.execute(sql, [id]);
      return rows[0];
  } catch (error) {
      throw error;
  }
};
