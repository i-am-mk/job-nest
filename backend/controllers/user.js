import { User } from '../models/user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      profilePicture,
      password
    } = req.body;

    console.log('req.body', req.body);
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
      profilePicture,
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
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
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
          profilePicture: user.profilePicture
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
    return res.status(200).json('token', '', { maxAge: 0 }).json({
      message: 'Logout successfully.',
      success: false
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};
