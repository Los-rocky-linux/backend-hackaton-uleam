const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
const { appResponse } = require("../utils/app-response");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).array("documents");

let _sustentationDocumentService = null;

module.exports = class SustentationDocumentController extends BaseController {
  constructor({ SustentationDocumentService }) {
    super(SustentationDocumentService);
    _sustentationDocumentService = SustentationDocumentService;
  }

  uploadDocuments = catchControllerAsync(async (req, res, next) => {
    upload(req, res, async (err) => {
      if (err) {
        return appResponse(res, 400, "Error al cargar los archivos", err);
      }

      if (!req.files || req.files.length === 0) {
        return appResponse(res, 400, "No se ha subido ningún archivo.");
      }

      const uploadedDocuments = req.files.map((file) => ({
        name: file.originalname,
        url: `/uploads/${file.filename}`,
      }));

      const savedDocuments = await this.service.create(uploadedDocuments);

      return appResponse(res, 200, "Documentos cargados correctamente.", savedDocuments);
    });
  });
};
