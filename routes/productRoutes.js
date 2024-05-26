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
router.get('/seller', auth, authorize('admin', 'seller'), getSellerProducts);

router.route('/:id')
	.get(auth, authorize('admin', 'buyer', 'seller'), getProductById)
	.put(auth, authorize('seller'), validate(
		validateProductCreation), updateProduct)
	.delete(auth, authorize('admin', 'seller'), deleteProduct);

router.route('/')
	.post(auth, authorize('seller'), validate(
		validateProductCreation), createProduct)
	.get(auth, authorize('admin', 'buyer', 'seller'), getProducts)

module.exports = router;
