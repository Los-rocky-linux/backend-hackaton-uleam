const mongoose = require('mongoose');
const { Schema } = mongoose;

const inductionPeriodSchema = new Schema(
  {
    name: { type: String }, // Ej: "2024-1"
    description: { type: String },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model('InductionPeriod', inductionPeriodSchema);
