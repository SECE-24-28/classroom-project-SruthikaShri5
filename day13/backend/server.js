require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const planRoutes = require('./routes/plans');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/plans', planRoutes);

// Serve static files for frontend routes
app.get('/login', (req, res) => {
  res.json({ message: 'Use POST /api/auth/login for authentication' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Mobile Recharge API - Day 12', endpoints: ['/api/auth/login', '/api/auth/register', '/api/plans', '/api/users'] });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});