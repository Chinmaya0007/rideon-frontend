import React from "react";
import { ChevronDown } from "lucide-react";

const AboutSection: React.FC = () => (
  <div className="w-full max-w-lg mt-6 sm:mt-8">
    <h2 className="text-[18px] sm:text-[20px] font-bold mb-4 flex items-center justify-between">
      About <ChevronDown size={20} />
    </h2>
    <div className="bg-[#182534] rounded-lg p-4">
      <p className="text-xs sm:text-sm text-[#90abcb]">
        This is a demo profile settings page with interactive components.
      </p>
    </div>
  </div>
);

export default AboutSection;
