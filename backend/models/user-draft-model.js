import mongoose from 'mongoose';

const createDraftUserSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const UserDraft = mongoose.model('UserDraft', createDraftUserSchema);
