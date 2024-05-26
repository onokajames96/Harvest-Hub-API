const express = require('express');
const swaggerSetup = require('./swaggerConfig');
const cors = require('cors');
const compression = require('compression');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

require('dotenv').config(); // Ensure environment variables are loaded

const app = express();

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json());
swaggerSetup(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Base Route
app.get('/', (req, res) => {
 res.send('Welcome to Harvest Hub API...!');
});

module.exports = app;
