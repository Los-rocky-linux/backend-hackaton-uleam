const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");

let _sustentation = null;

module.exports = class SustentationService extends BaseService {
  constructor({ Sustentation }) {
    super(Sustentation);
    _sustentation = Sustentation;
  }
};
