export const validateForm = ({ formData, setFormErrors }) => {
  const errors = {};
  if (!formData.firstName) errors.firstName = "First Name is required.";
  if (!formData.lastName) errors.lastName = "Last Name is required.";
  if (!formData.email) errors.email = "Email is required.";
  if (!formData.phoneNumber) errors.phoneNumber = "Phone Number is required.";
  if (!formData.role) errors.role = "Role is required.";
  if (!formData.password) errors.password = "Password is required.";

  setFormErrors(errors);
  return Object.values(errors).every((err) => err === "");
};
