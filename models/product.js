const mongoose = require('mongoose');

// Reference to the User model
const productSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true // Seller is required
    },
    name: {
        type: String,
        required: true // Name is required
    },
    description: {
        type: String,
        required: true // Description is required
    },
    price: {
        type: Number,
        required: true // Price is required
    },
    category: {
        type: String,
        required: true // Category is required
    },
    stock: {
        type: Number,
        required: true // Stock is required
    }
}, {
    timestamps: true // Automatically create createdAt and updatedAt timestamps
});

// Create the Product model using the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
