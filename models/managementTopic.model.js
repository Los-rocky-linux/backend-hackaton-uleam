const mongoose = require("mongoose");
const { Schema } = mongoose;

const managementTopicSchema = new Schema(
  {
    assignedTopic: {
      type: String,
      required: true,
    },
    enrollment: {
      type: Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true,
    },
    statusManagementTopic: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("ManagementTopic", managementTopicSchema);
