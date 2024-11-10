const BaseController = require("./base.controller");

let _enrollmentService = null;

module.exports = class EnrollmentController extends BaseController {
  constructor({ EnrollmentService }) {
    super(EnrollmentService);
    _enrollmentService = EnrollmentService;
  }
};
