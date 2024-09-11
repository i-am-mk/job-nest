import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import {
  getCompanyById,
  getCompaniesByUserId,
  createCompany,
  updateCompany
} from '../controllers/company.js';

const companyRoute = express.Router();

companyRoute.route('/:id').get(isAuthenticated, getCompanyById);
companyRoute.route('/companies').get(isAuthenticated, getCompaniesByUserId);
companyRoute.route('/create').post(isAuthenticated, createCompany);
companyRoute.route('/:id/update').put(isAuthenticated, updateCompany);

export default companyRoute;
