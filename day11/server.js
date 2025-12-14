const express = require('express');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (with error handling)
try {
  connectDB();
} catch (error) {
  console.log('MongoDB connection failed, server will run without database');
}

// Middleware
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Mobile Recharge Backend API is running!' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API endpoint working!', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});