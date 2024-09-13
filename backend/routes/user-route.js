import express from 'express';
import { register, login, logout } from '../controllers/user.js';
import { singleUpload } from '../middleware/multer.js';

const userRoute = express.Router();

userRoute.route('/register').post(singleUpload, register);
userRoute.route('/login').post(login);
userRoute.route('/logout').post(logout);

export default userRoute;
