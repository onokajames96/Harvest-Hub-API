const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { auth } = require('../middlewares/auth');

// Add item to cart
router.post('/add', auth, cartController.addToCart);

// Remove item from cart
router.post('/remove', auth, cartController.removeFromCart);

// Get user cart
router.get('/:userId', auth, cartController.getUserCart);

// Delete the cart
router.post('/delete', auth, cartController.deleteCart);

module.exports = router;
