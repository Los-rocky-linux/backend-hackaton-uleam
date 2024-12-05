const BaseController = require("./base.controller");
const catchControllerAsync = require("../utils/catch-controller-async");
const { appResponse } = require("../utils/app-response");

module.exports = class EnrollmentController extends BaseController {
  constructor({ EnrollmentService }) {
    super(EnrollmentService);
  }

  create = catchControllerAsync(async (req, res) => {
    const userId = req.user ? req.user._id : req.body.userId;
    if (!userId) {
      return appResponse(res, {
        statusCode: 400,
        status: "fail",
        message: "El userId es requerido",
      });
    }

    const enrollmentData = { ...req.body, userId };
    const result = await this.service.createEnrollment(enrollmentData);

    return appResponse(res, {
      statusCode: 201,
      status: "success",
      message: result.message,
      data: result.enrollment,
    });
  });

  // Asegurarse de que el método delete llama al método sobrescrito en el servicio
  delete = catchControllerAsync(async (req, res) => {
    const { id } = req.params;
    const result = await this.service.delete(id);

    return appResponse(res, {
      statusCode: 200,
      status: 'success',
      message: result.message,
    });
  });
};
