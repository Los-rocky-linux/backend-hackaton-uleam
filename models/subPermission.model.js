const mongoose = require('mongoose');
const { Schema } = mongoose;

const subPermissionSchema = new Schema({
  subPermissionName: { type: String, required: true },
  description: { type: String },
  status: { type: Boolean, default: true },
  permission: {
    type: Schema.Types.ObjectId,
    ref: 'Permission',
    required: true,
  },
});

module.exports = mongoose.model('SubPermission', subPermissionSchema);
