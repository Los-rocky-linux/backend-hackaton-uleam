const { Router } = require("express");

module.exports = function ({ ManagementTopicController }) {
  const router = Router();

  router.post("/create", ManagementTopicController.create);
  router.get("/get-all", ManagementTopicController.getAll);
  router.get("/get/:id", ManagementTopicController.getOne);
  router.put("/update/:id", ManagementTopicController.update);
  router.delete("/delete/:id", ManagementTopicController.delete);

  return router;
}