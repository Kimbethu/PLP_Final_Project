// middlewares/validateProfile.js
const { body, validationResult } = require('express-validator');

exports.validateProfileUpdate = [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('phone').isMobilePhone().withMessage('Please enter a valid phone number'),
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address').optional().notEmpty().withMessage('Address cannot be empty'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
