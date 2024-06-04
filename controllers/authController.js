const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const sendEmail = require('../utils/sendEmail');
const User = require('../models/user');

require('dotenv').config(); // Ensure environment variables are loaded

/**
 * Generates a JWT token for a given user.
 *
 * @param {Object} user - The user object.
 * @returns {string} - The JWT token.
 */
const generateToken = (user) => {
	return jwt.sign(
		{ id: user._id },
		process.env.JWT_SECRET,
		{ expiresIn: '9h' }
	);
};

/**
 * Registers a new user and sends a verification email.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const registerUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, email, password, role } = req.body;

	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: 'User already exists' });
		}

		user = new User({
			name,
			email,
			password,
			role,
			verificationToken: crypto.randomBytes(20).toString('hex')
		});

		// Hash password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();

		// Use req.headers.host for local environment
		const verifyUrl = `http://${req.headers.host}/api/auth/verify/${user.verificationToken}`;

		await sendEmail({
			to: user.email,
			subject: 'Account Verification',
			text: `Please verify your account by clicking the link: ${verifyUrl}`
		});

		console.log(verifyUrl); // Log verification URL (for debugging purposes)
		//console.log(user.verificationToken);
		res.status(201).json({ message: "Verification email sent" });
	}  catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

/**
 * Verifies a user's account using a verification token.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const verifyUser = async (req, res) => {
	try {
		const user = await User.findOne({ verificationToken: req.params.token });
		if (!user) {
			return res.status(400).json({ message: 'Invalid token' });
		}
		
		user.isVerified = true;
		user.verificationToken = undefined;
		await user.save();

		res.json({ message: 'Account verified' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

/**
 * Logs in a user and returns a JWT token.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const loginUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'Invalid Credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid Credentials' });
		}

		if (!user.isVerified) {
			return res.status(400).json({ message: 'Account not verified' });
		}

		const token = generateToken(user);
		res.json({ token });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

/**
 * Sends a password reset email to the user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const requestPasswordReset = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'User not found' });
		}

		user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
		user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

		await user.save();

		const resetUrl = `http://${req.headers.host}/api/users/reset/${user.resetPasswordToken}`;

		await sendEmail({
			to: user.email,
			subject: 'Password Reset',
			text: `Please reset your password by clicking the link: ${resetUrl}`
			});

		console.log(user.resetPasswordToken); // Log reset password token (for debugging purposes)
		res.json({ message: 'Password reset email sent' });

		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
};

/**
 * Resets the user's password using a reset token.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const resetPassword = async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;

	try {
		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpires: { $gt: Date.now() }
		});

		if (!user) {
			return res.status(400).json({ message: 'Invalid or expired token' });
		}

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;

		await user.save();

		res.json({ message: 'Password reset successful' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

/**
 * Changes the user's password.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const changePassword = async (req, res) => {
	const { oldPassword, newPassword } = req.body;

	try {
		const user = await User.findById(req.user.id);

		const isMatch = await bcrypt.compare(oldPassword, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Incorrect current password' });
		}

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(newPassword, salt);

		await user.save();

		res.json({ message: 'Password changed successfully' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};


module.exports = {
	registerUser,
	verifyUser,
	loginUser,
	requestPasswordReset,
	resetPassword,
	changePassword
};
