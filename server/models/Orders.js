const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  clothType: { type: String, required: true },
  quantity: { type: Number, required: true },
  weight: { type: Number, required: true },
  dyeColor: { type: String, required: true },
  stages: {type:String, default: "manager"},
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
  status: {
    type: String,
    default: "Pending",
  },
  packing_id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
