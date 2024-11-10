//Configurar nuestro contenedor de injección de depencia
const { createContainer, asClass, asValue, asFunction } = require("awilix");

//Config
const config = require(".");

//Routes
const Routes = require("../routes");

//Services
const { 
  SubPermissionService,
  EnrollmentService,

} = require("../services");
//Controllers
const { 
  SubPermissionController,
  EnrollmentController,
 } = require("../controllers");

//Startup
const { Database, Server } = require("../startup");

//Routes

const { 
  SubPermissionRoutes,
  EnrollmentRoutes,
 } = require("../routes/api/index");

//Models
const {
   SubPermission,
   Enrollment } = require("../models");

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
    SubPermissionService: asClass(SubPermissionService).singleton(),
    EnrollmentService: asClass(EnrollmentService).singleton(),
  })
  .register({
    //Configuración de los controladores
    SubPermissionController: asClass(SubPermissionController).singleton(),
    EnrollmentController: asClass(EnrollmentController).singleton(),
  })
  .register({
    //Configuración de rutas
    SubPermissionRoutes: asFunction(SubPermissionRoutes).singleton(),
    EnrollmentRoutes: asFunction(EnrollmentRoutes).singleton()
  })
  .register({
    //Configuración de modelos
    SubPermission: asValue(SubPermission),
    Enrollment: asValue(Enrollment)
  })
  .register({
    //middlewares
    AuthMiddleware: asFunction(protect).singleton(),
  })
  .register({
    //Configuración de funciones
  });

module.exports = container;
