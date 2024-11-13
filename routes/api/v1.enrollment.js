const { Router } = require("express");

module.exports = function ({ EnrollmentController }) {
  const router = Router();

  router.get("/get-all", EnrollmentController.getAll);
  router.get("/get/:id", EnrollmentController.getOne);
  router.post("/create", EnrollmentController.create);
  router.put("/update/:id", EnrollmentController.update);
  router.delete("/delete/:id", EnrollmentController.delete);

  return router;
};
