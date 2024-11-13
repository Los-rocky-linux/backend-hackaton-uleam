const mongoose = require("mongoose");
const { Schema } = mongoose;

const enrollmentSchema = new Schema(
  {
    modality: { type: Schema.Types.ObjectId, ref: "Modality", required: true },
    topicTitle: { type: String },
    problemDescription: { type: String },
    developmentMechanism: {
      type: { type: Schema.Types.ObjectId, ref: "DevelopmentType", required: true }
    },
    partner: { type: Schema.Types.ObjectId, ref: "User" },
    preferredTutors: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
