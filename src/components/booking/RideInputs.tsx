import React from "react";
import { MapPin, Flag, Car, Clock, Loader2 } from "lucide-react";

type Props = {
  pickup: { name: string } | null;
  drop: { name: string } | null;
  distance: number | null;
  duration: number | null;
  activeLocation: "pickup" | "drop" | null;
  setActiveLocation: (loc: "pickup" | "drop") => void;
  onSearchRides: () => void;
  rideStatus: string;
  loading: boolean;
};

const truncate = (str: string) => (str.length > 30 ? str.slice(0, 30) + "..." : str);

const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = Math.ceil(minutes % 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

const RideInputs: React.FC<Props> = ({
  pickup,
  drop,
  distance,
  duration,
  activeLocation,
  setActiveLocation,
  onSearchRides,
  rideStatus,
  loading,
}) => (
  <>
    <div
      className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
        activeLocation === "pickup" ? "bg-blue-500" : "bg-[#223449]"
      }`}
      onClick={() => setActiveLocation("pickup")}
    >
      <MapPin className="w-5 h-5 text-white" />
      <span>{pickup ? truncate(pickup.name) : "Set Pickup"}</span>
    </div>
    <div
      className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
        activeLocation === "drop" ? "bg-red-500" : "bg-[#223449]"
      }`}
      onClick={() => setActiveLocation("drop")}
    >
      <Flag className="w-5 h-5 text-white" />
      <span>{drop ? truncate(drop.name) : "Set Drop"}</span>
    </div>

    {distance && duration && (
      <div className="flex items-center gap-4 text-sm text-gray-300 mt-1">
        <div className="flex items-center gap-1">
          <Car className="w-4 h-4" />
          <span>{distance.toFixed(1)} km</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{formatDuration(duration)}</span>
        </div>
      </div>
    )}

    <button
      onClick={onSearchRides}
      disabled={loading || rideStatus === "searching"}
      className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold mt-2 flex items-center justify-center gap-2"
    >
      {rideStatus === "searching" || loading ? (
        <>
          <Loader2 className="animate-spin w-5 h-5" />
          <span>Searching for rides...</span>
        </>
      ) : (
        "Search Rides"
      )}
    </button>
  </>
);

export default RideInputs;
