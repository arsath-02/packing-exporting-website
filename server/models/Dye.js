const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: String,
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  color: String,
  weight: String,
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  progress: { type: Number, default: 0 },
  completedDate: {type: Date,
    default: null,},
});

module.exports = mongoose.model("Dye", taskSchema); // Change "Dye" to "Cut", "Stitch", etc. in each file
