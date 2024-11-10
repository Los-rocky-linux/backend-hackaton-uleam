const mongoose = require("mongoose");
const { Schema } = mongoose;

const enrollmentSchema = new Schema(
  {
    studentInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true }
    },
    modality: { type: Schema.Types.ObjectId, ref: "Modality", required: true },
    topicTitle: { type: String },
    problemDescription: { type: String },
    developmentMechanism: {
      type: { type: Schema.Types.ObjectId, ref: "DevelopmentType", required: true },
      members: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    preferredTutors: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
