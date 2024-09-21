import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import {
  searchJobs,
  getJobById,
  getJobsByAdminId,
  create
} from '../controllers/job.js';

const jobRoute = express.Router();

jobRoute.route('/job/:id').get(isAuthenticated, getJobById);
jobRoute.route('/admins/:adminId/jobs').get(isAuthenticated, getJobsByAdminId);
jobRoute.route('/jobs').get(searchJobs);
jobRoute.route('/create').post(isAuthenticated, create);

export default jobRoute;
