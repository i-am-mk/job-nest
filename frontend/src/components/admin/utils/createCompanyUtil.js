export const validateCompanyData = (companyData) => {
  const errors = {};
  const errorKey = {
    name: "Company Name",
    description: "Description",
    website: "Website",
    location: "Location",
    logo: "Logo",
  };

  for (let key in errorKey) {
    const value = companyData[key];
    if (!value || (typeof value === "string" && !value.trim())) {
      errors[key] = `${errorKey[key]} is required.`;
    }
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
