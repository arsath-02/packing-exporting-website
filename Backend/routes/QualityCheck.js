const express = require('express');
const QualityCheckOrder = require('../models/QualityCheck'); // make sure this uses CommonJS if needed
const router = express.Router();

// Add a new QC Order
router.post('/add', async (req, res) => {
    try {
        const { id, name, category, quantity, passed, failed, status, action } = req.body;

        if (!id || !name || !category || !quantity) {
            return res.status(400).json({ message: 'Required fields: id, name, category, quantity' });
        }

        const newOrder = new QualityCheckOrder({
            id,
            name,
            category,
            quantity,
            passed: passed || 0,
            failed: failed || 0,
            status: status || 'Pending QC',
            action: action || ''
        });

        await newOrder.save();
        res.status(201).json({ message: 'Quality Check Order created', order: newOrder });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// Get all QC orders
router.get('/', async (req, res) => {
    try {
        const orders = await QualityCheckOrder.find();
        res.status(200).json({ message: 'Orders fetched successfully', orders });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// Get a QC order by MongoDB _id
router.get('/:id', async (req, res) => {
    try {
        const order = await QualityCheckOrder.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order fetched successfully', order });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// Update a QC order
router.put('/:id', async (req, res) => {
    try {
        const { id, name, category, quantity, passed, failed, status, action } = req.body;

        const updatedOrder = await QualityCheckOrder.findByIdAndUpdate(
            req.params.id,
            { id, name, category, quantity, passed, failed, status, action },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// Delete a QC order
router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await QualityCheckOrder.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});
// Update order status in the database
router.put('/updateOrderStatus/:id', async (req, res) => {
    const { status, passed, failed } = req.body;
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status, passed, failed },
        { new: true }
      );
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Error updating order status' });
    }
  });
  
  // Fetch all orders from the database
  router.get('/getOrders', async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders' });
    }
  });

module.exports = router;
