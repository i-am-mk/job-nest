import { OTP_API_ENDPOINT, USER_API_ENDPOINT } from "@/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useOtpVerificationHandlers = ({
  id,
  phoneNumber,
  otp,
  setTimer,
  setIsResendEnabled,
  setIsVerified,
  setFormError,
}) => {
  const navigate = useNavigate();

  const handleResend = async () => {
    try {
      const res = await axios.post(
        `${OTP_API_ENDPOINT}/send-otp`,
        {
          userDraftId: id,
          phoneNumber,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        setTimer(60);
        setIsResendEnabled(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length === 0) {
      setFormError("OTP is required");
      return;
    }
    setFormError("");
    try {
      const res = await axios.post(
        `${OTP_API_ENDPOINT}/verify-otp`,
        {
          userDraftId: id,
          phoneNumber,
          otp,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setIsVerified(true);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error?.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${USER_API_ENDPOINT}/create-user`,
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/signin");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error?.message);
    }
  };

  return { handleResend, handleVerify, handleSubmit };
};

export default useOtpVerificationHandlers;
