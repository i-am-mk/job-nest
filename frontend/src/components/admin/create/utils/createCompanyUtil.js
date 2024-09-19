export const validateCompanyData = (companyData) => {
  const errors = {};

  if (!companyData.name.trim()) {
    errors.name = "Company name is required.";
  }

  if (companyData.website && !/^https?:\/\/.+\..+/.test(companyData.website)) {
    errors.website = "Please enter a valid website URL.";
  }

  return errors;
};

export const prepareFormData = (companyData) => {
  const formData = new FormData();
  formData.append("name", companyData.name);
  formData.append("description", companyData.description);
  formData.append("website", companyData.website);
  formData.append("location", companyData.location);
  formData.append("userId", companyData.userId);
  if (companyData.logo) {
    formData.append("logo", companyData.logo);
  }

  return formData;
};
