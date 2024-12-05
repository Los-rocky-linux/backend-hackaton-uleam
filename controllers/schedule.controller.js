const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
const { appResponse } = require("../utils/app-response");

let _scheduleService = null;

module.exports = class ScheduleController extends BaseController {
  constructor({ ScheduleService }) {
    super(ScheduleService);
    _scheduleService = ScheduleService;
  }
};
