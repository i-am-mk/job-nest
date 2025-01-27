import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user-route.js';
import companyRoute from './routes/company-route.js';
import jobRoute from './routes/job-route.js';
import applicationRoute from './routes/application-route.js';
import otpRoute from './routes/otp-route.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
  origin: 'http://localhost:5173',
  credentials: true
};
app.use(cors(corsOption));

app.use('/api/user', userRoute);
app.use('/api/company', companyRoute);
app.use('/api/job', jobRoute);
app.use('/api/application', applicationRoute);
app.use('/api/otp', otpRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
