const Product = require('../models/product');

// Create a new product (Sellers only)
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
