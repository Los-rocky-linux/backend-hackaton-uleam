const BaseController = require("./base.controller");
const catchControllerAsync = require("../utils/catch-controller-async");
const { appResponse } = require("../utils/app-response");

module.exports = class EnrollmentController extends BaseController {
  constructor({ EnrollmentService }) {
    super(EnrollmentService);
  }

  create = catchControllerAsync(async (req, res) => {
    const userId = req.user ? req.user._id : req.body.userId; // Obtener userId desde req.user o del body directamente
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
      message: "Enrollment created successfully",
      data: result,
    });
  });
};
