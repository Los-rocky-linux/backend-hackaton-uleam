const BaseController = require("./base.controller");

module.exports = class DevelopmentTypeController extends BaseController {
  constructor({ DevelopmentTypeService }) {
    super(DevelopmentTypeService);
  }
};
