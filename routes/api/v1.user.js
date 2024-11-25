const { Router } = require('express');

module.exports = function ({ UserController }) {
  const router = Router();
  router.get('/get-all', UserController.getAll);
  //api para llamar solo tutores
  router.get("/get-all-tutor", UserController.getTutors);
  //api para llamar estudiantes
  router.get("/get-all-students", UserController.getStudents);
  router.get('/get/:id', UserController.getOne);
  router.post('/create', UserController.create);
  router.put('/update/:id', UserController.update);
  router.delete('/delete/:id', UserController.delete);
  
  router.post("/login", (req, res, next) =>
    UserController.login(req, res, next)
  );

  return router;
};
