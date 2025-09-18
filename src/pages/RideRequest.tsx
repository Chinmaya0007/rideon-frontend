// pages/RideRequest.tsx
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { useRide, IRide } from "../context/RideContext";
import toast from "react-hot-toast";
import L from "leaflet";
import { useAuth } from "../context/AuthContext";
import MapView from "../components/booking/MapView";

// Fix Leaflet marker issue
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const truncate = (str: string, len = 30) =>
  str.length > len ? str.slice(0, len) + "..." : str;

const RideRequest: React.FC = () => {
  const { user } = useAuth();
  const { fetchDriverRides, fetchPendingRides, updateRideStatus } = useRide();
  const [currentRide, setCurrentRide] = useState<IRide | null>(null);
  const [pendingRides, setPendingRides] = useState<IRide[]>([]);

  useEffect(() => {
    if (!user?._id) return;

    const loadRides = async () => {
      try {
        const driverRides: IRide[] = await fetchDriverRides(user._id);
        const accepted = driverRides.find(
          (r) => r.status === "accepted" && r.driverId === user._id
        );
        setCurrentRide(accepted || null);

        const pending: IRide[] = await fetchPendingRides();
        setPendingRides(pending);
      } catch (err) {
        console.error(err);
      }
    };

    loadRides();
  }, [user]);

  const handleAccept = async (ride: IRide) => {
    try {
      await updateRideStatus(ride._id, "accepted", user?._id);
      toast.success("Ride accepted ✅");

      const driverRides: IRide[] = await fetchDriverRides(user!._id);
      const accepted = driverRides.find(
        (r) => r.status === "accepted" && r.driverId === user!._id
      );
      setCurrentRide(accepted || null);

      const pending: IRide[] = await fetchPendingRides();
      setPendingRides(pending);
    } catch (err: any) {
      toast.error(err.message || "Failed to accept ride");
    }
  };

  const handleDecline = async (ride: IRide) => {
    try {
      await updateRideStatus(ride._id, "canceled", user?._id);
      toast.success("Ride declined ❌");

      const pending = await fetchPendingRides();
      setPendingRides(pending);
    } catch (err: any) {
      toast.error(err.message || "Failed to decline ride");
    }
  };

  if (!currentRide && pendingRides.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-lg">
        No ride requests available 🚗
      </div>
    );
  }

  // Combine rides for map safely
  const allRides = [...pendingRides, currentRide].filter((r): r is IRide => !!r);

  return (
    <div className="flex flex-col lg:flex-row bg-[#101923] min-h-screen">
      {/* Map on top (mobile) / Right (desktop) */}
      <div className="w-full lg:flex-1 h-[300px] lg:h-auto">
        <MapView
          position={
            currentRide
              ? [currentRide.pickupLocation.lat, currentRide.pickupLocation.lng]
              : [pendingRides[0]?.pickupLocation.lat || 0, pendingRides[0]?.pickupLocation.lng || 0]
          }
          zoom={13}
          pickup={currentRide?.pickupLocation || pendingRides[0]?.pickupLocation}
          drop={currentRide?.dropLocation || pendingRides[0]?.dropLocation}
          routeCoords={
            allRides
              .map((ride) => [
                [ride.pickupLocation.lat, ride.pickupLocation.lng],
                [ride.dropLocation.lat, ride.dropLocation.lng],
              ])
              .flat() as [number, number][]
          }
        />
      </div>

      {/* Ride List - Bottom (mobile) / Left (desktop) */}
      <div className="w-full lg:w-1/3 p-6 flex flex-col gap-6 overflow-y-auto">
        <h2 className="text-white text-2xl font-bold text-center border-b border-[#223449] pb-3">
          Ride Requests
        </h2>

        {/* Accepted Ride */}
        {currentRide && (
          <div className="bg-[#192431] p-4 rounded-xl shadow-md border border-[#2a3b4d] flex flex-col gap-3 hover:scale-[1.02] transition-transform">
            <h3 className="text-lg text-white font-bold border-b border-[#223449] pb-1">
              Accepted Ride
            </h3>
            <p>
              <strong>Pickup:</strong> {truncate(currentRide.pickupLocation.address)}
            </p>
            <p>
              <strong>Dropoff:</strong> {truncate(currentRide.dropLocation.address)}
            </p>
            <p>
              <strong>Fare:</strong> ${currentRide.fare.toFixed(2)}
            </p>
            <button
              onClick={() => handleDecline(currentRide)}
              className="mt-2 bg-red-500 hover:bg-red-600 py-2 rounded-lg font-bold text-white"
            >
              Cancel Ride
            </button>
          </div>
        )}

        {/* Pending Rides */}
        {pendingRides.length > 0 && (
          <div className="bg-[#192431] p-4 rounded-xl shadow-md border border-[#2a3b4d] flex flex-col gap-4">
            <h3 className="text-lg text-white font-bold border-b border-[#223449] pb-1">
              Pending Rides
            </h3>
            {pendingRides.map((ride) => (
              <div
                key={ride._id}
                className="bg-[#223449] p-3 rounded-lg flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <p>
                  <strong>Pickup:</strong> {truncate(ride.pickupLocation.address)}
                </p>
                <p>
                  <strong>Dropoff:</strong> {truncate(ride.dropLocation.address)}
                </p>
                <p>
                  <strong>Fare:</strong> ${ride.fare.toFixed(2)}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleDecline(ride)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded-lg font-bold text-sm"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => handleAccept(ride)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded-lg font-bold text-sm"
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RideRequest;
