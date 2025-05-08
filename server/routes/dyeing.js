const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Assuming you have an Order model

// PUT /api/orders/:id/stage
router.put('/:id/stage', async (req, res) => {
    const { id } = req.params;
    const { stageName, status } = req.body;
  
    try {
      const order = await Order.findById(id);
      if (!order) return res.status(404).send("Order not found");
  
      const stage = order.stages.find(s => s.name === stageName);
      if (!stage) return res.status(400).send("Stage not found");
  
      stage.status = status;
      await order.save();
  
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
module.exports = router;
