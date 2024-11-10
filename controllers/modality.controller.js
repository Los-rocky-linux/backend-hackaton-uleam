const BaseController = require('./base.controller');

module.exports = class ModalityController extends BaseController {
  constructor({ ModalityService }) {
    super(ModalityService);
  }
};
