import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { useRegisterHandlers } from "./hooks";

const Register = () => {
  const { loading } = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    password: "",
  });

  const { handleChange, handleRegister } = useRegisterHandlers({
    formErrors,
    setFormErrors,
    formData,
    setFormData,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
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
                className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:border-yellow-400"
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
                className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:border-yellow-400"
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
          <div className="flex items-center space-x-4">
            <Label htmlFor="role" className="text-sm font-medium">
              Role
            </Label>
            <RadioGroup
              className="flex gap-6"
              value={formData.role}
              onValueChange={(value) => {
                setFormErrors({ ...formErrors, role: "" });
                setFormData({ ...formData, role: value });
              }}
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
            {formErrors.role && (
              <p className="text-red-500 text-xs mt-1">{formErrors.role}</p>
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
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-400 text-gray-900 font-semibold rounded-md hover:bg-yellow-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Continue"}
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
