import React from "react";
import { Car, User, Phone } from "lucide-react";

type Driver = {
  name?: string;
  phone?: string;
  vehicleNo?: string;
  licenseNo?: string;
};

interface Props {
  driver: Driver;
}

const DriverInfo: React.FC<Props> = ({ driver }) => {
  if (!driver) return null; // nothing to show

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 bg-[#223449] p-3 rounded-lg">
      {/* Profile icon */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-700 flex items-center justify-center">
        <User className="w-6 h-6 text-gray-300" />
      </div>

      <div className="flex-1 text-center sm:text-left">
        {/* Name */}
        {driver.name && (
          <h2 className="text-sm md:text-base font-semibold">{driver.name}</h2>
        )}

        {/* Phone */}
        {driver.phone && (
          <p className="text-xs md:text-sm text-gray-300 flex items-center justify-center sm:justify-start gap-2 mt-1">
            <Phone className="w-4 h-4 text-gray-400" /> {driver.phone}
          </p>
        )}

        {/* Vehicle + License */}
        {(driver.vehicleNo || driver.licenseNo) && (
          <p className="text-xs md:text-sm text-gray-300 flex items-center justify-center sm:justify-start gap-2 mt-1">
            <Car className="w-4 h-4 text-gray-400" />{" "}
            {driver.vehicleNo} {driver.vehicleNo && driver.licenseNo ? "•" : ""}{" "}
            {driver.licenseNo}
          </p>
        )}
      </div>
    </div>
  );
};

export default DriverInfo;
