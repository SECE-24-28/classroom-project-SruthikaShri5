const express = require('express');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Test routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Mobile Recharge Backend API is running!',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API endpoint working!', 
    server: 'Express.js',
    timestamp: new Date().toISOString() 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌐 Test URL: http://localhost:${PORT}`);
  console.log(`🔧 API Test: http://localhost:${PORT}/api/test`);
});