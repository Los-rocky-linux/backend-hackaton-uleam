const { Router } = require("express");

module.exports = function ({ SubPermissionController }) {
  const router = Router();

  router.get("/get-all", SubPermissionController.getAll);
  router.get("/get/:id", SubPermissionController.getOne);
  router.post("/create", SubPermissionController.create);
  router.put("/update/:id", SubPermissionController.update);
  router.delete("/delete/:id", SubPermissionController.delete);

  return router;
};