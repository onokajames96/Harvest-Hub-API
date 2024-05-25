const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const sendEmail = require('../utils/sendEmail');
const User = require('../models/user');

// Generate JWT
const generateToken = (user) => {
	return jwt.sign(
		{ id: user._id },
		process.env.JWT_SECRET,
		{ expiresIn: '9h' }
	);
};

// User Registration
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

		const verifyUrl = `http://${req.headers.host}/api/users/verify/${user.verificationToken}`;

		await sendEmail({
			to: user.email,
			subject: 'Account Verification',
			text: `Please verify your account by clicking the link: ${verifyUrl}`
		});

		console.log(verifyUrl);
		console.log(user.verificationToken);
		res.status(201).json({ message: "Verification email sent" });
	}  catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

// Verify User
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

// User Login
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

// Request Password Reset
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

		console.log(user.resetPasswordToken);
		res.json({ message: 'Password reset email sent' });

		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
};

// Reset Password
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

// Change Password
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