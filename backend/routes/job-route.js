import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import {
  searchJobs,
  getJobById,
  getJobsByAdminId,
  createJob
} from '../controllers/job.js';

const jobRoute = express.Router();

jobRoute.route('/jobs/:id').get(isAuthenticated, getJobById);
jobRoute.route('/admins/:adminId/jobs').get(isAuthenticated, getJobsByAdminId);
jobRoute.route('/jobs').get(isAuthenticated, searchJobs);
jobRoute.route('/jobs').post(isAuthenticated, createJob);

export default jobRoute;
