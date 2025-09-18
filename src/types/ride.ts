export interface Ride {
  _id: string;
  userId: string;
  driverId?: string;
  pickupLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  dropLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  fare: number;
  vehicleType: string;
  notes?: string;

  // Ride status
  status: "pending" | "accepted" | "ongoing" | "completed" | "canceled";

  // Payment
  paymentStatus: "pending" | "paid" | "failed";

  // Timestamps
  requestedAt: string;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
  canceledAt?: string;
}
