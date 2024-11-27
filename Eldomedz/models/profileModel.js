const mysql = require('mysql2/promise');
require('dotenv').config(); 

// Create a MySQL connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,       
  user: process.env.DB_USER,       
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,    
});

class Profile {
    static async findUserById(userId) {
    try {
      const [rows] = await pool.query('SELECT * FROM patients WHERE id = ?', [userId]);
      return rows[0]; 
    } catch (error) {
      throw new Error('Error fetching user by ID: ' + error.message);
    }
  }

  // Method to update a user's profile
  static async updateUserProfile(userId, data) {
    const { name, email, phone, address } = data;
    try {
      const [result] = await pool.query(
        'UPDATE patients SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
        [name, email, phone, address, userId]
      );
      return result; 
    } catch (error) {
      throw new Error('Error updating user profile: ' + error.message);
    }
  }
}

module.exports = Profile;
