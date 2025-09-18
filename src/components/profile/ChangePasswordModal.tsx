// components/profile/ChangePasswordModal.tsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

interface Props {
  onClose: () => void;
}

const ChangePasswordModal: React.FC<Props> = ({ onClose }) => {
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!user?._id) return alert("No user found");
    if (!oldPassword || !newPassword) return alert("Fill all fields");

    try {
      setLoading(true);
      // 🔹 Call backend API
      // Example: axios.post(`${API_BASE}/change-password`, { userId: user._id, oldPassword, newPassword })
      console.log("Change password for:", user._id, oldPassword, newPassword);

      alert("Password updated successfully");
      onClose();
    } catch (err: any) {
      alert(err.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
      <div className="bg-[#182534] p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Change Password</h2>

        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
          className="w-full bg-[#223449] px-4 py-2 rounded-lg mb-3 text-white text-sm sm:text-base"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="w-full bg-[#223449] px-4 py-2 rounded-lg mb-3 text-white text-sm sm:text-base"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleChangePassword}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-sm sm:text-base disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
