const express = require('express');
const router = express.Router();
// const Order = require('../models/Order'); // Assuming you have an Order model
const order=require("../models/Orders");
const Dye = require("../models/Dye");
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
router.get("/", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(id,{ status: "Pending" }, { new: true },{stages:"dyeing"});
    const orders = await Dye.find({});
    res.status(200).json(orders);
  }
  catch (err) {
    res.status(401).json({ message: err.message });
  }
})
router.put("/", async (req, res) => {
  try {
  const {id}=req.body;
  await Order.findByIdAndUpdate(id,{ status: "In Progress" }, { new: true },{stages:"dyeing"});
  const order=await Dye.findByIdAndUpdate(
    id,
    { status: "In Progress" },
    { new: true }
  );

  res.status(200).json(order);

  }
  catch (err) {
    res.status(404).json({ message:"Message"+ err })
  }
}
)
router.put("/put2",async (req,res)=>{
  try{
    const {id}=req.body;
    await Order.findByIdAndUpdate(id,{ status: "Complete" }, { new: true },{stages:"dyeing"});
    const order=await Dye.findByIdAndUpdate(
      id,{
        status:"Completed"
      },
      {new:true}

    );
    res.status(200).json(order);
  }
  catch(err)
  {
    res.status(404).json({ message:"Message"+ err });
  }
})
module.exports = router;
