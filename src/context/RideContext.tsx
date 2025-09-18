// context/RideContext.tsx
import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// --- API base URL from environment ---
const API_BASE = import.meta.env.VITE_API_BASE as string;

// --- Ride Interface ---
export interface IRide {
  _id: string;
  userId: string;
  driverId?: string;
  pickupLocation: { lat: number; lng: number; address: string };
  dropLocation: { lat: number; lng: number; address: string };
  status: "pending" | "accepted" | "ongoing" | "completed" | "canceled";
  requestedAt: string;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
  canceledAt?: string;
  fare: number;
  paymentStatus: "pending" | "paid" | "failed";
  vehicleType: string;
  notes?: string;
}

// --- Context Props ---
interface RideContextProps {
  rides: IRide[];
  loading: boolean;
  createRide: (rideData: Partial<IRide>) => Promise<any>;
  fetchUserRides: (userId: string) => Promise<any>;
  fetchDriverRides: (driverId: string) => Promise<any>;
  fetchPendingRides: () => Promise<any>;
  updateRideStatus: (
    rideId: string,
    status: IRide["status"],
    driverId?: string
  ) => Promise<any>;
}

// --- Create Context ---
const RideContext = createContext<RideContextProps | undefined>(undefined);

// --- Provider Component ---
export const RideProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rides, setRides] = useState<IRide[]>([]);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state: RootState) => state.auth.token);

  // --- Axios instance with memoization ---
  const api = useMemo(
    () =>
      axios.create({
        baseURL: API_BASE,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }),
    [token]
  );

  // --- Create a new ride ---
  const createRide = useCallback(
    async (rideData: Partial<IRide>) => {
      try {
        setLoading(true);
        const res = await api.post("/rides", rideData);
        setRides((prev) => [...prev, res.data]);
        toast.success("Ride created successfully!");
        return res.data;
      } catch (err: any) {
        const msg = err.response?.data?.message || "Failed to create ride";
        toast.error(msg);
        throw new Error(msg);
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  // --- Fetch pending rides ---
  const fetchPendingRides = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/rides/pending");
      return res.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to fetch pending rides";
      toast.error(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, [api]);

  // --- Fetch rides for a user ---
  const fetchUserRides = useCallback(
    async (userId: string) => {
      try {
        setLoading(true);
        const res = await api.get(`/rides/user/${userId}`);
        setRides(res.data);
        return res.data;
      } catch (err: any) {
        const msg = err.response?.data?.message || "Failed to fetch user rides";
        toast.error(msg);
        throw new Error(msg);
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  // --- Fetch rides for a driver ---
  const fetchDriverRides = useCallback(
    async (driverId: string) => {
      try {
        setLoading(true);
        const res = await api.get(`/rides/driver/${driverId}`);
        setRides(res.data);
        return res.data;
      } catch (err: any) {
        const msg = err.response?.data?.message || "Failed to fetch driver rides";
        toast.error(msg);
        throw new Error(msg);
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  // --- Update ride status ---
  const updateRideStatus = useCallback(
    async (rideId: string, status: IRide["status"], driverId?: string) => {
      try {
        setLoading(true);
        const payload: any = { status };
        if (driverId) payload.driverId = driverId;

        const res = await api.patch(`/rides/${rideId}/status`, payload);
        setRides((prev) => prev.map((ride) => (ride._id === rideId ? res.data : ride)));
        toast.success(`Ride marked as ${status}!`);
        return res.data;
      } catch (err: any) {
        const msg = err.response?.data?.message || "Failed to update ride status";
        toast.error(msg);
        throw new Error(msg);
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  return (
    <RideContext.Provider
      value={{
        rides,
        loading,
        createRide,
        fetchUserRides,
        fetchDriverRides,
        updateRideStatus,
        fetchPendingRides,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

// --- Custom Hook ---
export const useRide = () => {
  const ctx = useContext(RideContext);
  if (!ctx) throw new Error("useRide must be used inside RideProvider");
  return ctx;
};
