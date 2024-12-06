const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
const { appResponse } = require("../utils/app-response");

let _sustentationService = null;

module.exports = class SustentationController extends BaseController {
  constructor({ SustentationService }) {
    super(SustentationService);
    _sustentationService = SustentationService;
  }
};
