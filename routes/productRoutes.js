const express = require('express');
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const router = express.Router();

router.route('/')
	.post(auth, createProduct)
	.get(getProducts);

router.route('/:id')
	.get(getProductById)
	.put(auth, updateProduct)
	.delete(auth, deleteProduct);

module.exports = router;
