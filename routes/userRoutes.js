const express = require('express');

const { auth, authorize } = require('../middlewares/auth');

const { 
	validate,
	validateUserRegistration } = require('../middlewares/validators');

const {
 getAllUsers,
 getUserById,
 updateUser,
 deleteUser
} = require('../controllers/userController');

const router = express.Router();

// User management routes
router.get('/users', auth, authorize('admin'), getAllUsers);
router.get('/users/:id', auth, authorize('admin'), getUserById);
router.put('/users/:id', auth, authorize('admin', 'buyer', 'seller'), validate(
	validateUserRegistration), updateUser);
router.delete('/users/:id', auth, authorize('admin'), deleteUser);

// Product, cart, and order management routes would be added similarly

module.exports = router;
