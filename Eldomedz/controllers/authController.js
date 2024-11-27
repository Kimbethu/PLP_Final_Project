const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Patient = require('../models/patientModel');
const path = require('path');
require('dotenv').config();

// Function to validate password
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Register function
const register = async (req, res) => {
    const { name, email, password, phone, address, date_of_birth, gender } = req.body;
    const profileImage = req.files && req.files.profile_image;

    if (!password) {
        req.flash('error', "Password is required.");
        return res.redirect('/auth/register');
    }

    try {
        if (!validatePassword(password)) {
            req.flash('error', 'Password must meet strength requirements.');
            return res.redirect('/auth/register');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let profileImagePath = null;
        if (profileImage) {
            const uploadPath = path.join(__dirname, '../uploads', profileImage.name);
            await profileImage.mv(uploadPath);
            profileImagePath = `/uploads/${profileImage.name}`;
        }

        await Patient.createPatient({
            name, email, password: hashedPassword, phone, address, date_of_birth, gender, profile_image: profileImagePath,
        });

        req.flash('success', 'Registration successful. Please log in.');
        res.redirect('/auth/login');
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            req.flash('error', 'Email already exists.');
        } else {
            console.error('Registration error:', error);
            req.flash('error', 'Failed to register.');
        }
        res.redirect('/auth/register');
    }
};

// Login function
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        req.flash('error', "Email and password are required.");
        return res.redirect('/auth/login');
    }

    try {
        const patient = await Patient.findByEmail(email);
        if (!patient || !(await bcrypt.compare(password, patient.password))) {
            req.flash('error', "Invalid email or password.");
            return res.redirect('/auth/login');
        }

        req.session.userId = patient.id;

        const token = jwt.sign({ id: patient.id, email: patient.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        req.flash('success', "Login successful.");
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'Login failed. Please try again.');
        res.redirect('/auth/login');
    }
};

// Logout function
const logout = (req, res) => {
    req.flash('success', 'Logged out successfully.');
    res.clearCookie('token');
    req.session.destroy(err => {
        if (err) console.error('Logout error:', err);
        res.redirect('/auth/login');
    });
};

module.exports = { register, login, logout };
