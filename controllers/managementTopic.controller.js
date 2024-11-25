const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
const { appResponse } = require("../utils/app-response");

let _managementTopicService = null;

module.exports = class ManagementTopicController extends BaseController {
  constructor({ ManagementTopicService }) {
    super(ManagementTopicService);
    _managementTopicService = ManagementTopicService;
  }

  getByEnrollment = catchControllerAsync(async (req, res) => {
    const { enrollmentId } = req.params;
    try {
      const assignedTopic = await _managementTopicService.getByEnrollment(
        enrollmentId
      );
      return appResponse(res, {
        data: { assignedTopic },
      });
    } catch (error) {
      return appResponse(res, {
        statusCode: 500,
        status: "error",
        message: error.message,
      });
    }
  });
};
