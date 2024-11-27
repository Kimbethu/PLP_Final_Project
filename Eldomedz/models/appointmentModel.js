const pool = require('../config/db');  

// Method to create an appointment
exports.createAppointment = async (appointment) => {
    const query = 'INSERT INTO appointments (patient_id, doctor_id, appointment_date, status) VALUES (?, ?, ?, ?)';
    const [result] = await pool.execute(query, [
        appointment.patient_id,
        appointment.doctor_id,
        appointment.appointment_date,
        appointment.status
    ]);
    return result;
};

// Method to find appointments by patient with more doctor details
exports.findAppointmentsByPatient = async (patient_id) => {
    const query = `
        SELECT 
            a.id, 
            a.appointment_date, 
            a.status, 
            d.doctor_name AS doctor_name,
            d.doctor_specialization AS doctor_specialization  -- Include specialization
        FROM appointments a
        JOIN doctors d ON a.doctor_id = d.doctor_id
        WHERE a.patient_id = ?
    `;
    const [appointments] = await pool.execute(query, [patient_id]);

    // Format the appointment date
    return appointments.map(appointment => {
        const appointmentDate = new Date(appointment.appointment_date);
        const date = appointmentDate.toISOString().split('T')[0]; 
        const time = appointmentDate.toISOString().split('T')[1].substring(0, 5);
        return {
            ...appointment,
            date: date,
            time: time
        };
    });
};

// Method to find a specific appointment by ID
exports.findAppointmentById = async (id) => {
    const query = 'SELECT * FROM appointments WHERE id = ?';
    const [appointment] = await pool.execute(query, [id]);
    return appointment[0];
};

// Method to update an appointment
exports.updateAppointment = async (id, appointment) => {
    const query = 'UPDATE appointments SET doctor_id = ?, appointment_date = ? WHERE id = ?';
    const [result] = await pool.execute(query, [
        appointment.doctor_id,
        appointment.appointment_date,
        id
    ]);
    return result;
};

// Method to delete an appointment
exports.deleteAppointment = async (id) => {
    const query = 'DELETE FROM appointments WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result;
};
