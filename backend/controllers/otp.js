import { User } from '../models/user-model.js';
import { UserDraft } from '../models/user-draft-model.js';
import { Otp } from '../models/otp-model.js';
// import { sendOTPFromClient } from '../twilio/twilio-client.js';

export const sendOTP = async (req, res) => {
  try {
    const { userId, userDraftId, phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        message: 'Phone number is required.',
        success: false
      });
    }

    if (!userId && !userDraftId) {
      return res.status(400).json({
        message: 'Either userId or userDraftId is required.',
        success: false
      });
    }

    let user;
    if (userId) {
      user = await User.findOne({ _id: userId });
    } else if (userDraftId) {
      user = await UserDraft.findOne({ _id: userDraftId });
    }

    if (!user) {
      return res.status(400).json({
        message: 'User not found with this identifier.',
        success: false
      });
    }

    const otp = 12345;
    console.log('OTP:', otp);

    // const otp = await sendOTPFromClient(phoneNumber);

    const existingOtpEntry = await Otp.findOne({
      $or: [{ userId }, { userDraftId }],
      expiresAt: { $gt: new Date() }
    });

    if (existingOtpEntry) {
      existingOtpEntry.otp = otp;
      existingOtpEntry.expiresAt = new Date(Date.now() + 60 * 1000);
      await existingOtpEntry.save();
    } else {
      await Otp.create({
        userId: userId || undefined,
        userDraftId: userDraftId || undefined,
        otp,
        phoneNumber,
        expiresAt: new Date(Date.now() + 60 * 1000)
      });
    }

    return res.status(200).json({
      message: 'OTP sent successfully!',
      id: userDraftId || userId,
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { userId, userDraftId, phoneNumber, otp } = req.body;

    if (!otp) {
      return res.status(400).json({
        message: 'OTP is required.',
        success: false
      });
    }

    const existingOtpEntry = await Otp.findOne({
      $or: [{ userId }, { userDraftId }],
      phoneNumber,
      expiresAt: { $gt: new Date() }
    });

    if (!existingOtpEntry) {
      return res.status(400).json({
        message: 'Invalid OTP or OTP expired.',
        success: false
      });
    }

    if (existingOtpEntry.otp !== otp) {
      return res.status(400).json({
        message: 'Incorrect OTP.',
        success: false
      });
    }

    let user;
    if (userId) {
      user = await User.findById({ _id: userId });
      user.save();
    } else {
      user = await UserDraft.findById({ _id: userDraftId });
    }
    return res.status(200).json({
      message: 'OTP verified successfully!',
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};
