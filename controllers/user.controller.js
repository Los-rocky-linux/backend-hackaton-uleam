const BaseController = require("./base.controller");

module.exports = class UserController extends BaseController {
  constructor({ UserService }) {
    super(UserService);
  }
};
