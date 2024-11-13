const BaseController = require("./base.controller");

module.exports = class RolePermissionController extends BaseController {
  constructor({ RolePermissionService }) {
    super(RolePermissionService);
  }
};
