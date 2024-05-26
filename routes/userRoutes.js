const express = require('express');

const { auth, authorize } = require('../middlewares/auth');

const { 
	validate,
	validateUserRegistration 
} = require('../middlewares/validators');

const {
 getAllUsers,
 getUserById,
 updateUser,
 deleteUser
} = require('../controllers/userController');

const router = express.Router();

// User management routes
router.get('/', auth, authorize('admin'), getAllUsers);

router.route('/:id')
	.get(auth, authorize('admin'), getUserById)
	.put(auth, authorize('admin', 'buyer', 'seller'), validate(
		validateUserRegistration), updateUser)
	.delete(auth, authorize('admin'), deleteUser);

module.exports = router;
