const { Router } = require("express");

module.exports = function ({ RolePermissionController }) {
  const router = Router();
  router.get("/get-all", RolePermissionController.getAll);
  router.get("/get/:id", RolePermissionController.getOne);
  router.post("/create", RolePermissionController.create);
  router.put("/update/:id", RolePermissionController.update);
  router.delete("/delete/:id", RolePermissionController.delete);
  return router;
};
