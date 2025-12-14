const User = require('../models/User');

// Test controller function
const testController = (req, res) => {
  res.json({ message: 'User controller working!' });
};

module.exports = {
  testController
};