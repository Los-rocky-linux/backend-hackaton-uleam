const BaseService = require("./base.service");

module.exports = class UserService extends BaseService {
  constructor({ User, Rol }) {
    super(User);
    this.rolModel = Rol;
  }

  async getTutors(limit = 10, pageNum = 1) {
    const pagination = limit * (pageNum - 1);
    const tutorRole = await this.rolModel.findOne({ roleName: "Tutor" });

    if (!tutorRole) {
      throw new Error("Tutor role not found");
    }

    const totalCount = await this.model.countDocuments({ rol: tutorRole._id, status: true });
    const result = await this.model
      .find({ rol: tutorRole._id, status: true })
      .lean()
      .skip(pagination)
      .limit(limit)
      .sort({ createdAt: -1 });

    return { result, totalCount };
  }
};
