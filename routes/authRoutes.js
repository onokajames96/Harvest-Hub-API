const express = require('express');
const { check } = require('express-validator');

const { auth } = require('../middlewares/auth');
const { 
	registerUser,
	verifyUser,
	loginUser,
	requestPasswordReset,
	resetPassword,
	changePassword } = require('../controllers/authController');


const router = express.Router();

router.post("/register", 
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
	],
	registerUser
);

router.get('/verify/:token', verifyUser);

router.post(
	"/login",
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists()
	],
	loginUser
);

router.post('/request-reset',
	[
		check('email', 'Please include a valid email').isEmail()
	],
	requestPasswordReset
);

router.post('/reset/:token',
	[
		check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
	],
	resetPassword
);

router.put('/change-password', auth,
	[
		check('oldPassword', 'Old password is required').exists(),
		check('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 })
	],
	changePassword
);

module.exports = router;
