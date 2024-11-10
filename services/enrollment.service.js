const BaseService = require("./base.service");
const AppError = require("../utils/app-error");
const catchServiceAsync = require("../utils/catch-service-async");

let _enrollment = null;

module.exports = class EnrollmentService extends BaseService {
  constructor({ Enrollment }) {
    super(Enrollment);
    _enrollment = Enrollment;
  }
};
