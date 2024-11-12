const { Router } = require("express");

module.exports = function ({ GroupController }) {
  const router = Router();

  router.get("/get-all-groups", GroupController.getAllGroups);
  // router.get("/get-student-partners", GroupController.getStudentPartners);
  router.get("/get/:id", GroupController.getOne);
  router.post("/create", GroupController.create);
  router.put("/update/:id", GroupController.update);
  router.delete("/delete/:id", GroupController.delete);

  return router;
};
