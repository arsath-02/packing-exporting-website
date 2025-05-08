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
        user, // should be ObjectId
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
      if (!clothType || !dyeColor || !user || !order_id) {
        return res.status(400).json({ message: "Required fields are missing." });
      }
  
      // Create default stages
      const stages = [
        { name: "Order Confirmed", status: "Completed", date: new Date() },
        { name: "Dyeing", status: "Pending" },
        { name: "Cutting", status: "Pending" },
        { name: "Stitching", status: "Pending" },
        { name: "Packing", status: "Pending" },
        { name: "Shipped", status: "Pending" },
      ];
  
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
  
      // Define common task data
      const taskData = {
        orderId: savedOrder._id,
        color: dyeColor,
        weight,
        status: "Pending",
        progress: 0,
      };
  
      // Create and save all stage-specific tasks
      const dyeTask = new Dye({ ...taskData });
      const cutTask = new Cut({ ...taskData });
      const stitchTask = new Stitch({ ...taskData });
      const packageTask = new Package({ ...taskData });
      const exportTask = new Export({ ...taskData });
  
      try {
        await Promise.all([
          dyeTask.save(),
          cutTask.save(),
          stitchTask.save(),
          packageTask.save(),
          exportTask.save(),
        ]);
      } catch (taskErr) {
        console.error("Error saving tasks:", taskErr);
        return res.status(500).json({ message: "Error saving tasks" });
      }
  
      res.status(201).json({
        message: "Order and tasks created successfully",
        order: savedOrder,
      });
    } catch (err) {
      console.error("Error:", err);
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
