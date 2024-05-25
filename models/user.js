const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true
        },
        email: {
                type: String,
                required: true,
                unique: true
        },
        password: {
                type: String,
                required: true
        },
        role: {
                type: String,
                enum: ['admin', 'buyer', 'seller'],
                required: true,
		default: 'seller'
        },
        isVerified: {
                type: Boolean,
                default: false
        },
        verificationToken: {
                type: String
        },
        resetPasswordToken: {
                type: String
        },
        resetPasswordExpires: {
                type: Date
        }
}, {
        timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
