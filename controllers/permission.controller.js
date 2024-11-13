const BaseController = require("./base.controller");

module.exports = class PermissionController extends BaseController {
  constructor({ PermissionService }) {
    super(PermissionService);
  }
};
