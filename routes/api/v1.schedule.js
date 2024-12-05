const { Router } = require("express");

module.exports = function ({ ScheduleController }) {
  const router = Router();

  router.post("/create", ScheduleController.create);
  router.get("/get-all", ScheduleController.getAll);
  router.get("/get/:id", ScheduleController.getOne);
  router.put("/update/:id", ScheduleController.update);
  router.delete("/delete/:id", ScheduleController.delete);

  return router;
};
