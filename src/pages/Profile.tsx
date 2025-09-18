// ProfilePage.tsx
import React, { useState } from "react";
import PersonalDetails from "../components/profile/PersonalDetails";
import PaymentMethods from "../components/profile/PaymentMethods";
import PrivacySettings from "../components/profile/PrivacySettings";
import AboutSection from "../components/profile/AboutSection";
import UpdateModal from "../components/profile/UpdateModal";
import ChangePasswordModal from "../components/profile/ChangePasswordModal";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const ProfilePage: React.FC = () => {
  const { user, updateUser, sendOtp } = useAuth();
  const [privacy, setPrivacy] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Local editable state
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const handleUpdate = async () => {
    if (!user?._id) {
      console.log("No user id, skipping update");
      return;
    }
    try {
      const res = await updateUser({ name, email, phone });
      toast.success(res.message || "Profile updated successfully!");
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // Handle forgot password
  const handleForgotPassword = async () => {
    if (!email) return toast.error("Please provide your email first.");
    try {
      const res = await sendOtp(email); // <- API call
      toast.success(res.message || "OTP sent to your email for password reset.");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="min-h-screen bg-[#101923] text-white flex flex-col items-center px-4 py-6 sm:py-10">
      <h1 className="text-[22px] sm:text-[28px] font-bold mb-6 sm:mb-8">
        Profile Settings
      </h1>

      {/* Personal Details */}
      <PersonalDetails
        name={name}
        email={email}
        phone={phone}
        privacy={privacy}
        onEdit={() => setIsModalOpen(true)}
      />

      {/* Payment Methods */}
      <PaymentMethods
        privacy={privacy}
      />

      {/* Privacy Settings */}
      <PrivacySettings privacy={privacy} setPrivacy={setPrivacy} />

      {/* About Section */}
      <AboutSection />

      {/* Security Section */}
      <div className="w-full max-w-lg bg-[#182534] p-5 rounded-lg mt-6 space-y-3">
        <h2 className="text-lg font-bold mb-3">Security</h2>

        {/* Forgot Password */}
        <button
          onClick={handleForgotPassword}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Forgot Password
        </button>

        {/* Change Password */}
        <button
          onClick={() => setIsChangePasswordOpen(true)}
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
        >
          Change Password
        </button>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <UpdateModal
          name={name}
          email={email}
          phone={phone}
          setName={setName}
          setEmail={setEmail}
          setPhone={setPhone}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdate}
        />
      )}

      {/* Change Password Modal */}
      {isChangePasswordOpen && (
        <ChangePasswordModal onClose={() => setIsChangePasswordOpen(false)} />
      )}
    </div>
  );
};

export default ProfilePage;
