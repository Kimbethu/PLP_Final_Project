// controllers/locationController.js
const locationModel = require('../models/locationModel');

exports.getLocations = async (req, res) => {
    try {
        const locations = await locationModel.getLocationsForMap();

        res.render('locations', {
            title: 'Our Locations',
            locations: locations || [],
        });
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }
};
