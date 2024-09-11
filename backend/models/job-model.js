import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    salary: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true
    },
    jobType: {
      type: String,
      enum: ['FULL-TIME', 'PART-TIME', 'CONTRACT', 'INTERNSHIP'],
      required: true
    },
    experienceLevel: {
      type: Number,
      required: true
    },
    postedDate: {
      type: Date,
      default: Date.now
    },
    applicationDeadline: {
      type: Date
    },
    requirements: {
      type: [String]
    },
    status: {
      type: String,
      enum: ['OPEN', 'CLOSED'],
      default: 'Active'
    },
    skills: {
      type: [String]
    },
    createdBy: {
      type: String,
      required: true
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
      }
    ]
  },
  {
    timestamps: true
  }
);

export const Job = mongoose.model('Job', jobSchema);
