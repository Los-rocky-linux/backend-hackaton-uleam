const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");

let _subPermission = null;

module.exports = class SubPermissionService extends BaseService {
  constructor({ SubPermission }) {
    super(SubPermission);
    _subPermission = SubPermission;
  }
};
