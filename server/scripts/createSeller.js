const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

async function createSeller() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/restore');
        console.log('Connected to MongoDB');

        // Check if seller already exists
        const existingSeller = await User.findOne({ email: 'devanshucodes@gmail.com' });
        if (existingSeller) {
            console.log('Seller account already exists');
            process.exit(0);
        }

        // Create seller account
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('seller', salt);

        const seller = new User({
            name: 'Devanshu',
            email: 'devanshucodes@gmail.com',
            password: hashedPassword,
            role: 'user',
            status: 'active'
        });

        await seller.save();
        console.log('Seller account created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error creating seller account:', error);
        process.exit(1);
    }
}

createSeller(); 