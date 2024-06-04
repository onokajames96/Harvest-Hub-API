const User = require('../models/user');

// Get all users
/**
 * Retrieves all users. Excludes passwords from the response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({}).select('-password');
		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
 };

// Get user by ID
/**
 * Retrieves a user by their ID. Excludes the password from the response.
 *
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select('-password');
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

// Update user by ID
/**
 * Updates a user by their ID.
 *
 * @param {Object} req - The request object containing the user ID and updated data.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const updateUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const { name, email, roles } = req.body;
		user.name = name || user.name;
		user.email = email || user.email;
		user.roles = roles || user.roles;

		await user.save();

		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

// Delete user by ID
/**
 * Deletes a user by their ID.
 *
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		await user.deleteOne();
		res.status(200).json({ message: 'User deleted' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser
};
