const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema({
  members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  topicTitle: { type: String, required: true },
  problemDescription: { type: String, required: true },
  modality: { type: Schema.Types.ObjectId, ref: "Modality", required: true },
  developmentType: { type: Schema.Types.ObjectId, ref: "DevelopmentType", required: true },
  preferredTutors: [{ type: Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Group", groupSchema);
