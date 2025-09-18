import React, { useState } from "react";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import toast from "react-hot-toast";
import { Loader2, User, Phone, Calendar, Car, IdCard } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface Props {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  otpVerified: boolean;
  onBack: () => void;
}

const StepDetails: React.FC<Props> = ({ form, setForm, otpVerified, onBack }) => {
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleRole = () => {
    setForm((prev: any) => ({
      ...prev,
      role: prev.role === "user" ? "driver" : "user",
      vehicleNo: prev.role === "driver" ? "" : prev.vehicleNo,
      licenseNo: prev.role === "driver" ? "" : prev.licenseNo,
    }));
  };

  const handleSignUp = async () => {
    if (!otpVerified) {
      toast.error("Please verify OTP before signing up");
      return;
    }
    if (!form.email || !form.password || !form.name || !form.phone) {
      toast.error("Please fill all required fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await signUp(form); // ✅ capture response
      toast.success(res?.message || "Account created successfully 🎉");
      // 👉 here you could redirect or reset form if needed
    } catch (error: any) {
      // ✅ show backend error if available
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "Failed to create account");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Name */}
      <InputField
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        icon={<User size={20} />}
      />

      {/* Phone */}
      <div className="flex flex-col w-full px-[10px] py-[8px] relative">
        <div className="flex items-center rounded-lg bg-[#223449] h-[56px]">
          <span className="flex items-center justify-center px-[12px] text-[#90abcb] font-medium border-r border-gray-600">
            +91
          </span>
          <span className="flex items-center justify-center px-[12px] text-[#90abcb]">
            <Phone size={20} />
          </span>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="flex-1 bg-transparent text-white text-[16px] font-normal placeholder:text-[#90abcb] h-full focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* Birthday */}
      <InputField
        name="birthday"
        type="date"
        placeholder="Birthday"
        value={form.birthday}
        onChange={handleChange}
        icon={<Calendar size={20} />}
      />

      {/* Role Toggle */}
      <div className="flex items-center justify-between w-full px-[10px] py-[8px]">
        <span className="text-white font-medium">Driver</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={form.role === "driver"}
            onChange={toggleRole}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 rounded-full peer-checked:bg-blue-500"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
        </label>
      </div>

      {form.role === "driver" && (
        <>
          <InputField
            name="vehicleNo"
            placeholder="Vehicle Number"
            value={form.vehicleNo}
            onChange={handleChange}
            icon={<Car size={20} />}
          />
          <InputField
            name="licenseNo"
            placeholder="License Number"
            value={form.licenseNo}
            onChange={handleChange}
            icon={<IdCard size={20} />}
          />
        </>
      )}

      {/* Passwords */}
      <PasswordField
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <PasswordField
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
      />

      {/* Buttons */}
      <div className="flex gap-2 w-full px-[10px] py-[12px]">
        <button
          onClick={onBack}
          className="flex w-full cursor-pointer items-center justify-center rounded-lg h-[48px] bg-gray-600 text-white font-bold"
        >
          Back
        </button>
        <button
          onClick={handleSignUp}
          disabled={loading}
          className="flex w-full cursor-pointer items-center justify-center rounded-lg h-[48px] bg-[#0d78f2] text-white font-bold disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
    </>
  );
};

export default StepDetails;
