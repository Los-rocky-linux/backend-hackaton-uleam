const mongoose = require("mongoose");
const { Schema } = mongoose;

const permissionSchema = new Schema(
  {
    permissionName: {
      type: String,
      required: true,
    },
    permissionDescription: {
      type: String,
      required: true,
    },
    permissionType: {
      type: String,
      required: true,
    },
    permissionStatus: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Rol", permissionSchema);
