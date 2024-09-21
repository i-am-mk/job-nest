import express from 'express';
import {
  createUser,
  login,
  logout,
  updateProfile,
  // verifyRegistrationOTP,
  createUserDraft
} from '../controllers/user.js';
import { uploadFields } from '../middleware/multer.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const userRoute = express.Router();

userRoute.route('/create-user-draft').post(createUserDraft);
userRoute.route('/create-user').post(createUser);
// userRoute.route('/verify-otp').post(verifyRegistrationOTP);
userRoute.route('/login').post(login);
userRoute.route('/logout').get(logout);
userRoute
  .route('/profile/update')
  .post(isAuthenticated, uploadFields, updateProfile);

export default userRoute;
