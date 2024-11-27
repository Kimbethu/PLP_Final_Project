// controllers/contactController.js
exports.handleContactForm = (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required.' });
    }
    // Return a success response
    res.status(200).json({ message: 'Your message has been sent successfully!' });
};
