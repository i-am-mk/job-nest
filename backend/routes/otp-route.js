import express from 'express';
import { sendOTP, verifyOTP } from '../controllers/otp.js';

const otpRoute = express.Router();

otpRoute.route('/send-otp').post(sendOTP);
otpRoute.route('/verify-otp').post(verifyOTP);

export default otpRoute;
