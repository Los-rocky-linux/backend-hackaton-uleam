const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");

let _sustentationDocument = null;

module.exports = class SustentationDocumentService extends BaseService {
  constructor({ SustentationDocument }) {
    super(SustentationDocument);
    _sustentationDocument = SustentationDocument;
  }
};
