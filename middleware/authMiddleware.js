const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protect = ({ UserModel, config }) =>
  asyncHandler(async (req, res, next) => {
    let token = req.headers["x-api-key"];

    if (token) {
      try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        req.user = await UserModel.findOne({ _id: decoded.id }).select(
          "-password"
        );

        if (!req.user) {
          res.status(401);
          throw new Error("No autorizado, usuario no encontrado");
        }

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("No autorizado, token no válido");
      }
    } else {
      res.status(401);
      throw new Error("No autorizado, no se envió el token");
    }
  });

module.exports = { protect };
