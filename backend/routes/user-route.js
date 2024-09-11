import express from 'express';
import { register, login, logout } from '../controllers/user.js';

const userRoute = express.Router();

userRoute.route('/register').post(register);
userRoute.route('/login').post(login);
userRoute.route('/logout').post(logout);

export default userRoute;
