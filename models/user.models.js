const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "Rol",
      required: true,
      },
    },
    {
    timestamps: true,
    versionKey: false,
    }
);
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
