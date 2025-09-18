import React from "react";
import { Shield } from "lucide-react";

interface Props {
  privacy: boolean;
  setPrivacy: (value: boolean) => void;
}

const PrivacySettings: React.FC<Props> = ({ privacy, setPrivacy }) => (
  <div className="w-full max-w-lg mt-6 sm:mt-8">
    <h2 className="text-[18px] sm:text-[20px] font-bold mb-4 flex items-center gap-2">
      <Shield size={18} /> Privacy Settings
    </h2>
    <div className="bg-[#182534] rounded-lg p-4 flex items-center justify-between">
      <p className="text-base sm:text-lg font-semibold">Privacy Mode</p>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={privacy}
          onChange={() => setPrivacy(!privacy)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-600 rounded-full peer-checked:bg-blue-500"></div>
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
      </label>
    </div>
  </div>
);

export default PrivacySettings;
