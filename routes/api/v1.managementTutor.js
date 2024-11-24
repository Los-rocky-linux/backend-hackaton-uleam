const { Router } = require("express");

module.exports = function ({ ManagementTutorController }) {
  const router = Router();

  router.post("/create", ManagementTutorController.create);
  router.get("/get-all", ManagementTutorController.getAll);
  router.get("/get/:id", ManagementTutorController.getOne);
  router.put("/update/:id", ManagementTutorController.update);
  router.delete("/delete/:id", ManagementTutorController.delete);

  return router;
};
