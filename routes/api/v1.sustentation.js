const { Router } = require("express");

module.exports = function ({ SustentationController }) {
  const router = Router();

  router.get("/get-all", SustentationController.getAll);
  router.get("/get/:id", SustentationController.getOne);
  router.post("/create", SustentationController.create);
  router.put("/update/:id", SustentationController.update);
  router.delete("/delete/:id", SustentationController.delete);

  return router;
};
