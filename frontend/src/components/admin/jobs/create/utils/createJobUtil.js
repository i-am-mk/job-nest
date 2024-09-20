export const validateJobData = (jobData) => {
  const errors = {};

  const errorKey = {
    title: "Job Title",
    description: "Description",
    salary: "Salary",
    location: "Location",
    companyId: "Company",
    jobType: "Job Type",
    experienceLevel: "Experience Level",
    applicationDeadline: "Application Deadline",
  };

  for (let key in errorKey) {
    const value = jobData[key];
    if (!value || (typeof value === "string" && !value.trim())) {
      errors[key] = `${errorKey[key]} is required.`;
    }
  }

  if (jobData.requirements && !Array.isArray(jobData.requirements)) {
    errors.requirements = "Requirements should be an array of strings.";
  } else if (
    Array.isArray(jobData.requirements) &&
    jobData.requirements.length === 0
  ) {
    errors.requirements = "At least one requirement must be provided.";
  }

  if (jobData.salary && jobData.salary <= 0) {
    errors.salary = "Salary must be a positive number.";
  }

  if (jobData.experienceLevel && jobData.experienceLevel < 0) {
    errors.experienceLevel = "Experience Level must be a non-negative number.";
  }

  if (jobData.website && !/^https?:\/\/.+\..+/.test(jobData.website)) {
    errors.website = "Please enter a valid website URL.";
  }

  if (jobData.skills && !Array.isArray(jobData.skills)) {
    errors.skills = "Skills should be an array of strings.";
  } else if (Array.isArray(jobData.skills) && jobData.skills.length === 0) {
    errors.skills = "At least one skill must be provided.";
  }

  if (
    jobData.applicationDeadline &&
    isNaN(Date.parse(jobData.applicationDeadline))
  ) {
    errors.applicationDeadline = "Please enter a valid date.";
  }

  return errors;
};

export const prepareFormData = (jobData) => {
  const formData = new FormData();

  formData.append("title", jobData.title);
  formData.append("description", jobData.description);
  formData.append("salary", jobData.salary);
  formData.append("location", jobData.location);
  formData.append("companyId", jobData.companyId);
  formData.append("jobType", jobData.jobType);
  formData.append("experienceLevel", jobData.experienceLevel);

  if (jobData.applicationDeadline) {
    formData.append("applicationDeadline", jobData.applicationDeadline);
  }

  if (jobData.requirements && jobData.requirements.length > 0) {
    jobData.requirements.forEach((requirement) => {
      formData.append("requirements[]", requirement);
    });
  }

  if (jobData.skills && jobData.skills.length > 0) {
    jobData.skills.forEach((skill) => {
      formData.append("skills[]", skill);
    });
  }

  return formData;
};
