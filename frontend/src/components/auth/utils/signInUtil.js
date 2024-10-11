export const validateForm = (userData) => {
  const errors = {
    email: "",
    password: "",
    role: "",
  };

  if (!userData.email) errors.email = "Email is required.";
  if (!userData.password) errors.password = "Password is required.";
  if (!userData.role) errors.role = "Role is required.";

  return errors;
};
