import React from "react";
import { Phone, MessageCircle, User } from "lucide-react";
import { IRide } from "../../context/RideContext";

interface RideActionsProps {
  ride: IRide;
  onCancel: () => void;
  onPayNow: () => void;
}

const RideActions: React.FC<RideActionsProps> = ({ ride, onCancel, onPayNow }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
      <p className="text-xs md:text-sm text-gray-300 flex items-center gap-2">
        <Phone className="w-4 h-4 text-[#90abcb]" /> +91 ••••••1234
      </p>

      <div className="flex gap-2">
        <button className="px-3 py-1 bg-[#223449] rounded-md md:rounded-lg flex items-center gap-1.5 hover:bg-[#2d405a] transition">
          <MessageCircle className="w-4 h-4 text-[#90abcb]" />
          <span className="text-xs md:text-sm text-gray-200">Message</span>
        </button>

        <button className="px-3 py-1 bg-[#223449] rounded-md md:rounded-lg flex items-center gap-1.5 hover:bg-[#2d405a] transition">
          <User className="w-4 h-4 text-[#90abcb]" />
          <span className="text-xs md:text-sm text-gray-200">Profile</span>
        </button>

        {/* Show Cancel / Pay buttons depending on ride state */}
        {["pending", "accepted"].includes(ride.status) && (
          <button
            onClick={onCancel}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-xs md:text-sm font-semibold"
          >
            Cancel
          </button>
        )}

        {ride.status === "ongoing" && ride.paymentStatus !== "paid" && (
          <button
            onClick={onPayNow}
            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-xs md:text-sm font-semibold"
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
};

export default RideActions;
