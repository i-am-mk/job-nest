import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Label, RadioGroup, RadioGroupItem } from "../../ui";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import useSignInHandlers from "./hooks/useSignInHandlers";

const SignIn = () => {
  const { loading } = useSelector((store) => store.auth);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { handleChange, handleSubmit } = useSignInHandlers({
    userData,
    setUserData,
    setFormErrors,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="block text-sm font-medium">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:border-yellow-400"
              placeholder="Enter your email"
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
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
              value={userData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:border-yellow-400"
              placeholder="Enter your password"
            />
            {formErrors.password && (
              <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="role" className="text-sm font-medium">
              Role
            </Label>
            <RadioGroup
              className="flex gap-6"
              value={userData.role}
              onValueChange={(value) =>
                setUserData({ ...userData, role: value })
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
            {formErrors.role && (
              <p className="text-red-500 text-xs mt-1">{formErrors.role}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-400 text-gray-900 font-semibold rounded-md hover:bg-yellow-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Sign In"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-gray-300 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-yellow-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
