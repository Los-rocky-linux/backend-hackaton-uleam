const BaseService = require("./base.service");

module.exports = class DevelopmentTypeService extends BaseService {
  constructor({ DevelopmentType }) {
    super(DevelopmentType);
  }
};
