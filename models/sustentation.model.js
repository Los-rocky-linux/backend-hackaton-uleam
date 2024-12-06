const mongoose = require("mongoose");
const { Schema } = mongoose;

const SustentationSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    requirements: {
      type: [String],
      required: true,
    },
    additionalDocuments: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Pendiente", "Aprobado", "Rechazado"],
      default: "Pendiente",
    },
    remarks: {
      type: String,
      default: "",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Sustentation", SustentationSchema);
