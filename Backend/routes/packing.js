const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order = require('../models/Packing');

// ✅ Add a new order
router.post('/add', async (req, res) => {
  try {
    const { id, customer, date, status, category, address } = req.body;

    const newOrder = new Order({
      id,
      customer,
      date,
      status,
      category,
      address,
    });

    await newOrder.save();

    res.status(201).json({
      message: 'Order entry created',
      order: newOrder,
    });
  } catch (err) {
    console.error('Add Order Error:', err);
    res.status(500).json({
      message: 'Server Error',
      error: err.message,
    });
  }
});

// ✅ Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      message: 'Orders fetched successfully',
      orders,
    });
  } catch (err) {
    console.error('Fetch Orders Error:', err);
    res.status(500).json({
      message: 'Server Error',
      error: err.message,
    });
  }
});

// ✅ Get order by MongoDB _id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Order ID' });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order fetched successfully',
      order,
    });
  } catch (err) {
    console.error('Fetch Order by ID Error:', err);
    res.status(500).json({
      message: 'Server Error',
      error: err.message,
    });
  }
});

// ✅ Update only the order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Pending', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order status updated',
      order: updatedOrder,
    });
  } catch (err) {
    console.error('Update Status Error:', err);
    res.status(500).json({
      message: 'Server Error',
      error: err.message,
    });
  }
});

module.exports = router;
