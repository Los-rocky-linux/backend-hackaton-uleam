const BaseService = require("./base.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class UserService extends BaseService {
  constructor({ User, Rol }) {
    super(User);
    this.rolModel = Rol;
  }

  // async authenticate(email, password) {
  //   // Buscar al usuario por email
  //   const user = await this.model.findOne({ email, status: true });

  //   if (!user) {
  //     throw new Error("Email o contraseña inválidos");
  //   }

  //   // Verificar la contraseña
  //   const isPasswordValid = await bcrypt.compare(password, user.password);

  //   if (!isPasswordValid) {
  //     throw new Error("Email o contraseña inválidos");
  //   }

  //   // Retornar los datos básicos del usuario si la autenticación es exitosa
  //   return {
  //     id: user._id,
  //     name: user.name,
  //     lastName: user.lastName,
  //     email: user.email,
  //     rol: user.rol,
  //     status: user.status,
  //   };
  // }

  async authenticate(email, password) {
    // Buscar al usuario por email
    const user = await this.model.findOne({ email, status: true });

    if (!user) {
      throw new Error("Email o contraseña inválidos");
    }

    // Comparar la contraseña ingresada con la almacenada
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Email o contraseña inválidos");
    }

    // Generar el token JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        rol: user.rol,
      },
      process.env.JWT_SECRET || "default_secret_key", // Clave secreta
      { expiresIn: "1h" } // El token expira en 1 hora
    );

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        rol: user.rol,
        status: user.status,
      },
    };
  }
  
  async getTutors(limit = 10, pageNum = 1) {
    const pagination = limit * (pageNum - 1);
    const tutorRole = await this.rolModel.findOne({ roleName: "Tutor" });

    if (!tutorRole) {
      throw new Error("Tutor role not found");
    }

    const totalCount = await this.model.countDocuments({
      rol: tutorRole._id,
      status: true,
    });
    const result = await this.model
      .find({ rol: tutorRole._id, status: true })
      .lean()
      .skip(pagination)
      .limit(limit)
      .sort({ createdAt: -1 });

    return { result, totalCount };
  }

  async getStudents(limit = 10, pageNum = 1) {
    const pagination = limit * (pageNum - 1);
    const studentRole = await this.rolModel.findOne({ roleName: "Estudiante" });

    if (!studentRole) {
      throw new Error("Student role not found");
    }

    const totalCount = await this.model.countDocuments({
      rol: studentRole._id,
      status: true,
    });
    const result = await this.model
      .find({ rol: studentRole._id, status: true })
      .lean()
      .skip(pagination)
      .limit(limit)
      .sort({ createdAt: -1 });

    return { result, totalCount };
  }
};
