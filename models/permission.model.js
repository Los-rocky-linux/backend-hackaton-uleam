const mongoose = require('mongoose');
const { Schema } = mongoose;

const permissionSchema = new Schema({
  permissionName: { type: String, required: true, unique: true },
  description: { type: String },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model('Permission', permissionSchema);
