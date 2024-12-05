const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
const { appResponse } = require("../utils/app-response");

let _managementCourtService = null;

module.exports = class ManagementCourtController extends BaseController {
    constructor({ ManagementCourtService }) {
        super(ManagementCourtService);
        _managementCourtService = ManagementCourtService;
    }
};