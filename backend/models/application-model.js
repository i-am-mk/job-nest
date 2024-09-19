import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true
    },
    resume: {
      type: String
    },
    status: {
      type: String,
      enum: ['PENDING', 'REVIEWED', 'INTERVIEW', 'REJECTED', 'ACCEPTED'],
      default: 'PENDING'
    },
    applicationDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export const Application = mongoose.model('Application', applicationSchema);
