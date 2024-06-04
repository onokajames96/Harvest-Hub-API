const { check, validationResult } = require('express-validator');

/**
 * Middleware to validate request data based on provided validations.
 *
 * @param {Array} validations - Array of validation rules.
 * @returns {Function} - Express middleware function.
 */
const validate = (validations) => {
    return async (req, res, next) => {
	// Run all validations
        await Promise.all(validations.map(validation => validation.run(req)));

	// Get validation errors
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next(); // Proceed to next middleware if no errors
        }

	// Return validation errors
        res.status(400).json({ errors: errors.array() });
    };
};

// Validation rules for user registration
const validateUserRegistration = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please include a valid email'),
    check('password').isLength({ min: 6 }).withMessage(
        'Password must be at least 6 characters long')
];

// Validation rules for user login
const validateUserLogin = [
    check('email').isEmail().withMessage('Please include a valid email'),
    check('password').not().isEmpty().withMessage('Password is required')
];

// Validation rules for password reset request
const validateResetRequest = [
    check('email').isEmail().withMessage('Please include a valid email')
];

// Validation rules for password reset
const validatePasswordReset = [
     check('password', 
         'Password must be at least 6 characters').isLength({ min: 6 })
];

// Validation rules for password change
const validatePasswordChange = [
     check('oldPassword', 'Old password is required').exists(),
     check('newPassword',
         'New password must be at least 6 characters').isLength({ min: 6 })
];

// Validation rules for product creation
const validateProductCreation = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('price').isFloat({ gt: 0 }).withMessage(
        'Price must be greater than 0'),
    check('category').not().isEmpty().withMessage('Category is required'),
    check('description').not().isEmpty().withMessage(
        'Description is required'),
    check('stock').not().isFloat({ gt: 0 }).withMessage(
        'Stock must be greater than 0')
];

module.exports = {
    validate,
    validateUserRegistration,
    validateUserLogin,
    validateResetRequest,
    validatePasswordReset,
    validatePasswordChange,
    validateProductCreation
};
