const { Router } = require("express");

module.exports = function ({ DevelopmentTypeController }) {
  const router = Router();

  router.post("/create", DevelopmentTypeController.create);
  router.get("/get-all", DevelopmentTypeController.getAll);
  router.get("/get/:id", DevelopmentTypeController.getOne);
  router.put("/update/:id", DevelopmentTypeController.update);
  router.delete("/delete/:id", DevelopmentTypeController.delete);

  return router;
};
