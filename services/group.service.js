const BaseService = require('./base.service');
const catchServiceAsync = require('../utils/catch-service-async');

module.exports = class GroupService extends BaseService {
  constructor({ Group, Enrollment, User, Rol }) {
    super(Group);
    this.enrollmentModel = Enrollment;
    this.userModel = User;
    this.rolModel = Rol;
  }

  getAllGroups = catchServiceAsync(
    async (limit = 10, pageNum = 1, filters = {}) => {
      const pagination = limit * (pageNum - 1);

      const queryFilters = { members: { $exists: true, $not: { $size: 0 } } };

      if (filters.members) {
        const membersArray = filters.members.split(',');
        queryFilters.members = { $in: membersArray };
      }

      queryFilters.enrollments = { $exists: true, $not: { $size: 0 } };

      const groups = await this.model
        .find(queryFilters)
        .populate({
          path: 'enrollments',
          populate: [
            { path: 'createdBy', select: 'name lastName email' },
            { path: 'modality', select: 'name' },
            { path: 'developmentMechanism', select: 'name' },
            { path: 'preferredTutors', select: 'name' },
            { path: 'partner', select: 'name lastName email' },
          ],
        })
        .populate('members', 'name lastName email')
        .lean()
        .skip(pagination)
        .limit(limit)
        .sort({ createdAt: -1 });

      const filteredGroups = groups.filter((group) => {
        group.enrollments = group.enrollments.filter((enrollment) => {
          let matches = true;

          if (filters.modality) {
            matches =
              matches &&
              enrollment.modality &&
              enrollment.modality._id.toString() === filters.modality;
          }

          if (filters.developmentMechanism) {
            matches =
              matches &&
              enrollment.developmentMechanism &&
              enrollment.developmentMechanism._id.toString() ===
                filters.developmentMechanism;
          }

          if (filters.topicTitle) {
            matches =
              matches &&
              enrollment.topicTitle &&
              enrollment.topicTitle
                .toLowerCase()
                .includes(filters.topicTitle.toLowerCase());
          }

          if (filters.preferredTutors) {
            const tutorsArray = filters.preferredTutors.split(',');
            matches =
              matches &&
              enrollment.preferredTutors &&
              enrollment.preferredTutors.some((tutor) =>
                tutorsArray.includes(tutor._id.toString())
              );
          }

          return matches;
        });

        return group.enrollments.length > 0;
      });

      const paginatedGroups = filteredGroups.slice(
        pagination,
        pagination + limit
      );

      return { result: paginatedGroups, totalCount: filteredGroups.length };
    }
  );
};
