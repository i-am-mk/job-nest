import { Job } from '../models/job-model.js';

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: 'Job ID is required.',
        success: false
      });
    }

    const job = await Job.findById(id)
      .populate({
        path: 'applications'
      })
      .populate({ path: 'company' });
    if (!job) {
      return res.status(404).json({
        message: 'Job not found.',
        success: false
      });
    }

    return res.status(200).json({
      message: 'Job found.',
      success: true,
      job
    });
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};

// Get jobs created by a specific admin
export const getJobsByAdminId = async (req, res) => {
  try {
    const { adminId } = req.params;
    if (!adminId) {
      return res.status(400).json({
        message: 'Admin ID is required.',
        success: false
      });
    }

    const jobs = await Job.find({ createdBy: adminId });
    if (!jobs || jobs.length === 0) {
      return res.status(200).json({
        message: 'No jobs found for this admin.',
        jobs: [],
        success: true
      });
    }

    return res.status(200).json({
      message: 'Jobs found.',
      success: true,
      jobs
    });
  } catch (error) {
    console.error('Error fetching jobs by admin ID:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};

// Search jobs with optional search term
export const searchJobs = async (req, res) => {
  try {
    const searchTerm = req.query.keyword || '';
    const query = {
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ]
    };

    const jobs = await Job.find(query)
      .populate({ path: 'company' })
      .sort({ createdAt: -1 });
    if (!jobs || jobs.length === 0) {
      return res.status(200).json({
        message: 'No Jobs found.',
        jobs: [],
        success: true
      });
    }

    return res.status(200).json({
      message: 'Jobs found.',
      success: true,
      jobs
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};

export const create = async (req, res) => {
  try {
    const {
      title,
      description,
      salary,
      location,
      companyId,
      jobType,
      experienceLevel,
      applicationDeadline,
      requirements,
      skills
    } = req.body;

    console.log(
      title,
      description,
      salary,
      location,
      companyId,
      jobType,
      experienceLevel,
      applicationDeadline,
      requirements,
      skills
    );

    const userId = req.id;

    if (
      !title ||
      !description ||
      !salary ||
      !location ||
      !companyId ||
      !jobType ||
      !experienceLevel ||
      !applicationDeadline ||
      !requirements ||
      !skills
    ) {
      return res.status(400).json({
        message: 'All fields are required to create a job.',
        success: false
      });
    }

    const newJob = new Job({
      title,
      description,
      salary,
      location,
      company: companyId,
      jobType,
      experienceLevel,
      applicationDeadline,
      requirements,
      skills,
      createdBy: userId
    });

    await newJob.save();
    return res.status(201).json({
      message: 'Job created successfully.',
      success: true
    });
  } catch (error) {
    console.error('Error creating job:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};
