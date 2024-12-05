// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  // If token exists, redirect away from the /login page to /category
  if (token) {
    return <Navigate to="/admin" replace />;
  }
  // Otherwise, render the children (e.g., the Login component)
  return children;
};

export default PublicRoute;
