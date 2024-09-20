import {
  Avatar,
  AvatarImage,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-gray-900 text-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-yellow-400">Nest</span>
          </h1>
        </div>

        <div className="flex items-center gap-8">
          <ul className="flex font-medium text-white gap-6">
            <li>
              <Link to={user?.role === "RECRUITER" ? "/admin/companies" : "/"}>
                {user?.role === "RECRUITER" ? "Companies" : "Dashboard"}
              </Link>
            </li>
            <li>
              <Link
                to={user?.role === "RECRUITER" ? "/admin/jobs" : "/joblistings"}
              >
                {user?.role === "RECRUITER" ? "Jobs" : "Job Listings"}
              </Link>
            </li>
          </ul>

          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-gray-700 hover:border-gray-500 transition">
                  <AvatarImage
                    src={
                      user.profile.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 bg-white text-gray-900 shadow-lg rounded-lg">
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="w-24 h-24 mb-2 border-2 border-gray-300">
                    <AvatarImage
                      src={
                        user.profile.profilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                      alt="@shadcn"
                    />
                  </Avatar>
                  <p className="text-lg font-semibold">{`Hi, ${user.lastName} ${user.firstName}`}</p>
                </div>

                <div className="flex flex-col gap-2">
                  {user?.role === "STUDENT" && (
                    <Button
                      variant="link"
                      className="flex items-center gap-2 text-gray-900 hover:text-gray-700"
                    >
                      <User2 className="w-4 h-4" />
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  )}
                  <Button
                    variant="link"
                    className="flex items-center gap-2 text-red-600 hover:text-red-400"
                    onClick={logoutHandler}
                  >
                    Logout
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex gap-2">
              <Link to="/signin">
                <Button
                  variant="outline"
                  className="text-black border-white hover:bg-gray-50"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline"
                  className="bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                >
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
