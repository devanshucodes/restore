const express = require('express');
const cors = require('cors');
const app = express();
const paymentRoutes = require('./routes/payment');

// Middleware
app.use(cors());
app.use(express.json());

// Root route handler
app.get('/', (req, res) => {
  res.json({
    status: 'Server is running',
    message: 'Welcome to the Payment API',
    endpoints: {
      createPayment: '/payment'
    }
  });
});

// Routes
app.use('/payment', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    details: err.message
  });
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Payment server is running on http://localhost:${PORT}`);
  console.log('CORS enabled for all origins');
  console.log('Available endpoints:');
  console.log('- GET  /');
  console.log('- POST /payment');
}); 