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
    const queryFilters = { members: { $exists: true, $not: {$size: 0} } }; // Asegurarse de que los grupos tienen miembros
  
    if (filters.startDate && filters.endDate) {
      queryFilters.createdAt = {
        $gte: new Date(filters.startDate),
        $lte: new Date(filters.endDate),
      };
    }
  
    if (filters.members) {
      const membersArray = filters.members.split(',');
      queryFilters.members = { $in: membersArray, $exists: true, $not: {$size: 0} };
    }
  
    // Filtro para excluir grupos sin inscripciones
    queryFilters.enrollments = { $exists: true, $not: {$size: 0} };
  
    const groups = await this.model
      .find(queryFilters)
      .populate({
        path: 'enrollments',
        match: { group: { $ne: null } },
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
  
    return { result: groups, totalCount: groups.length };
  });
};  
