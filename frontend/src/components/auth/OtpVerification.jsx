import { useState, useEffect } from "react";
import { Button, Input, Label } from "@/components/ui";
import { useOtpVerificationHandlers } from "./hooks";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const OtpVerification = () => {
  const location = useLocation();
  const { id, phoneNumber } = location.state || {};
  const { loading } = useSelector((store) => store.auth);
  const [otp, setOtp] = useState("");
  const [formError, setFormError] = useState("");
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(60);
  const { handleResend, handleVerify, handleSubmit } =
    useOtpVerificationHandlers({
      id,
      phoneNumber,
      otp,
      setTimer,
      setIsResendEnabled,
      setFormError,
      setIsVerified,
    });

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsResendEnabled(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          OTP Verification
        </h2>
        <p className="text-center text-gray-300 mb-4">
          An OTP has been sent to{" "}
          <strong>{`+91 ******${phoneNumber.slice(-4)}`}</strong>
        </p>
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <Label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-300"
            >
              Enter OTP
            </Label>
            <Input
              type="text"
              id="otp"
              value={otp}
              disabled={isVerified}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:border-yellow-400"
              placeholder="Enter the OTP sent to your phone"
            />
            {formError && (
              <p className="text-red-500 text-xs mt-1">{formError}</p>
            )}
          </div>
          <div className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-400 text-gray-900 font-semibold rounded-md hover:bg-yellow-300 flex items-center justify-center"
              disabled={loading || isVerified}
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : isVerified ? (
                "Verified"
              ) : (
                "Verify OTP"
              )}
            </Button>
          </div>
          <div className="flex flex-col space-y-4">
            {/* {isResendEnabled ? (
              <Button
                type="button"
                onClick={handleResend}
                disabled={isVerified}
                className="text-yellow-400 hover:underline"
              >
                Resend OTP
              </Button>
            ) : (
              <span>Please wait {timer} seconds to resend OTP.</span>
            )} */}
            <Button
              type="button"
              onClick={handleResend}
              disabled={isVerified}
              className="text-yellow-400 hover:underline"
            >
              Resend OTP
            </Button>

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!isVerified}
              className="text-yellow-400 hover:underline"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
