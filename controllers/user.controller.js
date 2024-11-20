const BaseController = require('./base.controller');

module.exports = class UserController extends BaseController {
  constructor({ UserService }) {
    super(UserService);
  }

  getTutors = async (req, res, next) => {
    try {
      const { page, limit } = req.query;
      const tutors = await this.service.getTutors(
        parseInt(limit),
        parseInt(page)
      );
      res.status(200).json({
        statusCode: 200,
        status: 'success',
        message: 'Tutors fetched successfully',
        data: tutors,
      });
    } catch (error) {
      next(error);
    }
  };

  getStudents = async (req, res, next) => {
    try {
      const { page, limit } = req.query;
      const students = await this.service.getStudents(
        parseInt(limit) || 10,
        parseInt(page) || 1
      );
      res.status(200).json({
        statusCode: 200,
        status: 'success',
        message: 'Students fetched successfully',
        data: students,
      });
    } catch (error) {
      next(error);
    }
  };
};
