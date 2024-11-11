const BaseService = require("./base.service");
const catchServiceAsync = require("../utils/catch-service-async");

module.exports = class GroupService extends BaseService {
  constructor({ Group, User, Rol }) {
    super(Group);
    this.userModel = User;
    this.rolModel = Rol;
  }

  getAllGroups = catchServiceAsync(async (limit = 10, pageNum = 1) => {
    const pagination = limit * (pageNum - 1);
    const totalCount = await this.model.countDocuments();
    const result = await this.model
      .find()
      .populate("members", "name lastName")
      .populate("modality", "name")
      .populate("developmentType", "name")
      .populate("preferredTutors", "name")
      .lean()
      .skip(pagination)
      .limit(limit)
      .sort({ createdAt: -1 });
    return { result, totalCount };
  });
  
  getStudentPartners = catchServiceAsync(async () => {
    const studentRole = await this.rolModel.findOne({ roleName: "Estudiante" });
    if (!studentRole) {
      throw new Error("Student role not found");
    }
    return this.userModel.find({ rol: studentRole._id, status: true });
  });
};
