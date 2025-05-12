const express = require('express');
const QualityCheckOrder = require('../models/Packing'); // make sure this uses CommonJS if needed
const router = express.Router();


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
router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await QualityCheckOrder.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Status updated successfully', order });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Internal server error' });
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
