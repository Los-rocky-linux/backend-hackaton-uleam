//Configurar nuestro contenedor de injección de depencia
const { createContainer, asClass, asValue, asFunction } = require("awilix");

//Config
const config = require(".");

//Routes
const Routes = require("../routes");

//Services
const {
  ManagementCourtService,
  ManagementTopicService,
  ManagementTutorService,
  EnrollmentService,
  UserService,
  RolService,
  RolePermissionService,
  PermissionService,
  SubPermissionService,
  ModalityService,
  DevelopmentTypeService,
  GroupService,
  InductionPeriodService,
  WorkshopRegistrationService,
} = require("../services");
//Controllers
const {
  ManagementCourtController,
  ManagementTopicController,
  ManagementTutorController,
  EnrollmentController,
  UserController,
  RolController,
  RolePermissionController,
  PermissionController,
  SubPermissionController,
  ModalityController,
  DevelopmentTypeController,
  GroupController,
  InductionPeriodController,
  WorkshopRegistrationController,
} = require("../controllers");

//Startup
const { Database, Server } = require("../startup");

//Routes

const {
  ManagementCourtRoutes,
  ManagementTopicRoutes,
  ManagementTutorRoutes,
  EnrollmentRoutes,
  UserRoutes,
  RolRoutes,
  RolePermissionRoutes,
  PermissionRoutes,
  SubPermissionRoutes,
  ModalityRoutes,
  DevelopmentTypeRoutes,
  GroupRoutes,
  InductionPeriodRoutes,
  WorkshopRegistrationRoutes,
} = require("../routes/api/index");

//Models
const {
  ManagementCourt,
  ManagementTopic,
  ManagementTutor,
  Enrollment,
  User,
  Rol,
  RolePermission,
  Permission,
  SubPermission,
  Modality,
  DevelopmentType,
  Group,
  InductionPeriod,
  WorkshopRegistration,
} = require("../models");

//Funtions
const {} = require("../functions");

const { protect } = require("../middleware/authMiddleware");
// const AuthUtils = require("../utils/auth");
const container = createContainer();
container
  .register({
    //Configuración principal
    router: asFunction(Routes).singleton(),
    config: asValue(config),
    // AuthUtils: asClass(AuthUtils).singleton(),
    Database: asClass(Database).singleton(),
    Server: asClass(Server).singleton(),
  })
  .register({
    //Configuración de los servicios
    ManagementCourtService: asClass(ManagementCourtService).singleton(),
    ManagementTopicService: asClass(ManagementTopicService).singleton(),
    ManagementTutorService: asClass(ManagementTutorService).singleton(),
    EnrollmentService: asClass(EnrollmentService).singleton(),
    UserService: asClass(UserService).singleton(),
    RolService: asClass(RolService).singleton(),
    RolePermissionService: asClass(RolePermissionService).singleton(),
    PermissionService: asClass(PermissionService).singleton(),
    SubPermissionService: asClass(SubPermissionService).singleton(),
    ModalityService: asClass(ModalityService).singleton(),
    DevelopmentTypeService: asClass(DevelopmentTypeService).singleton(),
    GroupService: asClass(GroupService).singleton(),
    InductionPeriodService: asClass(InductionPeriodService).singleton(),
    WorkshopRegistrationService: asClass(
      WorkshopRegistrationService
    ).singleton(),
  })
  .register({
    //Configuración de los controladores
    ManagementCourtController: asClass(ManagementCourtController).singleton(),
    ManagementTopicController: asClass(ManagementTopicController).singleton(),
    ManagementTutorController: asClass(ManagementTutorController).singleton(),
    EnrollmentController: asClass(EnrollmentController).singleton(),
    UserController: asClass(UserController).singleton(),
    RolController: asClass(RolController).singleton(),
    RolePermissionController: asClass(RolePermissionController).singleton(),
    PermissionController: asClass(PermissionController).singleton(),
    SubPermissionController: asClass(SubPermissionController).singleton(),
    ModalityController: asClass(ModalityController).singleton(),
    DevelopmentTypeController: asClass(DevelopmentTypeController).singleton(),
    GroupController: asClass(GroupController).singleton(),
    InductionPeriodController: asClass(InductionPeriodController).singleton(),
    WorkshopRegistrationController: asClass(
      WorkshopRegistrationController
    ).singleton(),
  })
  .register({
    //Configuración de rutas
    ManagementCourtRoutes: asFunction(ManagementCourtRoutes).singleton(),
    ManagementTopicRoutes: asFunction(ManagementTopicRoutes).singleton(),
    ManagementTutorRoutes: asFunction(ManagementTutorRoutes).singleton(),
    EnrollmentRoutes: asFunction(EnrollmentRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    RolRoutes: asFunction(RolRoutes).singleton(),
    RolePermissionRoutes: asFunction(RolePermissionRoutes).singleton(),
    PermissionRoutes: asFunction(PermissionRoutes).singleton(),
    SubPermissionRoutes: asFunction(SubPermissionRoutes).singleton(),
    ModalityRoutes: asFunction(ModalityRoutes).singleton(),
    DevelopmentTypeRoutes: asFunction(DevelopmentTypeRoutes).singleton(),
    GroupRoutes: asFunction(GroupRoutes).singleton(),
    InductionPeriodRoutes: asFunction(InductionPeriodRoutes).singleton(),
    WorkshopRegistrationRoutes: asFunction(
      WorkshopRegistrationRoutes
    ).singleton(),
  })
  .register({
    //Configuración de modelos
    ManagementCourt: asValue(ManagementCourt),
    ManagementTopic: asValue(ManagementTopic),
    ManagementTutor: asValue(ManagementTutor),
    Enrollment: asValue(Enrollment),
    User: asValue(User),
    Rol: asValue(Rol),
    RolePermission: asValue(RolePermission),
    Permission: asValue(Permission),
    SubPermission: asValue(SubPermission),
    Modality: asValue(Modality),
    DevelopmentType: asValue(DevelopmentType),
    Group: asValue(Group),
    InductionPeriod: asValue(InductionPeriod),
    WorkshopRegistration: asValue(WorkshopRegistration),
  })
  .register({
    //middlewares
    AuthMiddleware: asFunction(protect).singleton(),
  })
  .register({
    //Configuración de funciones
  });

module.exports = container;
