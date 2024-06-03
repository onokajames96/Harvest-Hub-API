const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { auth } = require('../middlewares/auth');

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *               - quantity
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Item added to the cart
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Something went wrong
 */
router.post('/add', auth, cartController.addToCart);

/**
 * @swagger
 * /cart/remove:
 *   post:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item removed from the cart
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Cart or product not found
 *       500:
 *         description: Something went wrong
 */
router.post('/remove', auth, cartController.removeFromCart);

/**
 * @swagger
 * /cart/user/{userId}:
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User's cart
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Something went wrong
 */
router.get('/user/:userId', auth, cartController.getUserCart);

/**
 * @swagger
 * /cart/user/{userId}:
 *   delete:
 *     summary: Delete user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Something went wrong
 */
router.delete('/user/:userId', auth, cartController.deleteCart);

module.exports = router;