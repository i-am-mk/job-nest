import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { uploadFields } from '../middleware/multer.js';
import {
  getCompanyById,
  getCompaniesByUserId,
  createCompany,
  updateCompany
} from '../controllers/company.js';

const companyRoute = express.Router();

companyRoute.route('/companies').get(isAuthenticated, getCompaniesByUserId);
companyRoute.route('/:id').get(isAuthenticated, getCompanyById);
companyRoute
  .route('/create')
  .post(isAuthenticated, uploadFields, createCompany);
companyRoute.route('/:id/update').put(isAuthenticated, updateCompany);

export default companyRoute;
