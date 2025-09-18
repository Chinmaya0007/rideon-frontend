import React, { useState } from "react";
import OtpInput from "./OtpInput";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface Props {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  otpRefs: React.RefObject<HTMLInputElement | null>[];
  onBack: () => void;
  onVerify: () => void;
  email: string;
}

const StepOtp: React.FC<Props> = ({ otp, setOtp, otpRefs, onBack, onVerify, email }) => {
  const [loading, setLoading] = useState(false);
  const { verifyOtp } = useAuth();

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otpRefs.length - 1) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    if (otp.join("").length !== otpRefs.length) {
      toast.error("Please enter the complete OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp(email, otp.join(""));
      toast.success(res?.message || "OTP verified successfully 🎉");
      onVerify(); // ✅ only called when API succeeds
    } catch (error: any) {
      toast.error(error.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-[10px] px-[10px] py-[8px]">
        {otp.map((digit, i) => (
          <OtpInput
            key={i}
            ref={otpRefs[i]}
            value={digit}
            onChange={(val) => handleOtpChange(i, val)}
            onBackspace={() => otpRefs[i - 1]?.current?.focus()}
          />
        ))}
      </div>

      <div className="flex gap-2 w-full px-[10px] py-[8px]">
        <button
          onClick={onBack}
          className="flex w-full h-[48px] rounded-lg bg-gray-600 text-white font-bold items-center justify-center"
        >
          Back
        </button>
        <button
          onClick={handleVerify}
          disabled={loading}
          className="flex w-full h-[48px] rounded-lg bg-green-600 text-white font-bold items-center justify-center disabled:opacity-70"
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : "Verify OTP"}
        </button>
      </div>
    </>
  );
};

export default StepOtp;
