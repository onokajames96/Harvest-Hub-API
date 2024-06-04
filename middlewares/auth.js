const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Middleware to authenticate a user using a JWT.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const auth = async (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization');

    // Check if token is provided and starts with 'Bearer '
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
	// Remove 'Bearer ' from the token
        const tokenWithoutBearer = token.replace('Bearer ', '');

	// Verify the token
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

	// Find the user by ID and exclude the password field
        req.user = await User.findById(decoded.id).select('-password');

	// Proceed to the next middleware
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

/**
 * Middleware to authorize a user based on their role(s).
 *
 * @param {...string} roles - Roles that are allowed to access the route.
 * @returns {Function} - Express middleware function.
 */
const authorize = (...roles) => {
    return (req, res, next) => {
	// Check if the user's role is included in the allowed roles
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }

	// Proceed to the next middleware
        next();
    };
};

module.exports = { auth, authorize };
