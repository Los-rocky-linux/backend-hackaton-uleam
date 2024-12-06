const { Router } = require("express");

module.exports = function ({ SustentationDocumentController }) {
  const router = Router();

  router.get("/get-all", SustentationDocumentController.getAll);
  router.get("/get/:id", SustentationDocumentController.getOne);
  router.post("/create", SustentationDocumentController.create);
  router.put("/update/:id", SustentationDocumentController.update);
  router.delete("/delete/:id", SustentationDocumentController.delete);

  // Ruta para cargar documentos de sustentación
  router.post("/upload", SustentationDocumentController.uploadDocuments);

  return router;
};
