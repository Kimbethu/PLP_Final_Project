const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        console.log('No token found');
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.session.userId = decoded.id;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        const message = error.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
        return res.status(403).json({ message });
    }
};

module.exports = authMiddleware;
