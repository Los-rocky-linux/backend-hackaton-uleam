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

    // Obtener el mecanismo de desarrollo
    const devMechanism = await this.developmentTypeModel.findById(developmentMechanism);
    if (!devMechanism) {
      throw new AppError('El mecanismo de desarrollo especificado no existe.', 400);
    }

    if (devMechanism.name === 'Individual' && partner) {
      throw new AppError('No se puede asignar un compañero si el desarrollo es individual.', 400);
    }

    if (devMechanism.name === 'Grupal' && !partner) {
      throw new AppError('Debe asignar un compañero si el desarrollo es grupal.', 400);
    }

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

    let message = 'Inscripción creada exitosamente.';

    // Lógica para crear grupos
    if (devMechanism.name === 'Individual') {
      // Crear un grupo para el estudiante individual
      const group = await this.groupModel.create({
        enrollments: [enrollment._id],
        members: [userId],
        createdBy: userId,
        isIndividual: true,
      });

      // Actualizar la inscripción con la referencia al grupo y marcar que el grupo ha sido creado
      enrollment.group = group._id;
      enrollment.isGroupCreated = true;
      await enrollment.save();

      message = 'Inscripción individual creada y grupo asignado.';
    } else if (devMechanism.name === 'Grupal') {
      // Verificar si el compañero ya creó una inscripción seleccionando al usuario actual como compañero
      const partnerEnrollment = await this.enrollmentModel.findOne({
        createdBy: partner,
        partner: userId,
        group: null, // Asegurarse de que el compañero no esté ya en un grupo
        developmentMechanism: devMechanism._id, // Asegurarse de que el mecanismo de desarrollo coincide
      });

      if (partnerEnrollment) {
        // Crear un grupo con ambos estudiantes
        const group = await this.groupModel.create({
          enrollments: [enrollment._id, partnerEnrollment._id],
          members: [userId, partner],
          createdBy: userId,
          isIndividual: false,
        });

        // Actualizar las inscripciones con la referencia al grupo y marcar que el grupo ha sido creado
        enrollment.group = group._id;
        enrollment.isGroupCreated = true;
        partnerEnrollment.group = group._id;
        partnerEnrollment.isGroupCreated = true;
        await enrollment.save();
        await partnerEnrollment.save();

        message = 'Grupo creado con su compañero seleccionado.';
      } else {
        // Si no hay inscripción del compañero, queda pendiente
        message = 'Inscripción creada. Esperando a que su compañero también lo seleccione.';
      }
    }

    return { enrollment, message };
  });

  // Método delete actualizado
  delete = catchServiceAsync(async (id) => {
    if (!id) {
      throw new AppError('Id must be sent', 400);
    }

    console.log(`[EnrollmentService] Attempting to delete enrollment with id: ${id}`);

    // Buscar la inscripción
    const enrollment = await this.enrollmentModel.findById(id).exec();

    if (!enrollment) {
      console.error(`[EnrollmentService] Enrollment not found for id: ${id}`);
      throw new AppError('Inscripción no encontrada', 404);
    }

    console.log('[EnrollmentService] Enrollment found:', enrollment);

    // Si la inscripción está en un grupo, actualizar el grupo
    if (enrollment.group) {
      const group = await this.groupModel.findById(enrollment.group).exec();

      if (group) {
        console.log(`[EnrollmentService] Found group with id: ${group._id}`);

        // Eliminar la inscripción del grupo
        group.enrollments = group.enrollments.filter(
          (eId) => !eId.equals(enrollment._id)
        );

        // Eliminar al miembro del grupo
        group.members = group.members.filter(
          (mId) => !mId.equals(enrollment.createdBy)
        );

        if (group.enrollments.length === 0) {
          console.log(`[EnrollmentService] Group with id ${group._id} has no enrollments. Removing group.`);
          await group.deleteOne();
          console.log(`[EnrollmentService] Group ${group._id} removed.`);
        } else if (group.enrollments.length === 1 && !group.isIndividual) {
          const remainingEnrollmentId = group.enrollments[0];
          const remainingEnrollment = await this.enrollmentModel.findById(remainingEnrollmentId).exec();

          if (remainingEnrollment) {
            console.log(`[EnrollmentService] Updating remaining enrollment ${remainingEnrollment._id} to pending.`);
            // Actualizar la inscripción restante para que no tenga un grupo y 'isGroupCreated' a false
            remainingEnrollment.group = null;
            remainingEnrollment.isGroupCreated = false;
            await remainingEnrollment.save();
            console.log(`[EnrollmentService] Remaining enrollment ${remainingEnrollment._id} updated to pending.`);
          } else {
            console.error(`[EnrollmentService] Remaining enrollment with id ${remainingEnrollmentId} not found.`);
          }

          // Eliminar el grupo antiguo
          console.log(`[EnrollmentService] Removing old group with id: ${group._id}`);
          await group.deleteOne();
          console.log(`[EnrollmentService] Old group ${group._id} removed.`);
        } else {
          // Guardar el grupo actualizado
          await group.save();
          console.log(`[EnrollmentService] Group ${group._id} saved with updated enrollments and members.`);
        }
      } else {
        console.warn(`[EnrollmentService] Group with id ${enrollment.group} not found.`);
      }
    }

    // Eliminar la inscripción
    await enrollment.deleteOne();
    console.log(`[EnrollmentService] Enrollment with id ${id} deleted successfully.`);

    return { message: 'Inscripción eliminada correctamente' };
  });
};
