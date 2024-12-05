const BaseController = require('./base.controller');

module.exports = class UserController extends BaseController {
  constructor({ UserService }) {
    super(UserService);
  }

  // async login(req, res, next) {
  //   try {
  //     const { email, password } = req.body;

  //     if (!email || !password) {
  //       return res.status(400).json({
  //         status: "error",
  //         message: "Email y contraseña son requeridos",
  //       });
  //     }

  //     // Llamar al servicio para autenticar
  //     const user = await this.service.authenticate(email, password);

  //     res.status(200).json({
  //       status: "success",
  //       message: "Inicio de sesión exitoso",
  //       data: user,
  //     });
  //   } catch (error) {
  //     res.status(401).json({
  //       status: "error",
  //       message: error.message || "Error de autenticación",
  //     });
  //   }
  // }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Email y contraseña son requeridos",
        });
      }

      // Llamar al servicio para autenticar
      const { token, user } = await this.service.authenticate(email, password);

      res.status(200).json({
        status: "success",
        message: "Inicio de sesión exitoso",
        data: {
          token,
          user,
        },
      });
    } catch (error) {
      res.status(401).json({
        status: "error",
        message: error.message || "Error de autenticación",
      });
    }
  }
  
  getTutors = async (req, res, next) => {
    try {
      const { page, limit } = req.query;
      const tutors = await this.service.getTutors(
        parseInt(limit),
        parseInt(page)
      );
      res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "Tutors fetched successfully",
        data: tutors,
      });
    } catch (error) {
      next(error);
    }
  };

  getStudents = async (req, res, next) => {
    try {
      const { page, limit } = req.query;
      const students = await this.service.getStudents(
        parseInt(limit) || 10,
        parseInt(page) || 1
      );
      res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "Students fetched successfully",
        data: students,
      });
    } catch (error) {
      next(error);
    }
  };
};
