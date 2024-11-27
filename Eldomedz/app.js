const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const path = require('path');
const authMiddleware = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

// Session Middleware 
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Initialize connect-flash
app.use(flash());

// Flash Messages Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    next();
});

// Set user in res.locals if authenticated
app.use((req, res, next) => {
    res.locals.user = req.user || null; 
    next();
});

// Set view engine to EJS
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// Route imports
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const profileRoutes = require('./routes/profileRoutes');
const dashboardRoutes = require('./routes/dashboardRoute');
const locationRoutes = require('./routes/locationRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Use routes
app.use('/', dashboardRoutes);
app.use('/auth', authRoutes);

// AuthMiddleware to protect routes that require authentication
app.use('/profile', authMiddleware, profileRoutes);
app.use('/appointment', authMiddleware, appointmentRoutes); 
app.use('/doctors', authMiddleware, doctorRoutes);
app.use('/locations', authMiddleware, locationRoutes);
app.use('/contact', contactRoutes);

// Homepage
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Eldomedz - Telemedicine Platform', 
        content: `<section class="intro">
                    <h2>Connecting You to Healthcare Providers Virtually</h2>
                    <p>Book appointments and consult with doctors online with ease.</p>
                  </section>` 
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});