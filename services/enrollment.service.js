const BaseService = require('./base.service');
const catchServiceAsync = require('../utils/catch-service-async');
const AppError = require('../utils/app-error');

module.exports = class EnrollmentService extends BaseService {
  constructor({ Enrollment, User, Group, DevelopmentType }) {
    super(Enrollment);
    this.enrollmentModel = Enrollment;
    this.groupModel = Group;
    this.userModel = User;
    this.developmentTypeModel = DevelopmentType;
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

    const devMechanism = await this.developmentTypeModel.findById(
      developmentMechanism
    );
    if (!devMechanism) {
      throw new AppError(
        'El mecanismo de desarrollo especificado no existe.',
        400
      );
    }

    if (devMechanism.name === 'Individual' && partner) {
      throw new AppError(
        'No se puede asignar un compañero si el desarrollo es individual.',
        400
      );
    }

    if (devMechanism.name === 'Grupal' && !partner) {
      throw new AppError(
        'Debe asignar un compañero si el desarrollo es grupal.',
        400
      );
    }

    const enrollment = await this.enrollmentModel.create({
      createdBy: userId,
      modality,
      topicTitle,
      problemDescription,
      developmentMechanism,
      partner,
      preferredTutors,
    });

    let message = 'Inscripción creada exitosamente.';

    if (devMechanism.name === 'Individual') {
      const group = await this.groupModel.create({
        enrollments: [enrollment._id],
        members: [userId],
        createdBy: userId,
        isIndividual: true,
      });

      enrollment.group = group._id;
      enrollment.isGroupCreated = true;
      await enrollment.save();

      message = 'Inscripción individual creada y grupo asignado.';
    } else if (devMechanism.name === 'Grupal') {
      const partnerEnrollment = await this.enrollmentModel.findOne({
        createdBy: partner,
        partner: userId,
        group: null,
        developmentMechanism: devMechanism._id,
      });

      if (partnerEnrollment) {
        const group = await this.groupModel.create({
          enrollments: [enrollment._id, partnerEnrollment._id],
          members: [userId, partner],
          createdBy: userId,
          isIndividual: false,
        });

        enrollment.group = group._id;
        enrollment.isGroupCreated = true;
        partnerEnrollment.group = group._id;
        partnerEnrollment.isGroupCreated = true;
        await enrollment.save();
        await partnerEnrollment.save();

        message = 'Grupo creado con su compañero seleccionado.';
      } else {
        message =
          'Inscripción creada. Esperando a que su compañero también lo seleccione.';
      }
    }

    return { enrollment, message };
  });

  delete = catchServiceAsync(async (id) => {
    if (!id) {
      throw new AppError('Id must be sent', 400);
    }

    const enrollment = await this.enrollmentModel.findById(id).exec();

    if (!enrollment) {
      throw new AppError('Inscripción no encontrada', 404);
    }

    if (enrollment.group) {
      const group = await this.groupModel.findById(enrollment.group).exec();

      if (group) {
        group.enrollments = group.enrollments.filter(
          (eId) => !eId.equals(enrollment._id)
        );

        group.members = group.members.filter(
          (mId) => !mId.equals(enrollment.createdBy)
        );

        if (group.enrollments.length === 0) {
          await this.groupModel.findByIdAndDelete(group._id);
        } else if (group.enrollments.length === 1 && !group.isIndividual) {
          const remainingEnrollmentId = group.enrollments[0];
          const remainingEnrollment = await this.enrollmentModel
            .findById(remainingEnrollmentId)
            .exec();

          if (remainingEnrollment) {
            remainingEnrollment.group = null;
            remainingEnrollment.isGroupCreated = false;
            await remainingEnrollment.save();
          }

          await this.groupModel.findByIdAndDelete(group._id);
        } else {
          await group.save();
        }
      }
    }

    await this.enrollmentModel.findByIdAndDelete(id);

    return { message: 'Inscripción eliminada correctamente' };
  });
};
