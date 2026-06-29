const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema(
  {
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Incident',
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      default: 'application/octet-stream',
    },
    fileSize: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

attachmentSchema.index({ incident: 1 });

module.exports = mongoose.model('Attachment', attachmentSchema);
