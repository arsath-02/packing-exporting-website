const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");


const Dye = require("../models/Dye");
const Cut = require("../models/Cut");
const Stitch = require("../models/Stitch");
const Package = require("../models/Packing");
const Export = require("../models/Export");




  const models = {
    dye: require("../models/Dye"),
    cut: require("../models/Cut"),
    stitch: require("../models/Stitch"),
    package: require("../models/Packing"),
    export: require("../models/Export"),
  };

  router.put("/update-task/:taskType/:orderId", async (req, res) => {
    try {
      const { taskType, orderId } = req.params;
      const { status, progress } = req.body;

      const model = models[taskType.toLowerCase()];
      if (!model) {
        return res.status(400).json({ error: "Invalid task type" });
      }

      const update = {};
      if (status) update.status = status;
      if (progress !== undefined) update.progress = progress;

      const updatedTask = await model.findOneAndUpdate(
        { orderId },
        { $set: update },
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }


      if (status === "Completed") {
        const stageNameMap = {
          dye: "Dyeing",
          cut: "Cutting",
          stitch: "Stitching",
          package: "Packing",
          export: "Shipped",
        };

        const stageName = stageNameMap[taskType.toLowerCase()];
        if (stageName) {
          await Order.findByIdAndUpdate(orderId, {
            $set: {
              "stages.$[elem].status": "Completed",
              "stages.$[elem].date": new Date(),
            },
          }, {
            arrayFilters: [{ "elem.name": stageName }],
          });
        }
      }

      res.status(200).json({
        message: `${taskType} task updated successfully`,
        task: updatedTask,
      });
    } catch (err) {
      console.error("Error updating task:", err);
      res.status(500).json({ error: "Server error" });
    }
  });



  router.post("/place", async (req, res) => {
    try {
      const {
        order_id,
        user,
        name,
        clothType,
        quantity,
        weight,
        dyeColor,
        garmentTypes,
        sizes,
        notes,
        packing_id,
      } = req.body;

      // Validate required fields
      if (!order_id || !user || !name || !clothType || !quantity || !weight || !dyeColor || !packing_id) {
        return res.status(400).json({ message: "Required fields are missing." });
      }

      // Correct default stage structure (as per schema)
      const stages = "manager";

      // Create and save the order
      const order = new Order({
        order_id,
        user,
        name,
        clothType,
        quantity,
        weight,
        dyeColor,
        garmentTypes,
        sizes,
        notes,
        packing_id,
        stages,
      });

      const savedOrder = await order.save();

      res.status(201).json({
        message: "Order placed successfully",
        order: savedOrder,
      });
    } catch (err) {
      console.error("Error placing order:", err);
      res.status(500).json({ error: "Server error" });
    }
  });

router.put('/:id/stage', async (req, res) => {
  const { id } = req.params; // id of the stage, not the order
  const { stageName, status } = req.body;

  try {
    let stageModel;
    switch (stageName) {
      case 'Dyeing':
        stageModel = require('../models/Dye');
        break;
      case 'Shipped':
        stageModel = require('../models/Export');
        break;
      case 'Packing':
        stageModel = require('../models/pack');
        break;
      case 'Stitching':
        stageModel = require('../models/Stitch');
        break;
      case 'Cutting':
        stageModel = require('../models/Cut');
        break;
      default:
        return res.status(400).json({ error: 'Invalid stage name' });
    }

    const stage = await stageModel.findById(id);
    if (!stage) return res.status(404).json({ error: 'Stage not found' });

    stage.status = status;

    // Save date only if completed
    stage.date = status === 'Completed' ? new Date() : null;

    await stage.save();

    res.status(200).json({ message: `${stageName} stage updated.`, stage });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



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



module.exports = router;
