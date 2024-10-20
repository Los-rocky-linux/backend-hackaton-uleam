const mongoose = require("mongoose");
const { Schema } = mongoose;

const rolSchema = new Schema(
  {
    rolName: {
      type: String,
      required: true,
    },
    rolDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Rol", rolSchema);