const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

// get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get order by id
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update order by id
router.patch("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// place a new order
router.post("/place", async (req, res) => {
  try {
    const {
      user,
      clothType,
      quantity,
      weight,
      dyeColor,
      garmentTypes,
      sizes,
      notes,
    } = req.body;

    const currentDate = new Date().toISOString().split("T")[0];

    const stages = [
      { name: "Order Confirmed", status: "Completed", date: currentDate },
      { name: "Dyeing", status: "Pending", date: null },
      { name: "Cutting", status: "Pending", date: null },
      { name: "Stitching", status: "Pending", date: null },
      { name: "Packing", status: "Pending", date: null },
      { name: "Shipped", status: "Pending", date: null },
    ];

    const order_id = 'ORD-' + Date.now();
     
    const newOrder = new Order({
      order_id,
      user,
      clothType,
      quantity,
      weight,
      dyeColor,
      garmentTypes,
      sizes,
      notes,
      stages,
      packing_id: "PACK-" + Date.now(),
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Order placement error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
