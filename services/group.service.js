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

  getAllGroups = catchServiceAsync(async (limit = 10, pageNum = 1, filters = {}) => {
    const pagination = limit * (pageNum - 1);

    // Construir el objeto de filtros para Mongoose
    const queryFilters = {};

    if (filters.startDate && filters.endDate) {
      queryFilters.createdAt = {
        $gte: new Date(filters.startDate),
        $lte: new Date(filters.endDate),
      };
    }

    if (filters.members) {
      const membersArray = filters.members.split(',');
      queryFilters.members = { $in: membersArray };
    }

    // Obtener grupos existentes con filtros
    const groups = await this.model
      .find(queryFilters)
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

    // Ahora, también obtendremos las inscripciones individuales
    // que no están asociadas a ningún grupo
    const individualEnrollmentsQueryFilters = {};

    if (filters.startDate && filters.endDate) {
      individualEnrollmentsQueryFilters.createdAt = {
        $gte: new Date(filters.startDate),
        $lte: new Date(filters.endDate),
      };
    }

    if (filters.members) {
      const membersArray = filters.members.split(',');
      individualEnrollmentsQueryFilters.createdBy = { $in: membersArray };
    }

    // Aplicar filtros adicionales para las inscripciones individuales
    if (filters.modality) {
      individualEnrollmentsQueryFilters.modality = filters.modality;
    }

    if (filters.developmentMechanism) {
      individualEnrollmentsQueryFilters.developmentMechanism = filters.developmentMechanism;
    }

    if (filters.topicTitle) {
      individualEnrollmentsQueryFilters.topicTitle = {
        $regex: filters.topicTitle,
        $options: 'i'
      };
    }

    if (filters.preferredTutors) {
      const tutorsArray = filters.preferredTutors.split(',');
      individualEnrollmentsQueryFilters.preferredTutors = { $in: tutorsArray };
    }

    // Obtener inscripciones individuales sin grupo
    const individualEnrollments = await this.enrollmentModel
      .find({
        ...individualEnrollmentsQueryFilters,
        group: null // Asegurarse de que no estén asociadas a ningún grupo
      })
      .populate('createdBy', 'name lastName email')
      .populate('modality', 'name')
      .populate('developmentMechanism', 'name')
      .populate('preferredTutors', 'name')
      .populate('partner', 'name lastName email')
      .lean();

    // Formatear las inscripciones individuales para que coincidan con la estructura de los grupos
    const formattedIndividuals = individualEnrollments.map(enrollment => ({
      _id: enrollment._id,
      enrollments: [enrollment],
      members: [enrollment.createdBy],
      createdAt: enrollment.createdAt,
    }));

    // Combinar los grupos y las inscripciones individuales
    const combinedResults = [...groups, ...formattedIndividuals];

    // Aplicar filtros adicionales si es necesario
    const filteredCombinedResults = combinedResults.filter(group => {
      let matches = true;

      if (filters.modality) {
        matches = matches && group.enrollments.some(enrollment => enrollment.modality?._id.toString() === filters.modality);
      }

      if (filters.developmentMechanism) {
        matches = matches && group.enrollments.some(enrollment => enrollment.developmentMechanism?._id.toString() === filters.developmentMechanism);
      }

      if (filters.topicTitle) {
        matches = matches && group.enrollments.some(enrollment => 
          enrollment.topicTitle?.toLowerCase().includes(filters.topicTitle.toLowerCase())
        );
      }

      if (filters.preferredTutors) {
        const tutorsArray = filters.preferredTutors.split(',');
        matches = matches && group.enrollments.some(enrollment => 
          enrollment.preferredTutors?.some(tutor => tutorsArray.includes(tutor._id.toString()))
        );
      }

      return matches;
    });

    // Calcular el total de documentos después de filtrar
    const totalCount = filteredCombinedResults.length;

    // Aplicar paginación
    const paginatedResults = filteredCombinedResults.slice(pagination, pagination + limit);

    return { result: paginatedResults, totalCount };
  });
};
