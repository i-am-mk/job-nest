import { useDispatch } from "react-redux";
import { validateForm } from "../utils/registerUtil";
import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import {
  OTP_API_ENDPOINT,
  USER_API_ENDPOINT,
} from "@/components/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const useRegisterHandlers = ({ formData, setFormData, setFormErrors }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const sendOtp = async (userDraftId) => {
    try {
      const response = await axios.post(`${OTP_API_ENDPOINT}/send-otp`, {
        userDraftId,
        phoneNumber: formData.phoneNumber,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/otpverification", {
          state: {
            id: response.data.id,
            phoneNumber: formData.phoneNumber,
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error?.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validateForm({ formData, setFormErrors })) {
      dispatch(setLoading(true));
      try {
        const res = await axios.post(
          `${USER_API_ENDPOINT}/create-user-draft`,
          formData
        );

        if (res.data.success) {
          await sendOtp(res.data.id);
        }
      } catch (error) {
        console.error(error);
      }
      dispatch(setLoading(false));
    }
  };

  return { handleChange, handleRegister };
};

export default useRegisterHandlers;
