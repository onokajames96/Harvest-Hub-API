const Cart = require('../models/cart');
const Product = require('../models/product');

// Add to Cart
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ owner: userId });
    if (cart) {
      // Update existing cart
      const productIndex = cart.products.findIndex(p => p.productId == productId);
      if (productIndex > -1) {
        // Update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // Add the new item
        cart.products.push({ productId, quantity });
      }
    } else {
      // Create the new cart
      cart = new Cart({
        owner: userId,
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
  try {
    let cart = await Cart.findOne({ owner: userId });
    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId == productId);
      if (productIndex > -1) {
        // Remove  item
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
  try {
    const cart = await Cart.findOne({ owner: userId }).populate('products.productId');
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
  try {
    const cart = await Cart.findOneAndDelete({ owner: userId });
    if (cart) {
      res.status(200).json({ message: 'Cart deleted successfully' });
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
