// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// This function will only allow logged in users to access routes
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
