const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB Atlas connection string (replace with your actual connection string)
    const conn = await mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/mobile_recharge?retryWrites=true&w=majority');

    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;