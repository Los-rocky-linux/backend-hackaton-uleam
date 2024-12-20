const mongoose = require('mongoose');
const { Schema } = mongoose;

const sustentationDocumentSchema = new Schema({
  documents: [
    {
      name: { type: String, required: true },
      url: { type: String, required: true },
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SustentationDocument', sustentationDocumentSchema);
