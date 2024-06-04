const Product = require('../models/product');

// Create a new product (Sellers only)
/**
 * Creates a new product. Only sellers are allowed to create products.
 *
 * @param {Object} req - The request object containing the product details.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
	const seller = req.user.id; // Get user ID from the authenticated user

        const product = new Product({
		seller,
		name,
		description,
		price,
		category,
		stock
	});

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all products (Admin and Buyers)
/**
 * Retrieves all products. Both admin and buyers can access this endpoint.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('seller', 'name email');
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all products by seller (All)
/**
 * Retrieves all products created by a specific seller. Any authenticated user can access this endpoint.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getSellerProducts = async (req, res) => {
    try {
        const products = await Product.find({ seller: req.user.id }).populate('seller', 'name email');
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single product by ID
/**
 * Retrieves a single product by its ID.
 *
 * @param {Object} req - The request object containing the product ID.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('seller', 'name email');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a product by ID (Sellers only)
/**
 * Updates a product by its ID. Only the seller who created the product can update it.
 *
 * @param {Object} req - The request object containing the updated product details.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
	
	if (product.seller.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to update this product' });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock = stock || product.stock;

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a product by ID (Sellers only)
/**
 * Deletes a product by its ID. Only the seller who created the product can delete it.
 *
 * @param {Object} req - The request object containing the product ID.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.seller.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to delete this product' });
        }

        await Product.deleteOne();
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getSellerProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
