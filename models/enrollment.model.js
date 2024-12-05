const mongoose = require('mongoose');
const { Schema } = mongoose;

const enrollmentSchema = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    modality: { type: Schema.Types.ObjectId, ref: 'Modality' },
    topicTitle: { type: String },
    problemDescription: { type: String },
    developmentMechanism: {
      type: Schema.Types.ObjectId,
      ref: 'DevelopmentType',
    },
    partner: { type: Schema.Types.ObjectId, ref: 'User' },
    preferredTutors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    group: { type: Schema.Types.ObjectId, ref: 'Group' },
    isGroupCreated: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Enrollment', enrollmentSchema);
