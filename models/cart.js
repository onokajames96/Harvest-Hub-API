const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: String,
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            price: Number,
        }
    ]
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
