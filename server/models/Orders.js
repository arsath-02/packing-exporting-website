const mongoose = require("mongoose");

const stageSchema = new mongoose.Schema({
    name: {
      type: String,
      enum: ["Order Confirmed", "Dyeing", "Cutting", "Stitching", "Packing", "Shipped"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    date: {
        type: String,
        default: null,
      },
  });

const orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true,
        unique: true
      },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clothType: { type: String, required: true },
  quantity: { type: Number, required: true },
  weight: { type: Number, required: true },
  dyeColor: { type: String, required: true },
  stages: [stageSchema],
  garmentTypes: {
    tshirt: { type: Number, default: 0 },
    shorts: { type: Number, default: 0 },
    pants: { type: Number, default: 0 },
    jacket: { type: Number, default: 0 },
  },
  sizes: {
    s: { type: Number, default: 0 },
    m: { type: Number, default: 0 },
    l: { type: Number, default: 0 },
    xl: { type: Number, default: 0 },
  },
  notes: { type: String },
  status: { type: String, enum: ["Pending", "In Progress", "Completed", "Cancelled"], default: "Pending" }, 
  packing_id: {
    type: String,
    unique: true, // keep this if you want it to be unique
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);