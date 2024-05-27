const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.objectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.objectId,
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
    timestamps: True
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;