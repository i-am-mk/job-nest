import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Register = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    profilePhoto: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    profilePhoto: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormErrors({ ...formErrors, [name]: "" });
    setFormData({
      ...formData,
      [name]: files && files.length ? files[0] : value,
    });
  };

  const validateForm = () => {
    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: "",
      profilePhoto: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.firstName) {
      errors.firstName = "First Name is required.";
    } else if (formData.firstName.length < 2) {
      errors.firstName = "Must be at least 2 characters.";
    } else if (formData.firstName.length > 50) {
      errors.firstName = "Cannot exceed 50 characters.";
    }

    if (!formData.lastName) {
      errors.lastName = "Last Name is required.";
    } else if (formData.lastName.length < 2) {
      errors.lastName = "Must be at least 2 characters.";
    } else if (formData.lastName.length > 50) {
      errors.lastName = "Cannot exceed 50 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email address.";
    } else if (formData.email.length > 254) {
      errors.email = "Cannot exceed 254 characters.";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Phone Number is required.";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = "Invalid Phone Number.";
    } else if (formData.phoneNumber.length > 15) {
      errors.phoneNumber = "Cannot exceed 15 characters.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Must be at least 8 characters long.";
    } else if (formData.password.length > 128) {
      errors.password = "Cannot exceed 128 characters.";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match.";
    } else if (formData.confirmPassword.length > 128) {
      errors.confirmPassword = "Cannot exceed 128 characters.";
    }

    if (!formData.role) {
      errors.role = "Role is required.";
    }

    if (formData.profilePhoto && formData.profilePhoto.size > 5 * 1024 * 1024) {
      errors.profilePhoto = "File size cannot exceed 5MB.";
    }

    setFormErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      dispatch(setLoading(true));
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("confirmPassword", formData.confirmPassword);

      if (formData.profilePhoto) {
        formDataToSend.append("profilePhoto", formData.profilePhoto);
      }

      const res = await axios.post(
        `${USER_API_ENDPOINT}/register`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/signin");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="firstName" className="block text-sm font-medium">
                First Name
              </Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:border-yellow-400"
                placeholder="Enter your first name"
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.firstName}
                </p>
              )}
            </div>
            <div className="flex-1">
              <Label htmlFor="lastName" className="block text-sm font-medium">
                Last Name
              </Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:border-yellow-400"
                placeholder="Enter your last name"
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.lastName}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:border-yellow-400"
              placeholder="Enter your email"
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phoneNumber" className="block text-sm font-medium">
              Phone Number
            </Label>
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:border-yellow-400"
              placeholder="Enter your phone number"
            />
            {formErrors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors.phoneNumber}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:border-yellow-400"
              placeholder="Enter your password"
            />
            {formErrors.password && (
              <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Confirm Password
            </Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:border-yellow-400"
              placeholder="Confirm your password"
            />
            {formErrors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors.confirmPassword}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="role" className="text-sm font-medium mr-3">
              Role
            </Label>
            <RadioGroup
              className="flex gap-6"
              value={formData.role}
              onValueChange={(value) =>
                setFormData({ ...formData, role: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="STUDENT" id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="RECRUITER" id="recruiter" />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="profile" className="text-sm font-medium">
              Profile Picture
            </Label>
            <Input
              type="file"
              accept="image/*"
              id="profilePhoto"
              name="profilePhoto"
              onChange={handleChange}
              className="cursor-pointer"
            />
            {formErrors.profilePhoto && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors.profilePhoto}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-400 text-gray-900 font-semibold rounded-md hover:bg-yellow-300"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Register"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-gray-300 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-yellow-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
