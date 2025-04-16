// components/AdminRoute.jsx
import { Navigate } from "react-router-dom";

// This will be used to protect the admin route
export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}


