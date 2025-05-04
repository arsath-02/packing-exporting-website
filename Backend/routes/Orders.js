const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

// Create a new order
router.post('/add', async (req, res) => {
    try {
        const { order_id, name, material, size, color, quantity } = req.body;

        // Validation check
        if (!order_id || !name || !material || !size || !color || !quantity) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newOrder = new Order({
            order_id,
            name,
            material,
            size,
            color,
            quantity
        });

        await newOrder.save();
        res.status(201).json({
            message: 'Order created successfully',
            order: newOrder
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server Error',
            error: err.message
        });
    }
});

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            message: 'Orders fetched successfully',
            orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server Error',
            error: err.message
        });
    }
});

// Get a single order by order_id
router.get('/:order_id', async (req, res) => {
    try {
        const order = await Order.findOne({ order_id: req.params.order_id });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order fetched successfully',
            order
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server Error',
            error: err.message
        });
    }
});

// Update order status
router.put('/:order_id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findOneAndUpdate(
            { order_id: req.params.order_id },
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order status updated successfully',
            order
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server Error',
            error: err.message
        });
    }
});

module.exports = router;
