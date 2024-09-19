import { USER_API_ENDPOINT } from "@/components/utils/constant";
import { setLoading, setUser } from "@/redux/authSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { validateForm } from "../utils/signInUtil";

const useSignInHandlers = ({ userData, setUserData, setFormErrors }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setUserData({
      ...userData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(userData);
    if (Object.values(errors).some((error) => error !== "")) {
      setFormErrors(errors);
      return;
    }
    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_ENDPOINT}/login`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data?.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      } else {
        throw new Error(res.data?.message || "Login failed.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { handleChange, handleSubmit };
};

export default useSignInHandlers;
