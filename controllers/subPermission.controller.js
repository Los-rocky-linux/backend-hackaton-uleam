const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
const { appResponse } = require("../utils/app-response");
let _subPermissionService = null;

module.exports = class SubPermissionController extends BaseController {
  constructor({ SubPermissionService }) {
    super(SubPermissionService);
    _subPermissionService = SubPermissionService;
  }

}