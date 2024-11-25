const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  rol: { type: Schema.Types.ObjectId, ref: 'Rol', required: true },
  microsoftId: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: Boolean, default: true },
}
);

// Hook para encriptar la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Si la contraseña no se ha modificado, no hacer nada
  const salt = await bcrypt.genSalt(10); // Generar un salt
  this.password = await bcrypt.hash(this.password, salt); // Encriptar la contraseña
  next();
});

module.exports = mongoose.model('User', userSchema);
