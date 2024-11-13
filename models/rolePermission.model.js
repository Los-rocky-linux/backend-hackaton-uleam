const mongoose = require("mongoose");
const { Schema } = mongoose;

const rolePermissionSchema = new Schema({
  rol: { type: Schema.Types.ObjectId, ref: "Rol", required: true },
  permission: { type: Schema.Types.ObjectId, ref: "Permission", required: true },
});

module.exports = mongoose.model("RolePermission", rolePermissionSchema);
