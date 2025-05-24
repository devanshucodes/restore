const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

// Handle OPTIONS request
router.options('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

router.post('/', async (req, res) => {
  try {
    const { amount } = req.body;
    
    // Create UPI payment URL with proper encoding
    const upiParams = {
      pa: '7404313376@ybl', // Payee address
      pn: 'Restore', // Payee name
      am: amount.toString(), // Amount
      cu: 'INR', // Currency
      tn: 'Product Payment', // Transaction note
    };

    // Convert params to URL string
    const upiUrl = `upi://pay?${Object.entries(upiParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')}`;
    
    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(upiUrl);
    
    res.json({ 
      qrCode: qrCodeDataUrl,
      upiUrl: upiUrl
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ 
      error: 'Failed to generate QR code',
      details: error.message 
    });
  }
});

module.exports = router; 