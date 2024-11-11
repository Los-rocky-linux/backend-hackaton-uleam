const BaseController = require("./base.controller");

module.exports = class GroupController extends BaseController {
  constructor({ GroupService }) {
    super(GroupService);
  }

  getAllGroups = async (req, res, next) => {
    try {
      const { page, limit } = req.query;
      const groups = await this.service.getAllGroups(limit, page);
      res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "Groups fetched successfully",
        data: groups,
      });
    } catch (error) {
      next(error);
    }
  };

  getStudentPartners = async (req, res, next) => {
    try {
      const partners = await this.service.getStudentPartners();
      res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "Partners fetched successfully",
        data: partners,
      });
    } catch (error) {
      next(error);
    }
  };
};
