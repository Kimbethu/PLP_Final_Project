// locationMiddleware.js

const locationMiddleware = (req, res, next) => {
    // Check if user is authenticated and has the required permissions
    if (!req.user || req.user.role !== 'admin') { 
        return res.status(403).json({ message: 'Access denied. You do not have permission to access location data.' });
    }

    // Check if the request contains location data
    const { location } = req.body; 

    if (!location) {
        return res.status(400).json({ message: 'Location data is required.' });
    }

    console.log('Location data validated:', location);
    next();
};

module.exports = locationMiddleware;
