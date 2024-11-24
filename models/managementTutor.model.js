const mongoose = require("mongoose");
const { Schema } = mongoose;

const managementTutorSchema = new Schema(
  {
    enrollment: {
      type: Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true,
    },
    assignedTutor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    academicPeriod: {
      type: String,
      required: true,
    },
    assignedTopic: {
      type: Schema.Types.ObjectId,
      ref: "ManagementTopic",
      required: true,
    },
    statusManagementTutor: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("ManagementTutor", managementTutorSchema);
