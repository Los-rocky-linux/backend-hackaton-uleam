const { Router } = require("express");

module.exports = function ({ ModalityController }) {
  const router = Router();

  router.post("/create", ModalityController.create);
  router.get("/get-all", ModalityController.getAll);
  router.get("/get/:id", ModalityController.getOne);
  router.put("/update/:id", ModalityController.update);
  router.delete("/delete/:id", ModalityController.delete);

  return router;
};
