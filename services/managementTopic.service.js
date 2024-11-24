const BaseService = require("./base.service");

module.exports = class ManagementTopicService extends BaseService {
  constructor({ ManagementTopic }) {
    super(ManagementTopic);
  }
};
