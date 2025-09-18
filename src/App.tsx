import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext"; // ✅ import context

import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import BookingRide from "./pages/BookingRide";
import TripsHistory from "./pages/History";
import Profile from "./pages/Profile";
import HelpForm from "./pages/HelpForm";
import RideRequest from "./pages/RideRequest"; // ✅ new driver page
import ProtectedRoute from "./components/ProtectedRoutes";

const App: React.FC = () => {
  const { user, token } = useAuth(); // ✅ check auth state

  // ✅ Role-based default redirect
  const getDefaultPath = () => {
    if (!user || !token) return "/login";
    return user.role === "driver" ? "/requests" : "/booking";
  };

  return (
    <div className="min-h-screen bg-[#0b0f17]">
      <Navbar />
      <div className="pt-[70px] px-[20px]">
        <Routes>
          {/* Public routes with redirect if logged in */}
          <Route
            path="/login"
            element={
              user && token ? <Navigate to={getDefaultPath()} replace /> : <Login />
            }
          />
          <Route
            path="/signup"
            element={
              user && token ? <Navigate to={getDefaultPath()} replace /> : <SignUp />
            }
          />

          {/* User routes */}
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <BookingRide />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Common routes (both users & drivers) */}
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <TripsHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <HelpForm />
              </ProtectedRoute>
            }
          />

          {/* Driver-only route */}
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <RideRequest />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to={getDefaultPath()} replace />} />
        </Routes>
      </div>

      {/* Toast container */}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
