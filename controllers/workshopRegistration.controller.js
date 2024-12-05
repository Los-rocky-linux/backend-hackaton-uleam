const BaseController = require('./base.controller');
const catchControllerAsync = require('../utils/catch-controller-async');
const { appResponse } = require('../utils/app-response');

module.exports = class WorkshopRegistrationController extends BaseController {
  constructor({ WorkshopRegistrationService }) {
    super(WorkshopRegistrationService);
  }

  // Validación y creación
  create = catchControllerAsync(async (req, res) => {
    const { userId, inductionPeriod, carrera, nivelAprobado } = req.body;

    // if (
    //   !userId ||
    //   !inductionPeriod ||
    //   !carrera ||
    //   nivelAprobado === undefined
    // ) {
    //   return appResponse(res, {
    //     statusCode: 400,
    //     status: 'fail',
    //     message: 'Todos los campos son requeridos.',
    //   });
    // }

    if (nivelAprobado < 5) {
      return appResponse(res, {
        statusCode: 400,
        status: 'fail',
        message: 'Debes estar al menos en el quinto nivel para registrarte.',
      });
    }

    const registration = await this.service.create({
      user: userId,
      inductionPeriod,
      carrera,
      nivelAprobado,
    });

    return appResponse(res, {
      statusCode: 201,
      status: 'success',
      message: 'Inscripción creada con éxito.',
      data: registration,
    });
  });
};
