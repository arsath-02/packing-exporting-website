const mongoose = require('mongoose');

const QualityCheckSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Tops', 'Bottoms', 'Accessories', 'Other'], 
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  passed: {
    type: Number,
    default: 0,
  },
  failed: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Pending QC', 'In Progress', 'Completed'],
    default: 'Pending QC',
  },
  action: {
    type: String,
    default: '', 
  },
}, { timestamps: true });

module.exports = mongoose.model('QualityCheck', QualityCheckSchema);
