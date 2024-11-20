// group.controller.js
const BaseController = require("./base.controller");

module.exports = class GroupController extends BaseController {
  constructor({ GroupService }) {
    super(GroupService);
  }

  getAllGroups = async (req, res, next) => {
    try {
      const { page, limit, ...filters } = req.query;
      const groups = await this.service.getAllGroups(limit, page, filters);
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
};
