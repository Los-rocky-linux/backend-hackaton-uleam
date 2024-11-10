const BaseService = require("./base.service");

let _enrollment = null;

module.exports = class EnrollmentService extends BaseService {
  constructor({ Enrollment }) {
    super(Enrollment);
    _enrollment = Enrollment;
  }

  getAll = async (limit = 10, pageNum = 1) => {
    const pagination = limit * (pageNum - 1);
    const totalCount = await _enrollment.countDocuments();

    const result = await _enrollment
      .find()
      .populate([
        { path: "modality", select: "name" },
        { path: "developmentMechanism.type", select: "name" },
        { path: "preferredTutors", select: "name email" },
      ])
      .skip(pagination)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    return { result, totalCount };
  };
};
