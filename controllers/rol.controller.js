const BaseController = require("./base.controller");

module.exports = class RolController extends BaseController {
  constructor({ RolService }) {
    super(RolService);
  }
};
