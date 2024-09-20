import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import {
  applyJob,
  getUserAppliedJobs,
  getJobApplicantsByJobId,
  updateApplicationStatusByApplicationId
} from '../controllers/application.js';

const applicationRoute = express.Router();

applicationRoute
  .route('/my-applications')
  .get(isAuthenticated, getUserAppliedJobs);
applicationRoute.route('/apply').post(isAuthenticated, applyJob);
applicationRoute
  .route('/job/:id/applicants')
  .get(isAuthenticated, getJobApplicantsByJobId);
applicationRoute
  .route('/:id/updateStatus')
  .post(isAuthenticated, updateApplicationStatusByApplicationId);

export default applicationRoute;
