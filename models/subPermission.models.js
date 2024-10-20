const mongoose = require("mongoose");
const { Schema } = mongoose;

const subPermissionSchema = new Schema(
  {
    subPermissionName: {
      type: String,
      required: true,
    },
    subPermissionDescription: {
      type: String,
      required: true,
    },
    subPermissionStatus: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("SubPermission", subPermissionSchema);
