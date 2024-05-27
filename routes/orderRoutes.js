const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

// Create the order
router.post('/create', auth, orderController.createOrder);

// Get user orders
router.get('/:userId', auth, orderController.getUserOrders);
ls

// Get single order
router.get('/order/:orderId', auth, orderController.getOrder);

// Delete the order
router.delete('/delete/:orderId', auth, orderController.deleteOrder);

module.exports = router;