const express = require('express');
const router = express.Router();

// Test route for users
router.get('/test', (req, res) => {
  res.json({ message: 'User routes working!' });
});

module.exports = router;