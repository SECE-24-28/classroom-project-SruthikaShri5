const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection string (using local MongoDB)
    const conn = await mongoose.connect('mongodb://localhost:27017/mobile_recharge');

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;