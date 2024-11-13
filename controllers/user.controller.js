const BaseController = require("./base.controller");

module.exports = class UserController extends BaseController {
  constructor({ UserService }) {
    super(UserService);
  }

  getTutors = async (req, res, next) => {
    try {
      const { page, limit } = req.query;
      const tutors = await this.service.getTutors(parseInt(limit), parseInt(page));
      res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "Tutors fetched successfully",
        data: tutors,
      });
    } catch (error) {
      next(error);
    }
  };
};
