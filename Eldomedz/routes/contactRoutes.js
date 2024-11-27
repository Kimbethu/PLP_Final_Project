const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route to render the contact form
router.get('/', (req, res) => {
    res.render('contact', { title: 'Contact Us', layout: 'layout' });
});

// Route to handle form submission
router.post('/', contactController.handleContactForm);

module.exports = router;
