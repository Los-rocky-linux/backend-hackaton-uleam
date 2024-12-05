const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { ErrorMiddleware, NotFoundMiddleware } = require("../middleware");

module.exports = function ({
  ScheduleRoutes,
  ManagementCourtRoutes,
  ManagementTopicRoutes,
  ManagementTutorRoutes,
  SubPermissionRoutes,
  EnrollmentRoutes,
  UserRoutes,
  RolRoutes,
  RolePermissionRoutes,
  PermissionRoutes,
  ModalityRoutes,
  DevelopmentTypeRoutes,
  GroupRoutes,
  InductionPeriodRoutes,
  WorkshopRegistrationRoutes,
}) {
  const router = express.Router();
  const apiRouter = express.Router();
  apiRouter
    .use(express.json())
    .use(cors())
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }));
  apiRouter.use("/schedule", ScheduleRoutes);
  apiRouter.use("/management-court", ManagementCourtRoutes);
  apiRouter.use("/management-topic", ManagementTopicRoutes);
  apiRouter.use("/management-tutor", ManagementTutorRoutes);
  apiRouter.use("/sub-permission", SubPermissionRoutes);
  apiRouter.use("/enrollment", EnrollmentRoutes);
  apiRouter.use("/user", UserRoutes);
  apiRouter.use("/rol", RolRoutes);
  apiRouter.use("/role-permission", RolePermissionRoutes);
  apiRouter.use("/permission", PermissionRoutes);
  apiRouter.use("/modality", ModalityRoutes);
  apiRouter.use("/development-type", DevelopmentTypeRoutes);
  apiRouter.use("/group", GroupRoutes);
  apiRouter.use("/induction-period", InductionPeriodRoutes);
  apiRouter.use("/workshop-registration", WorkshopRegistrationRoutes);

  router.use("/v1/api", apiRouter);
  router.use("/", (req, res) => {
    res.send("/v1/api");
  });

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
