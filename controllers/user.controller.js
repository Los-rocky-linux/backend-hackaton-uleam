const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
const { appResponse } = require("../utils/app-response");
let _UserService = null;

module.exports = class UserController extends BaseController {
  constructor({ UserService }) {
    super(UserService);
    _UserService = UserService;
  }
};
