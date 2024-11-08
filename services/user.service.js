const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");

let _user = null;

module.exports = class UserService extends BaseService {
    constructor({ User }) {
        super(User);
        _user = User;
    }
};
