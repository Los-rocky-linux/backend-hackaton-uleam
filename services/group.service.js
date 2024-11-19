// group.service.js
const BaseService = require("./base.service");
const catchServiceAsync = require("../utils/catch-service-async");

module.exports = class GroupService extends BaseService {
  constructor({ Group, Enrollment, User, Rol }) {
    super(Group);
    this.enrollmentModel = Enrollment;
    this.userModel = User;
    this.rolModel = Rol;
  }

  getAllGroups = catchServiceAsync(async (limit = 10, pageNum = 1) => {
    const pagination = limit * (pageNum - 1);
    const totalGroupsCount = await this.model.countDocuments();
    
    // Obtener grupos existentes
    const groups = await this.model
      .find()
      .populate({
        path: 'enrollments',
        populate: [
          { path: 'createdBy', select: 'name lastName email' },
          { path: 'modality', select: 'name' },
          { path: 'developmentMechanism', select: 'name' },
          { path: 'preferredTutors', select: 'name' },
          { path: 'partner', select: 'name lastName email' }
        ]
      })
      .populate('members', 'name lastName email')
      .populate('createdBy', 'name lastName email')
      .lean()
      .skip(pagination)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Obtener inscripciones individuales (sin grupo)
    const individualEnrollments = await this.enrollmentModel.find({ group: null })
      .populate([
        { path: 'createdBy', select: 'name lastName email' },
        { path: 'modality', select: 'name' },
        { path: 'developmentMechanism', select: 'name' },
        { path: 'preferredTutors', select: 'name' },
        { path: 'partner', select: 'name lastName email' }
      ])
      .lean();

    // Mapear inscripciones individuales como grupos con un solo miembro
    const individualGroups = individualEnrollments.map(enrollment => ({
      _id: enrollment._id, // Usar el ID de la inscripción como ID del grupo
      enrollments: [enrollment],
      members: [enrollment.createdBy],
      createdBy: enrollment.createdBy,
      createdAt: enrollment.createdAt,
      updatedAt: enrollment.updatedAt,
      isIndividual: true // Indicar que es una inscripción individual
    }));

    // Combinar grupos y inscripciones individuales
    const combinedResults = [...groups, ...individualGroups];

    // Calcular el total de documentos (grupos + inscripciones individuales)
    const totalCount = await this.model.countDocuments() + individualEnrollments.length;

    // Aplicar paginación
    const paginatedResults = combinedResults.slice(pagination, pagination + limit);

    return { result: paginatedResults, totalCount };
  });
};
