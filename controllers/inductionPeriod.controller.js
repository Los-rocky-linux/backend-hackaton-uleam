const BaseController = require('./base.controller');

module.exports = class InductionPeriodController extends BaseController {
  constructor({ InductionPeriodService }) {
    super(InductionPeriodService);
  }
};
