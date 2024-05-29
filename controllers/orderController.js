const Order = require('../models/order');
const Cart = require('../models/cart');

// Create  the Order
exports.createOrder = async (req, res) => {
  const { address } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const products = cart.products.map(product => ({
      productId: product.productId._id,
      quantity: product.quantity
    }));

    const newOrder = new Order({
      userId,
      products,
      address,
      status: 'pending'
    });

    const savedOrder = await newOrder.save();
    await Cart.findOneAndDelete({ userId });

    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Get User Orders
exports.getUserOrders = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.find({ userId }).populate('products.productId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Get Single Order
exports.getOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate('products.productId');
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Delete the Order
exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (deletedOrder) {
      res.status(200).json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
