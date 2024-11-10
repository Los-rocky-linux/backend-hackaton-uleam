const mongoose = require("mongoose");
const { Schema } = mongoose;

const enrollmentSchema = new Schema(
  {
    studentInfo: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      // Agrega otros campos aquí si necesitas más información sobre el estudiante
    },
    modality: {
      type: String,
      required: true,
      enum: ["Trabajo de Integración Curricular", "Examen de Carácter Complexivo"]
    },
    topicTitle: {
      type: String,
      required: function() { return this.modality === "Trabajo de Integración Curricular"; },
    },
    problemDescription: {
      type: String,
      required: function() { return this.modality === "Trabajo de Integración Curricular"; },
    },
    developmentMechanism: {
      type: {
        type: String,
        enum: ["Individual", "Grupal"],
        required: true,
      },
      members: [{
        type: String,
        required: function() { return this.developmentMechanism.type === "Grupal"; }
      }]
    },
    preferredTutors: [{
      type: String,
      required: false,
    }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
