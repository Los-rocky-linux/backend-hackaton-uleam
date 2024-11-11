//Configurar nuestro contenedor de injección de depencia
const { createContainer, asClass, asValue, asFunction } = require("awilix");

//Config
const config = require(".");

//Routes
const Routes = require("../routes");

//Services
const { 
  EnrollmentService,
  UserService,
  RolService,
  RolePermissionService,
  PermissionService,
  SubPermissionService,
  ModalityService,
  DevelopmentTypeService,
  GroupService
} = require("../services");
//Controllers
const { 
  EnrollmentController,
  UserController,
  RolController,
  RolePermissionController,
  PermissionController,
  SubPermissionController,
  ModalityController,
  DevelopmentTypeController,
  GroupController
 } = require("../controllers");

//Startup
const { Database, Server } = require("../startup");

//Routes

const { 
  EnrollmentRoutes,
  UserRoutes,
  RolRoutes,
  RolePermissionRoutes,
  PermissionRoutes,
  SubPermissionRoutes,
  ModalityRoutes,
  DevelopmentTypeRoutes,
  GroupRoutes
 } = require("../routes/api/index");

//Models
const {
   Enrollment,
   User,
   Rol,
   RolePermission,
   Permission,
   SubPermission,
   Modality,
   DevelopmentType,
   Group
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
    EnrollmentService: asClass(EnrollmentService).singleton(),
    UserService: asClass(UserService).singleton(),
    RolService: asClass(RolService).singleton(),
    RolePermissionService: asClass(RolePermissionService).singleton(),
    PermissionService: asClass(PermissionService).singleton(),
    SubPermissionService: asClass(SubPermissionService).singleton(),
    ModalityService: asClass(ModalityService).singleton(),
    DevelopmentTypeService: asClass(DevelopmentTypeService).singleton(),
    GroupService: asClass(GroupService).singleton(),
  })
  .register({
    //Configuración de los controladores
    EnrollmentController: asClass(EnrollmentController).singleton(),
    UserController: asClass(UserController).singleton(),
    RolController: asClass(RolController).singleton(),
    RolePermissionController: asClass(RolePermissionController).singleton(),
    PermissionController: asClass(PermissionController).singleton(),
    SubPermissionController: asClass(SubPermissionController).singleton(),
    ModalityController: asClass(ModalityController).singleton(),
    DevelopmentTypeController: asClass(DevelopmentTypeController).singleton(),
    GroupController: asClass(GroupController).singleton(),
  })
  .register({
    //Configuración de rutas
    EnrollmentRoutes: asFunction(EnrollmentRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    RolRoutes: asFunction(RolRoutes).singleton(),
    RolePermissionRoutes: asFunction(RolePermissionRoutes).singleton(),
    PermissionRoutes: asFunction(PermissionRoutes).singleton(),
    SubPermissionRoutes: asFunction(SubPermissionRoutes).singleton(),
    ModalityRoutes: asFunction(ModalityRoutes).singleton(),
    DevelopmentTypeRoutes: asFunction(DevelopmentTypeRoutes).singleton(),
    GroupRoutes: asFunction(GroupRoutes).singleton(),
  })
  .register({
    //Configuración de modelos
    Enrollment: asValue(Enrollment),
    User: asValue(User),
    Rol: asValue(Rol),
    RolePermission: asValue(RolePermission),
    Permission: asValue(Permission),
    SubPermission: asValue(SubPermission),
    Modality: asValue(Modality),
    DevelopmentType: asValue(DevelopmentType),
    Group: asValue(Group),
  })
  .register({
    //middlewares
    AuthMiddleware: asFunction(protect).singleton(),
  })
  .register({
    //Configuración de funciones
  });

module.exports = container;
