const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema({
  enrollments: [{ type: Schema.Types.ObjectId, ref: "Enrollment", required: true }],
  members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  // Campos específicos del grupo si los hay
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Group", groupSchema);
