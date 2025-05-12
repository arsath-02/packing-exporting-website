const express = require('express');
const QualityCheckOrder = require('../models/Packing');
const Order = require('../models/Orders');
const router = express.Router();

// Fetch all orders
router.get('/getOrders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ message: 'All orders fetched', orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// Get all QC orders
router.get('/', async (req, res) => {
  try {
    const orders = await QualityCheckOrder.find();
    res.status(200).json({ message: 'QC orders fetched', orders });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get a single QC order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await QualityCheckOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order fetched', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update QC order status and stage
router.put('/:id/status', async (req, res) => {
  const { status, stages } = req.body;
  try {
    const order = await QualityCheckOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    if (stages) order.stages = stages;
    await order.save();

    res.status(200).json({ message: 'Order updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


// PUT /api/packing/:orderId/quality-check
router.put('/:orderId/quality-check', async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await QualityCheckOrder.findById(orderId);
    order.isQualityChecked = !order.isQualityChecked;
    await order.save();
    res.status(200).json({ message: 'Quality check updated', isQualityChecked: order.isQualityChecked });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quality check status' });
  }
});

// Delete QC order
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await QualityCheckOrder.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update general order status
router.put('/updateOrderStatus/:id', async (req, res) => {
  const { status, passed, failed } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, passed, failed },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
});

module.exports = router;
