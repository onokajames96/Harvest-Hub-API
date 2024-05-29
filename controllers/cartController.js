const Cart = require('../models/cart');
const Product = require('../models/product');
const mongoose = require('mongoose');

// Helper function to find and populate the cart
const findCart = async (userId) => {
  return await Cart.findOne({ userId }).populate('products.productId');
};

// Add to Cart
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity || quantity <= 0) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    } else {
      cart = new Cart({
        userId,
        products: [{ productId, quantity }]
      });
    }

    cart = await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Remove item from Cart
exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex > -1) {
        cart.products.splice(productIndex, 1);
        cart = await cart.save();
        res.status(200).json(cart);
      } else {
        res.status(404).json({ message: 'Product not found in cart' });
      }
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Get User Cart
exports.getUserCart = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const cart = await findCart(userId);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Delete the Cart
exports.deleteCart = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const cart = await Cart.findOneAndDelete({ userId });
    if (cart) {
      res.status(200).json({ message: 'Cart deleted successfully' });
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
