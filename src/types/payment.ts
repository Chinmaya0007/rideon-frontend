export interface Payment {
  _id: string;
  rideId: string;
  riderId: string;
  driverId: string;
  amount: number;
  commission: number;
  driverEarnings: number;
  status: "pending" | "success" | "failed";
  provider: "stripe";
  transactionId?: string;
  createdAt: string;
}
