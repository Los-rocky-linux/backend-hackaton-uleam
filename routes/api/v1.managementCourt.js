const { Router } = require("express");

module.exports = function ({ ManagementCourtController }) {
  const router = Router();

  router.post("/create", ManagementCourtController.create);
  router.get("/get-all", ManagementCourtController.getAll);
  router.get("/get/:id", ManagementCourtController.getOne);
  router.put("/update/:id", ManagementCourtController.update);
  router.delete("/delete/:id", ManagementCourtController.delete);

    return router;
};
