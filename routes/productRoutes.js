const express = require('express');
const {
    createProduct,
    getProducts,
    getSellerProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const {
	validate, 
	validateProductCreation
} = require('../middlewares/validators');


const { auth, authorize } = require('../middlewares/auth');

const router = express.Router();

// Routes 

/**
 * @swagger
 * /api/products/seller:
 *   get:
 *     summary: Get products of a seller
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of seller's products
 *       401:
 *         description: Unauthorized
 */
router.get('/seller', auth, authorize('admin', 'buyer', 'seller'), getSellerProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.delete('/:id', auth, authorize('admin', 'seller'), deleteProduct);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               price:
 *                 type: number
 *                 description: Product price
 *               description:
 *                 type: string
 *                 description: Product description
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth, authorize('seller'), createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               price:
 *                 type: number
 *                 description: Product price
 *               description:
 *                 type: string
 *                 description: Product description
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.put('/:id', auth, authorize('seller'), updateProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 *       401:
 *         description: Unauthorized
 */
router.get('/', auth, authorize('admin', 'buyer'), getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.get('/:id', auth, authorize('admin', 'buyer', 'seller'), getProductById);

module.exports = router;
