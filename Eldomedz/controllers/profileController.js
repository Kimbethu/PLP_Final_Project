const User = require('../models/profileModel'); 

// Controller to get user profile
exports.getProfile = async (req, res) => {
    const user_id = req.user.id;

    try {
        const user = await User.findUserById(user_id);  // Fetch user data by ID
        if (!user) {
            return res.status(404).render('error', { message: 'User not found.' });
        }

        res.render('profile', {
            title: 'Profile',
            user,  // Pass user data to the view
            editMode: false  // View mode
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).render('error', { message: 'Failed to fetch profile. Please try again later.' });
    }
};

// Controller to display profile in edit mode
exports.getProfileEditMode = async (req, res) => {
    const user_id = req.user.id;

    try {
        const user = await User.findUserById(user_id);  // Fetch user data by ID
        if (!user) {
            return res.status(404).render('error', { message: 'User not found.' });
        }

        res.render('profile', {
            title: 'Edit Profile',
            user,  // Pass user data to the view
            editMode: true  // Edit mode
        });
    } catch (error) {
        console.error('Error loading edit profile:', error);
        res.status(500).render('error', { message: 'Failed to load edit profile. Please try again later.' });
    }
};

// Controller to update user profile
exports.updateProfile = async (req, res) => {
    const user_id = req.user.id;
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
        return res.status(400).render('profile', {
            title: 'Edit Profile',
            user: { id: user_id, name, email, phone, address },
            editMode: true,
            errorMessage: 'All fields (name, email, phone, address) are required.'
        });
    }

    try {
        const result = await User.updateUserProfile(user_id, { name, email, phone, address });

        if (result.affectedRows === 0) {
            return res.status(404).render('error', { message: 'User not found.' });
        }

        req.flash('success_msg', 'Profile updated successfully.');
        res.redirect('/profile');  // Redirect to profile view after update
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).render('profile', {
            title: 'Edit Profile',
            user: { id: user_id, name, email, phone, address },
            editMode: true,
            errorMessage: 'Failed to update profile. Please try again later.'
        });
    }
};
