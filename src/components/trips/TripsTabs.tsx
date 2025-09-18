import React from "react";
import { Car } from "lucide-react";

interface TripsTabsProps {
  activeTab: "Past" | "Upcoming" | "Canceled";
  setActiveTab: (tab: "Past" | "Upcoming" | "Canceled") => void;
}

const TripsTabs: React.FC<TripsTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs: ("Past" | "Upcoming" | "Canceled")[] = ["Past", "Upcoming", "Canceled"];

  return (
    <div className="flex justify-center gap-6 border-b border-[#314b68] mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-3 text-sm font-bold tracking-wide flex items-center gap-1 ${
            activeTab === tab
              ? "text-white border-b-2 border-[#0d78f2]"
              : "text-[#90abcb] border-b-2 border-transparent"
          }`}
        >
          <Car className="w-4 h-4" /> {tab}
        </button>
      ))}
    </div>
  );
};

export default TripsTabs;
