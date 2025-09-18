import React, { useEffect, useState } from "react";
import { IRide, useRide } from "../../context/RideContext";
import RideStatusBadge from "./RideStatusBadge";
import RideDetails from "./RideDetails";
import DriverInfo from "./DriverInfo";
import RideActions from "./RideActions";
import { useAuth } from "../../context/AuthContext";

type Props = {
  ride: IRide;
  onCancel: () => void;
  onPayNow?: () => void;
};

const ActiveRideCard: React.FC<Props> = ({ ride, onCancel }) => {
  const { updateRideStatus } = useRide(); // ✅ get update function
  const { getDriverDetails } = useAuth(); // ✅ get driver function
  const [driver, setDriver] = useState<any>(null);

  useEffect(() => {
    if (ride.driverId) {
      getDriverDetails(ride.driverId)
        .then(setDriver)
        .catch(console.error);
    }
  }, [ride.driverId, getDriverDetails]);

  const handlePayNow = () => {
    updateRideStatus(ride._id, "completed").catch(console.error);
  };

  const handleEndRide = () => {
    updateRideStatus(ride._id, "completed").catch(console.error);
  };

  return (
    <div className="bg-[#223449] p-4 rounded-lg shadow-lg border border-[#2f4a63] space-y-3">
      <RideStatusBadge status={ride.status} requestedAt={ride.requestedAt} />
      <RideDetails ride={ride} onPayNow={handlePayNow} onEndRide={handleEndRide} />
      {driver && <DriverInfo driver={{
        name: driver.name,
        vehicleNo: driver.vehicleNo,
        licenseNo: driver.licenseNo,
      }} />}
      <RideActions ride={ride} onCancel={onCancel} onPayNow={handlePayNow} />
    </div>
  );
};

export default ActiveRideCard;
