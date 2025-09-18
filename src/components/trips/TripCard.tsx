import React from "react";
import { Car, Calendar, Clock, MapPin, DollarSign } from "lucide-react";

interface TripCardProps {
  date: string;
  time: string;
  route: string;
  price: string;
}

const TripCard: React.FC<TripCardProps> = ({ date, time, route, price }) => {
  return (
    <div className="flex justify-between items-start bg-[#1b2a3d] rounded-xl p-4">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="bg-[#223449] rounded-lg flex items-center justify-center h-12 w-12">
          <Car className="w-6 h-6 text-[#0d78f2]" />
        </div>

        {/* Trip Info */}
        <div className="space-y-1">
          <p className="flex items-center gap-2 font-medium">
            <Calendar className="w-4 h-4 text-[#90abcb]" /> {date}
          </p>
          <p className="flex items-center gap-2 text-[#90abcb] text-sm">
            <Clock className="w-4 h-4" /> {time}
          </p>
          <p className="flex items-center gap-2 text-[#90abcb] text-sm">
            <MapPin className="w-4 h-4" /> {route}
          </p>
        </div>
      </div>

      {/* Price */}
      <p className="flex items-center gap-1 font-medium">
        <DollarSign className="w-4 h-4 text-green-400" />
        {price}
      </p>
    </div>
  );
};

export default TripCard;
