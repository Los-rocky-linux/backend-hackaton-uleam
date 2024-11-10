const { Router } = require("express");

module.exports = function ({ PermissionController }) {
  const router = Router();
  router.get("/get-all", PermissionController.getAll);
  router.get("/get/:id", PermissionController.getOne);
  router.post("/create", PermissionController.create);
  router.put("/update/:id", PermissionController.update);
  router.delete("/delete/:id", PermissionController.delete);
  return router;
};
