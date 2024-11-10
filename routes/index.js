const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { ErrorMiddleware, NotFoundMiddleware } = require("../middleware");

module.exports = function ({ 
  SubPermissionRoutes,
  EnrollmentRoutes,
  UserRoutes,
  RolRoutes,
  RolePermissionRoutes,
  PermissionRoutes,
  ModalityRoutes,
  DevelopmentTypeRoutes

}) {
  const router = express.Router();
  const apiRouter = express.Router();
  apiRouter
    .use(express.json())
    .use(cors())
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }));
    //apiRoutes aqui
  apiRouter.use("/sub-permission", SubPermissionRoutes);
  apiRouter.use("/enrollment", EnrollmentRoutes);
  apiRouter.use("/user", UserRoutes);
  apiRouter.use("/rol", RolRoutes);
  apiRouter.use("/role-permission", RolePermissionRoutes);
  apiRouter.use("/permission", PermissionRoutes);
  apiRouter.use("/modality", ModalityRoutes);
  apiRouter.use("/development-type", DevelopmentTypeRoutes);


  router.use("/v1/api", apiRouter);
  router.use("/", (req, res) => {
    res.send("/v1/api");
  });

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
