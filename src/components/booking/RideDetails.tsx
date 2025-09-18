import React from "react";
import { IRide } from "../../context/RideContext";
import { MapPin, Flag, Wallet } from "lucide-react";

const truncate = (str: string) =>
  str.length > 30 ? str.slice(0, 30) + "..." : str;

interface Props {
  ride: IRide;
  onPayNow: () => void; // pay now callback
  onEndRide: () => void; // end ride callback
}

const RideDetails: React.FC<Props> = ({ ride, onPayNow, onEndRide }) => {
  const isPayPending = ride.paymentStatus === "pending";
  const isOngoing = ride.status === "ongoing";

  return (
    <div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-white">
          <MapPin className="w-4 h-4 text-blue-400" />
          <span className="truncate">{truncate(ride.pickupLocation.address)}</span>
        </div>
        <div className="flex items-center gap-2 text-white">
          <Flag className="w-4 h-4 text-red-400" />
          <span className="truncate">{truncate(ride.dropLocation.address)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-300 mt-2">
        <div className="flex items-center gap-1">
          <Wallet className="w-4 h-4 text-green-400" />
          <span>{ride.fare ? `₹${ride.fare}` : "Fare TBD"}</span>
        </div>
        <span>
          {ride.status === "pending"
            ? "⏳ Waiting for driver..."
            : ride.status === "accepted"
            ? "🚖 Driver on the way"
            : ride.status === "ongoing"
            ? "🛣️ Trip in progress"
            : ride.status === "completed"
            ? "✅ Ride Completed"
            : "❌ Cancelled"}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-3">
        {isPayPending && (
          <button
            onClick={onPayNow}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Pay Now
          </button>
        )}
        {isOngoing && (
          <button
            onClick={onEndRide}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            End Ride
          </button>
        )}
      </div>
    </div>
  );
};

export default RideDetails;
