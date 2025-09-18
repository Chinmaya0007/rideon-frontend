// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  setLoading,
  setUser,
  setToken,
  setError,
  logout,
} from "../redux/slices/authSlice";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE as string;

interface AuthContextType {
  user: any;
  token: string | null;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (data: any) => Promise<any>;
  sendOtp: (email: string) => Promise<any>;
  verifyOtp: (email: string, otp: string) => Promise<any>;
  updateUser: (updates: Partial<any>) => Promise<any>;
  getDriverDetails: (driverId: string) => Promise<any>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);

  // --- Memoized axios instance (like RideContext) ---
  const api = useMemo(
    () =>
      axios.create({
        baseURL: API_BASE,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }),
    [token]
  );

  // --- Rehydrate from localStorage ---
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      dispatch(setUser(JSON.parse(savedUser)));
      dispatch(setToken(savedToken));
    }
  }, [dispatch]);

  // --- Sign In ---
  const signIn = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));
      const res = await api.post(`/auth/signin`, { email, password });

      dispatch(setUser(res.data.user));
      dispatch(setToken(res.data.token));
      dispatch(setError(null));

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      return res.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Login failed";
      dispatch(setError(msg));
      throw new Error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // --- Sign Up ---
  const signUp = async (data: any) => {
    try {
      dispatch(setLoading(true));
      const res = await api.post(`/auth/signup`, data);

      dispatch(setUser(res.data.user));
      dispatch(setToken(res.data.token));
      dispatch(setError(null));

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      return res.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Signup failed";
      dispatch(setError(msg));
      throw new Error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // --- Send OTP ---
  const sendOtp = async (email: string) => {
    try {
      const res = await api.post(`/auth/send-otp`, { email });
      return res.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to send OTP";
      dispatch(setError(msg));
      throw new Error(msg);
    }
  };

  // --- Verify OTP ---
  const verifyOtp = async (email: string, otp: string) => {
    try {
      const res = await api.post(`/auth/verify-otp`, { email, otp });
      return res.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || "OTP verification failed";
      dispatch(setError(msg));
      throw new Error(msg);
    }
  };

  // --- Update User ---
  const updateUser = async (updates: Partial<any>) => {
    try {
      const userId = user?._id;
      if (!userId) throw new Error("No user logged in");

      const res = await api.put(`/auth/update`, {
        userId,
        updates,
      });

      const updatedUser = { ...user, ...res.data.user };
      dispatch(setUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return res.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Update failed";
      dispatch(setError(msg));
      throw new Error(msg);
    }
  };

  // --- Get Driver Details ---
  const getDriverDetails = async (driverId: string) => {
    try {
      if (!driverId) throw new Error("Driver ID is required");

      const res = await api.get(`/auth/users/${driverId}`);

      // ✅ Return just the driver object
      return res.data.user;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to fetch driver details";
      dispatch(setError(msg));
      throw new Error(msg);
    }
  };


  // --- Logout ---
  const logoutUser = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn,
        signUp,
        sendOtp,
        verifyOtp,
        updateUser,
        getDriverDetails,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
