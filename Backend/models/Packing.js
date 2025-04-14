const mongoose = require('mongoose');

const packagingSchema = new mongoose.Schema({
  garment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Garment', required: true },
  method: { type: String, required: true },
  weight: { type: Number, required: true },
  status: { type: String, enum: ['Packed', 'Ready to Ship'], default: 'Packed' }
}, { timestamps: true });

module.exports = mongoose.model('Packaging', packagingSchema);