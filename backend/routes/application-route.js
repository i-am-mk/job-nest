import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import {
  applyJob,
  getUserAppliedJobs,
  getJobApplicants,
  updateApplicationStatus
} from '../controllers/application.js';

const applicationRoute = express.Router();

applicationRoute.route('/apply').post(isAuthenticated, applyJob);
applicationRoute
  .route('/my-applications')
  .get(isAuthenticated, getUserAppliedJobs);
applicationRoute
  .route('/job/:id/applicants')
  .get(isAuthenticated, getJobApplicants);
applicationRoute
  .route('/:id/updateStatus')
  .put(isAuthenticated, updateApplicationStatus);

export default applicationRoute;
