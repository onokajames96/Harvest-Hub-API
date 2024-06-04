const express = require('express');
const swaggerSetup = require('./swaggerConfig');
const cors = require('cors');
const compression = require('compression');

// Import route handlers
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Load environment variables from .env file
require('dotenv').config();

const app = express();

// Middleware setup
app.use(compression()); // Compress response bodies for all requests
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)
app.options('*', cors()); // Handle preflight requests
app.use(express.json()); // Parse incoming JSON requests

// Swagger setup for API documentation
swaggerSetup(app);

// Route handlers
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/users', userRoutes); // User management routes
app.use('/api/products', productRoutes); // Product management routes
app.use('/api/cart', cartRoutes); // Cart management routes
app.use('/api/orders', orderRoutes); // Order management routes

// Base Route
app.get('/', (req, res) => {
 res.send('Welcome to Harvest Hub API...!');
});

module.exports = app;
