import { Company } from '../models/company-model.js';
import cloudinary from '../utils/cloudinary.js';
import getDataUri from '../utils/datauri.js';

export const getCompanyById = async (req, res) => {
  try {
    const { id: companyId } = req.params;
    const company = await Company.findById(companyId);
    if (!company)
      return res.status(404).json({
        success: false,
        message: 'No company found.'
      });

    return res.status(200).json({
      success: true,
      company,
      message: 'Company found.'
    });
  } catch (error) {
    console.error('Error fetching company by company ID:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};

export const getCompaniesByUserId = async (req, res) => {
  try {
    const { id: userId } = req.query;
    const companies = await Company.find({ userId });
    if (companies.length == 0)
      return res.status(200).json({
        success: true,
        companies: [],
        message: 'No companies found for this user.'
      });

    return res.status(200).json({
      success: true,
      companies,
      message: 'Companies found.'
    });
  } catch (error) {
    console.error('Error fetching companies by user ID:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};

export const createCompany = async (req, res) => {
  try {
    const { name, description, website, location, userId } = req.body;
    if (!name || !userId)
      return res.status(400).json({
        message: 'Name and User ID are mandatory.',
        success: false
      });

    const logoFile = req.files?.logo ? req.files.logo[0] : null;
    let logoUrl = '';

    if (logoFile) {
      const fileUri = getDataUri(logoFile);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logoUrl = cloudResponse.secure_url;
    }

    const existingCompany = await Company.findOne({ name });
    if (existingCompany)
      return res.status(400).json({
        message: 'Company already exists.',
        success: false
      });

    const newCompany = await Company.create({
      name,
      description,
      website,
      location,
      logo: logoUrl,
      userId
    });

    return res.status(201).json({
      company: newCompany,
      message: 'Company created successfully.',
      success: true
    });
  } catch (error) {
    console.error('Error registering company:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { id: companyId, name, description, website, location, logo } = req;
    const company = await Company.findById(companyId);
    if (!company)
      return res.status(400).json({
        success: false,
        message: 'Incorrect company.'
      });

    if (name) company.name = name;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;
    if (logo) company.logo = logo;

    await company.save();

    return res.status(200).json({
      success: true,
      company,
      message: 'Company updated successfully.'
    });
  } catch (error) {
    console.error('Error updating company:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};
