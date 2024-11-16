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
      .populate({
        path: 'enrollments',
        populate: [
          { path: 'createdBy', select: 'name lastName email' },
          { path: 'modality', select: 'name' },
          { path: 'developmentMechanism', select: 'name' },
          { path: 'preferredTutors', select: 'name' }
        ]
      })
      .populate('members', 'name lastName email')
      .lean()
      .skip(pagination)
      .limit(limit)
      .sort({ createdAt: -1 });

    return { result, totalCount };
  });
};
