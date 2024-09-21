import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false
    },
    userDraftId: {
      type: String,
      required: false
    },
    otp: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    }
  },
  {
    validate: {
      validator: function () {
        return this.userId || this.userDraftId;
      },
      message: 'At least one of userId or userDraftId is required.'
    }
  }
);

export const Otp = mongoose.model('Otp', otpSchema);
