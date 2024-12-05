const mongoose = require("mongoose");
const { Schema } = mongoose;

const workshopRegistrationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    inductionPeriod: {
      type: Schema.Types.ObjectId,
      ref: "InductionPeriod",
      required: true,
    },
    carrera: { type: String, required: true },
    nivelAprobado: { type: Number, required: true }, // Semestre aprobado
    estado: { type: String, enum: ["activo", "inactivo"], default: "activo" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model(
  "WorkshopRegistration",
  workshopRegistrationSchema
);