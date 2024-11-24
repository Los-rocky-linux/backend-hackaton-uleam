const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
const { appResponse } = require("../utils/app-response");

let _managementTutorService = null;

module.exports = class ManagementTutorController extends BaseController {
    constructor({ ManagementTutorService }) {
        super(ManagementTutorService);
        _managementTutorService = ManagementTutorService;
    }
};