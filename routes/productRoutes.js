const express = require('express');
const {
    createProduct,
    getProducts,
    getSellerProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const { auth, authorize } = require('../middlewares/auth');

const router = express.Router();

// Routes for admin and sellers
router.get('/seller', auth, authorize('admin', 'seller'), getSellerProducts);
router.delete('/:id', auth, authorize('admin', 'seller'), deleteProduct);

// Routes for sellers
router.post('/', auth, authorize('seller'), createProduct);
router.put('/:id', auth, authorize('seller'), updateProduct);

// Routes for admins, buyers and sellers
router.get('/', auth, authorize('admin', 'buyer', 'seller'), getProducts);
router.get('/:id', auth, authorize('admin', 'buyer', 'seller'), getProductById);

module.exports = router;
