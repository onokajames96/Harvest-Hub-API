const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true // Name is required
        },
        email: {
                type: String,
                required: true, // Email is required
                unique: true // Email must be unique
        },
        password: {
                type: String,
                required: true // Password is required
        },
        role: {
                type: String,
                enum: ['admin', 'buyer', 'seller'], // Role can only be 'admin', 'buyer', or 'seller'
                required: true,
		default: 'seller'// Default role is 'seller'
        },
        isVerified: {
                type: Boolean,
                default: false // Default value for isVerified is false
        },
        verificationToken: {
                type: String // Token used for email verification
        },
        resetPasswordToken: {
                type: String // Token used for password reset
        },
        resetPasswordExpires: {
                type: Date // Expiry date for the reset password token
        }
}, {
        timestamps: true// Automatically create createdAt and updatedAt timestamps
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
