import express from 'express';
import { register, login, logout, updateProfile } from '../controllers/user.js';
import { uploadFields } from '../middleware/multer.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const userRoute = express.Router();

userRoute.route('/register').post(uploadFields, register);
userRoute.route('/login').post(login);
userRoute.route('/logout').get(logout);
userRoute
  .route('/profile/update')
  .post(isAuthenticated, uploadFields, updateProfile);

export default userRoute;
