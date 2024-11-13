const BaseController = require("./base.controller");
const catchControllerAsync = require("../utils/catch-controller-async");
const { appResponse } = require("../utils/app-response"); // Importa appResponse aquí

module.exports = class EnrollmentController extends BaseController {
  constructor({ EnrollmentService }) {
    super(EnrollmentService);
  }

  create = catchControllerAsync(async (req, res) => {
    const result = await this.service.createEnrollment(req.body);
    return appResponse(res, {
      statusCode: 201,
      status: "success",
      message: "Enrollment created successfully",
      data: result,
    });
  });
};
