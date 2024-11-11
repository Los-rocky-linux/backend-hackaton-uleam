const BaseService = require("./base.service");
const catchServiceAsync = require("../utils/catch-service-async");
const Group = require("../models/group.model"); // Importamos el modelo de Group

module.exports = class EnrollmentService extends BaseService {
  constructor({ Enrollment, User }) {
    super(Enrollment);
    this.userModel = User;
  }

  getAll = catchServiceAsync(async (limit = 10, pageNum = 1) => {
    const pagination = limit * (pageNum - 1);
    const totalCount = await this.model.countDocuments();
    
    const result = await this.model
      .find()
      .populate('modality', 'name')
      .populate('developmentMechanism.type', 'name')
      .populate('preferredTutors', 'name')
      .lean()
      .skip(pagination)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    return { result, totalCount };
  });

  createEnrollment = catchServiceAsync(async (data) => {
    const { modality, topicTitle, problemDescription, developmentMechanism, partner, preferredTutors } = data;
    
    const enrollment = await this.model.create({
      modality,
      topicTitle,
      problemDescription,
      developmentMechanism,
      partner,
      preferredTutors
    });
    
    if (partner) {
      const createdBy = enrollment._id;
      
      const group = await Group.create({
        members: [enrollment._id, partner],
        createdBy,
        topicTitle,
        problemDescription,
        modality,
        developmentType: developmentMechanism.type,
        preferredTutors
      });
      
      await this.model.findByIdAndUpdate(enrollment._id, { group: group._id });
      await this.model.findByIdAndUpdate(partner, { group: group._id });
    }
    
    return enrollment;
  });
};
