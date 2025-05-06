const express = require("express");
const router = express.Router();
const protect = require("../middleware/middleware");
const Order = require("../models/Orders");

// get all orders
router.get("/", protect, async (req, res) => {
  try {
    let orders;

    if (req.user.role === "manager") {
      orders = await Order.find({});
    } else {
      orders = await Order.find({ user: req.user.id });
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// get order by id
router.get("/:id", protect, async (req, res) => {
  try {
    let order;

    if (req.user.role === "manager") {
     
      order = await Order.findOne({ _id: req.params.id });
    } else {
     
      order = await Order.findOne({ _id: req.params.id, user: req.user.id });
    }

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.patch("/:id", protect, async (req, res) => {
  try {
    let order;

    if (req.user.role === "manager") {
      order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    } else {
      order = await Order.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        req.body,
        { new: true }
      );
    }

    if (!order) return res.status(404).json({ message: "Order not found or unauthorized" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//place order
router.post("/place", protect, async (req, res) => {
  try {
    const {
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
      user: req.user.id,
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
