import React, { useEffect, useState } from "react";
import TripsTabs from "../components/trips/TripsTabs";
import TripsList from "../components/trips/TripsList";
import { useRide } from "../context/RideContext";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const TripsHistory: React.FC = () => {
  const { rides, fetchUserRides, fetchDriverRides, loading } = useRide();
  const [activeTab, setActiveTab] = useState<"Past" | "Upcoming" | "Canceled">(
    "Past"
  );

  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const role = useSelector((state: RootState) => state.auth.user?.role);

  // ✅ Fetch rides on mount
  useEffect(() => {
    if (!userId) return;
    if (role === "driver") {
      fetchDriverRides(userId);
    } else {
      fetchUserRides(userId);
    }
  }, [userId, role, fetchUserRides, fetchDriverRides]);

  // ✅ Filter rides by tab
  const filteredRides = rides.filter((ride) => {
    if (activeTab === "Past") {
      return ride.status === "completed";
    }
    if (activeTab === "Upcoming") {
      return (
        ride.status === "pending" ||
        ride.status === "accepted" ||
        ride.status === "ongoing"
      );
    }
    if (activeTab === "Canceled") {
      return ride.status === "canceled";
    }
    return false;
  });

  // 🔍 Debug logs

  return (
    <div className="flex justify-center items-start min-h-screen bg-[#101923] text-white px-4 md:px-6">
      <div className="w-full max-w-3xl pt-[100px] pb-10">
        <div className="mb-6 text-center">
          <h1 className="text-[28px] md:text-[32px] font-bold">Trips</h1>
          <p className="text-[#90abcb] text-sm">
            Past, upcoming, and canceled trips
          </p>
        </div>

        <TripsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {loading ? (
          <p className="text-center text-gray-400 mt-6">Loading rides...</p>
        ) : (
          <TripsList trips={filteredRides} activeTab={activeTab} />
        )}
      </div>
    </div>
  );
};

export default TripsHistory;
