const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
const { appResponse } = require("../utils/app-response");

let _managementTopicService = null;

module.exports = class ManagementTopicController extends BaseController {
    constructor({ ManagementTopicService }) {
        super(ManagementTopicService);
        _managementTopicService = ManagementTopicService;
    }
};