const BaseService = require("./base.service");

module.exports = class ScheduleService extends BaseService {
  constructor({ Schedule }) {
    super(Schedule);
  }
};
