const mongoose = require("mongoose");
const { Schema } = mongoose;

const mangementCourtSchema = new Schema(
  {
    // assignedCourt: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    assignedCourt: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    enrollment: {
      type: Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true,
    },
    statusManagementCourt: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


module.exports = mongoose.model("ManagementCourt", mangementCourtSchema);