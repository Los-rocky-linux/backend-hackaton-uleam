const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");

let _managementTopic = null;
module.exports = class ManagementTopicService extends BaseService {
  constructor({ ManagementTopic }) {
    super(ManagementTopic);
    _managementTopic = ManagementTopic;
  }

  // getByEnrollment = catchServiceAsync(async (enrollmentId) => {
  //   const managementTopic = await this.model
  //     .findOne({ enrollment: enrollmentId })
  //     .populate("enrollment");

  //   if (!managementTopic) {
  //     throw new AppError("ManagementTopic not found", 404);
  //   }

  //   return managementTopic.assignedTopic;
  // });

  getByEnrollment = catchServiceAsync(async (enrollmentId) => {
    const managementTopic = await this.model
      .findOne({ enrollment: enrollmentId })
      .populate("enrollment");

    if (!managementTopic) {
      throw new AppError("ManagementTopic not found", 404);
    }

    return {
      result: [
        {
          _id: managementTopic._id,
          assignedTopic: managementTopic.assignedTopic,
        },
      ],
      totalCount: 1,
    };
  });
};
