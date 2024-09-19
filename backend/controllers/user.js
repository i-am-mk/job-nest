import { User } from '../models/user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, role, password } =
      req.body;

    const profilePhotoFile = req.files?.profilePhoto
      ? req.files.profilePhoto[0]
      : null;

    let profilePhotoUrl = '';

    if (profilePhotoFile) {
      const fileUri = getDataUri(profilePhotoFile);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    if (!firstName || !lastName || !email || !phoneNumber || !role || !password)
      return res.status(400).json({
        message: 'All fields are required.',
        success: false
      });

    const isUserExists = await User.findOne({ email });
    if (isUserExists)
      return res
        .status(400)
        .json({ message: 'User already exists.', success: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      profile: {
        profilePhoto: profilePhotoUrl
      },
      password: hashedPassword
    });

    return res
      .status(201)
      .json({ message: 'Account created successfully.', success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, skills, bio } = req.body;

    const profilePhotoFile = req.files?.profilePhoto
      ? req.files.profilePhoto[0]
      : null;
    const resumeFile = req.files?.resume ? req.files.resume[0] : null;

    let profilePhotoUrl = '';
    let resumeUrl = '';

    if (profilePhotoFile) {
      const fileUri = getDataUri(profilePhotoFile);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    if (resumeFile) {
      const fileUri = getDataUri(resumeFile);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      resumeUrl = cloudResponse.secure_url;
    }

    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: 'User not found.',
        success: false
      });
    }
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (skills) user.profile.skills = skills;
    if (bio) user.profile.bio = bio;

    if (profilePhotoUrl) {
      user.profile.profilePhoto = profilePhotoUrl;
    }

    if (resumeUrl) {
      user.profile.resume = resumeUrl;
      user.profile.resumeOriginalName = resumeFile?.originalname;
    }

    await user.save();

    user = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    };

    return res.status(200).json({
      message: 'Profile updated successfully.',
      user,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role)
      return res.status(400).json({
        message: 'All fields are required.',
        success: false
      });
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: 'Incorrect email or password.',
        success: false
      });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res
        .status(400)
        .json({ message: 'Incorrect password.', success: false });

    if (role != user.role)
      return res
        .status(400)
        .json({ message: 'Incorrect role.', success: false });

    const tokenData = {
      userId: user._id
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: '1d'
    });

    return res
      .status(200)
      .cookie('token', token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict'
      })
      .json({
        message: `Welcome ${user.lastName}, ${user.firstName}`,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: user.profile
        },
        success: true
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie('token', '', { maxAge: 0 }).json({
      message: 'Logout successfully.',
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};
