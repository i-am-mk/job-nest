import { Application } from '../models/application-model.js';
import { Job } from '../models/job-model.js';

export const applyJob = async (req, res) => {
  try {
    const { userId, jobId, resume } = req.body;

    if (!userId || !jobId || !resume) {
      return res.status(400).json({
        message: 'All fields are required.',
        success: false
      });
    }

    const targetJob = await Job.findById(jobId);
    if (!targetJob) {
      return res.status(404).json({
        message: 'Job not found.',
        success: false
      });
    }

    const existingUserApplication = await Application.findOne({
      jobId,
      userId
    });
    if (existingUserApplication) {
      return res.status(400).json({
        message: 'Application already exists for this job.',
        success: false
      });
    }

    const userApplication = await Application.create({
      userId,
      jobId,
      resume
    });

    targetJob.applications.push(userApplication._id);
    await targetJob.save();

    return res.status(201).json({
      message: 'Application submitted successfully.',
      success: true
    });
  } catch (error) {
    console.error('Error while applying for job:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};

export const getUserAppliedJobs = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        message: 'User ID is required.',
        success: false
      });
    }

    const userApplications = await Application.find({ userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'jobId',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'company',
          options: { sort: { createdAt: -1 } }
        }
      });

    if (!userApplications || userApplications.length === 0) {
      return res.status(404).json({
        message: 'No applications found.',
        success: false
      });
    }

    return res
      .status(200)
      .json({ applications: userApplications, success: true });
  } catch (error) {
    console.error('Error while retrieving applied jobs:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};

export const getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.body;

    // Retrieve job and populate applications with user details
    const jobWithApplicants = await Job.findById(jobId).populate({
      path: 'applications',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'userId'
      }
    });

    // Check if the job exists
    if (!jobWithApplicants) {
      return res.status(404).json({
        message: 'No job found.',
        success: false
      });
    }

    return res.status(200).json({ job: jobWithApplicants, success: true });
  } catch (error) {
    console.error('Error while retrieving applicants:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId, status } = req.body;

    if (!applicationId || !status) {
      return res.status(400).json({
        message: 'All fields are required.',
        success: false
      });
    }

    const targetApplication = await Application.findById(applicationId);
    if (!targetApplication) {
      return res.status(404).json({
        message: 'Application not found.',
        success: false
      });
    }

    targetApplication.status = status;
    await targetApplication.save();

    return res.status(200).json({
      message: 'Application status updated successfully.',
      success: true,
      application: targetApplication
    });
  } catch (error) {
    console.error('Error while updating application status:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false
    });
  }
};
