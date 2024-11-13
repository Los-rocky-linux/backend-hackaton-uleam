const mongoose = require("mongoose");
const { Schema } = mongoose;

const rolSchema = new Schema({
  roleName: { type: String, required: true, unique: true },
  description: { type: String },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model("Rol", rolSchema);
