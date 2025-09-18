// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
  role?: string; // optional if you want role-based protection later
}

const ProtectedRoute: React.FC<Props> = ({ children, role }) => {
  const { user, token } = useAuth();

  if (!user || !token) {
    // 🚫 Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // 🚫 Role-based restriction (optional)
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
