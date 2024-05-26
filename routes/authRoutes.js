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
const { validate,
	validateUserRegistration,
	validateUserLogin,
	validateResetRequest,
	validatePasswordReset,
	validatePasswordChange } = require('../middlewares/validators');

const router = express.Router();

router.post("/register", validate(validateUserRegistration), registerUser);

router.get('/verify/:token', verifyUser);

router.post("/login", validate(validateUserLogin), loginUser);

router.post('/request-reset', validate(
	validateResetRequest), requestPasswordReset);

router.post('/reset/:token', validate( validatePasswordReset), resetPassword);

router.put('/change-password', auth, validate(
	validatePasswordChange), changePassword);

module.exports = router;
