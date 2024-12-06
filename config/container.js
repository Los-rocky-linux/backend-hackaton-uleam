const { createContainer, asClass, asValue, asFunction } = require("awilix");

// Config
const config = require(".");

// Routes
const Routes = require("../routes");

// Services
const {
  ScheduleService,
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
  SustentationService,
  SustentationDocumentService,
} = require("../services");

// Controllers
const {
  ScheduleController,
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
  SustentationController,
  SustentationDocumentController,
} = require("../controllers");

// Startup
const { Database, Server } = require("../startup");

// Routes
const {
  ScheduleRoutes,
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
  SustentationRoutes,
  SustentationDocumentRoutes
} = require("../routes/api/index");

// Models
const {
  Schedule,
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
  Sustentation,
  SustentationDocument
} = require("../models");

// Middleware
const { protect } = require("../middleware/authMiddleware");

const container = createContainer();

container
  .register({
    router: asFunction(Routes).singleton(),
    config: asValue(config),
    Database: asClass(Database).singleton(),
    Server: asClass(Server).singleton(),
  })
  .register({
    // Servicios
    ScheduleService: asClass(ScheduleService).singleton(),
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
    WorkshopRegistrationService: asClass(WorkshopRegistrationService).singleton(),
    SustentationService: asClass(SustentationService).singleton(),
    SustentationDocumentService: asClass(SustentationDocumentService).singleton(),

  })
  .register({
    // Controladores
    ScheduleController: asClass(ScheduleController).singleton(),
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
    WorkshopRegistrationController: asClass(WorkshopRegistrationController).singleton(),
    SustentationController: asClass(SustentationController).singleton(),
    SustentationDocumentController: asClass(SustentationDocumentController).singleton(),

  })
  .register({
    // Rutas
    ScheduleRoutes: asFunction(ScheduleRoutes).singleton(),
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
    WorkshopRegistrationRoutes: asFunction(WorkshopRegistrationRoutes).singleton(),
    SustentationRoutes: asFunction(SustentationRoutes).singleton(),
    SustentationDocumentRoutes: asFunction(SustentationDocumentRoutes).singleton(),

  })
  .register({
    // Modelos
    Schedule: asValue(Schedule),
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
    Sustentation: asValue(Sustentation),
    SustentationDocument: asValue(SustentationDocument),
  })
  .register({
    // Middlewares
    AuthMiddleware: asFunction(protect).singleton(),
  });

module.exports = container;
