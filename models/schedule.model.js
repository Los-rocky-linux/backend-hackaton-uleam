const mongoose = require("mongoose");
const { Schema } = mongoose;

const scheduleSchema = new Schema(
  {
    assignedDate: {
      type: Date,
      required: true,
    },
    assignedCourt: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    assignedTutor: {
      type: Schema.Types.ObjectId,
      ref: "ManagementTutor",
    },
    enrollment: {
      type: Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true,
    },
    statusSchedule: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Schedule", scheduleSchema);