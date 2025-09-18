import React from "react";
import TripCard from "./TripCard";
import { IRide } from "../../context/RideContext";

interface TripsListProps {
  trips: IRide[];
  activeTab: "Past" | "Upcoming" | "Canceled";
}

const TripsList: React.FC<TripsListProps> = ({ trips, activeTab }) => {
  // ✅ Map activeTab to ride statuses
  const filteredTrips = trips.filter((trip) => {
    if (activeTab === "Past") return trip.status === "completed";
    if (activeTab === "Upcoming")
      return (
        trip.status === "pending" ||
        trip.status === "accepted" ||
        trip.status === "ongoing"
      );
    if (activeTab === "Canceled") return trip.status === "canceled";
    return false;
  });

  return (
    <div className="space-y-4">
      {filteredTrips.length > 0 ? (
        filteredTrips.map((trip) => (
          <TripCard
            key={trip._id}
            // ✅ Map IRide fields to TripCard props
            date={new Date(trip.requestedAt).toLocaleDateString()}
            time={new Date(trip.requestedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            route={`${trip.pickupLocation?.address} → ${trip.dropLocation?.address}`}
            price={`₹${trip.fare ?? 0}`}
          />
        ))
      ) : (
        <p className="text-[#90abcb] text-center">
          No {activeTab.toLowerCase()} trips.
        </p>
      )}
    </div>
  );
};

export default TripsList;
