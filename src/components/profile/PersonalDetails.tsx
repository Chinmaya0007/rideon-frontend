import React from "react";
import { User, Mail, Phone } from "lucide-react";

interface Props {
  name: string;
  email: string;
  phone: string;
  privacy: boolean;
  onEdit: () => void;
}

const maskValue = (value: string, privacy: boolean) =>
  privacy ? value : "********";

const PersonalDetails: React.FC<Props> = ({ name, email, phone, privacy, onEdit }) => {
  return (
    <div className="w-full max-w-lg">
      <h2 className="text-[18px] sm:text-[20px] font-bold mb-4">Personal Details</h2>

      <div className="bg-[#182534] rounded-lg p-4 mb-3">
        <p className="text-xs sm:text-sm text-[#90abcb] flex items-center gap-2">
          <User size={16} /> Name
        </p>
        <p className="text-base sm:text-lg font-semibold">{maskValue(name, privacy)}</p>
      </div>

      <div className="bg-[#182534] rounded-lg p-4 mb-3">
        <p className="text-xs sm:text-sm text-[#90abcb] flex items-center gap-2">
          <Mail size={16} /> Email
        </p>
        <p className="text-base sm:text-lg font-semibold">{maskValue(email, privacy)}</p>
      </div>

      <div className="bg-[#182534] rounded-lg p-4 mb-3">
        <p className="text-xs sm:text-sm text-[#90abcb] flex items-center gap-2">
          <Phone size={16} /> Phone Number
        </p>
        <p className="text-base sm:text-lg font-semibold">{maskValue(phone, privacy)}</p>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={onEdit}
          className="bg-[#223449] rounded-lg px-4 py-2 text-sm sm:text-base font-bold hover:bg-[#2e4a6b]"
        >
          Update Details
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
