const express = require('express');
const cors = require('cors');

// const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);

// Base Route
app.get('/', (req, res) => {
 res.send('Welcome to Harvest Hub API...!!!');
});

module.exports = app;
