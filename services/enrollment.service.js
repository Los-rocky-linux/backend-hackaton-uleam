const BaseService = require("./base.service");
const catchServiceAsync = require("../utils/catch-service-async");
const Group = require("../models/group.model");

module.exports = class EnrollmentService extends BaseService {
  constructor({ Enrollment, User, Group }) {
    super(Enrollment);
    this.enrollmentModel = Enrollment;
    this.groupModel = Group;
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

  createEnrollment = catchServiceAsync(async (enrollmentData) => {
    const { userId, modality, topicTitle, problemDescription, developmentMechanism, partner, preferredTutors } = enrollmentData;

    // Validar que el userId y el partner existan cuando se intenta crear un grupo
    if (!userId || !partner) {
      throw new Error("El usuario o el compañero no están definidos.");
    }

    // Crear el enrollment
    const enrollment = await this.enrollmentModel.create({
      modality,
      topicTitle,
      problemDescription,
      developmentMechanism,
      partner,
      preferredTutors
    });

    // Buscar si ya existe un grupo que incluya a ambos miembros
    const existingGroup = await this.groupModel.findOne({
      members: { $all: [userId, partner] }
    });

    // Si no existe el grupo, crearlo
    if (!existingGroup) {
      await this.groupModel.create({
        members: [userId, partner],
        createdBy: userId,
        topicTitle,
        problemDescription,
        modality,
        developmentType: developmentMechanism.type,
        preferredTutors
      });
    }

    return enrollment;
  });
};
