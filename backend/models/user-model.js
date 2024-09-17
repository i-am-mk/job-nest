import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    role: {
      type: String,
      enum: { values: ['STUDENT', 'RECRUITER'] },
      required: true
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String }, // URL to resume file
      resumeOriginalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
      profilePhoto: {
        type: String,
        default: ''
      }
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model('User', userSchema);
