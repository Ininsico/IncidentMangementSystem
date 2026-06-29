const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'closed'],
      default: 'open',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
    location: {
      type: String,
      trim: true,
    },
    affectedService: {
      type: String,
      trim: true,
    },
    resolution: {
      type: String,
      trim: true,
    },
    resolvedAt: Date,
    closedAt: Date,
    dueDate: Date,
    tags: [String],
  },
  { timestamps: true }
);

incidentSchema.index({ status: 1, priority: 1 });
incidentSchema.index({ reportedBy: 1 });
incidentSchema.index({ assignedTo: 1 });
incidentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Incident', incidentSchema);
