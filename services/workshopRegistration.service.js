const BaseService = require('./base.service');
const catchServiceAsync = require('../utils/catch-service-async');

module.exports = class WorkshopRegistrationService extends BaseService {
  constructor({ WorkshopRegistration, User, InductionPeriod }) {
    super(WorkshopRegistration);
    this.workshopRegistrationModel = WorkshopRegistration;
    this.userModel = User;
    this.inductionPeriodModel = InductionPeriod;
  }

  getAll = catchServiceAsync(async (limit = 10, pageNum = 1) => {
    const pagination = limit * (pageNum - 1);
    const totalCount = await this.model.countDocuments();

    const result = await this.model
      .find()
      .populate('user', 'name lastName email carrera nivelAprobado') // Traer datos del usuario
      .populate('inductionPeriod', 'name description') // Traer datos del período de inducción
      .lean()
      .skip(pagination)
      .limit(limit)
      .sort({ createdAt: -1 });

    return { result, totalCount };
  });
};
