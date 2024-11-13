const { Router } = require("express");

module.exports = function ({ RolController }) {
  const router = Router();
  router.get("/get-all", RolController.getAll);
  router.get("/get/:id", RolController.getOne);
  router.post("/create", RolController.create);
  router.put("/update/:id", RolController.update);
  router.delete("/delete/:id", RolController.delete);
  return router;
};
