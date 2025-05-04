const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

// Import route handlers

const userRoutes = require('./routes/auth');                  // /api/users
const orderRoutes = require('./routes/Orders');               // /api/orders
const packingRoutes = require('./routes/packing');      // /api/packing
const qualityCheckRoutes = require('./routes/QualityCheck');  // /api/quality-check

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route mounting
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/packing', packingRoutes);
app.use('/api/quality-check', qualityCheckRoutes);

// DB + Server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connected');
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error(`❌ MongoDB connection error: ${err}`);
        process.exit(1);
    });


process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
    process.exit(0);
});
