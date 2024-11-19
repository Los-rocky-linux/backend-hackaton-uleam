const BaseService = require('./base.service');
const catchServiceAsync = require('../utils/catch-service-async');

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
      .populate('createdBy', 'name lastName email')
      .populate('partner', 'name lastName email')
      .populate('modality', 'name')
      .populate('developmentMechanism', 'name')
      .populate('preferredTutors', 'name')
      .lean()
      .skip(pagination)
      .limit(limit)
      .sort({ createdAt: -1 });

    return { result, totalCount };
  });

  createEnrollment = catchServiceAsync(async (enrollmentData) => {
    const {
      userId,
      modality,
      topicTitle,
      problemDescription,
      developmentMechanism,
      partner,
      preferredTutors,
    } = enrollmentData;

  

    // Crear la inscripción
    const enrollment = await this.enrollmentModel.create({
      createdBy: userId,
      modality,
      topicTitle,
      problemDescription,
      developmentMechanism,
      partner,
      preferredTutors,
    });

    // Verificar si el compañero ya creó una inscripción seleccionando al usuario actual como compañero
    const partnerEnrollment = await this.enrollmentModel.findOne({
      createdBy: partner,
      partner: userId,
    });

    if (partnerEnrollment && !enrollment.group && !partnerEnrollment.group) {
      // Crear un grupo
      const group = await this.groupModel.create({
        enrollments: [enrollment._id, partnerEnrollment._id],
        members: [userId, partner],
        createdBy: userId,
      });

      // Actualizar las inscripciones con la referencia al grupo
      enrollment.group = group._id;
      partnerEnrollment.group = group._id;
      await enrollment.save();
      await partnerEnrollment.save();
    }

    return enrollment;
  });
};
