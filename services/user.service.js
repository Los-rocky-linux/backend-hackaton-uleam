const BaseService = require("./base.service");

module.exports = class UserService extends BaseService {
  constructor({ User }) {
    super(User);
  }
};
