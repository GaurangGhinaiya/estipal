// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If token exists, redirect away from the /login page to /category
  if (token) {
    return <Navigate to="/category" replace />;
  }

  // Otherwise, render the children (e.g., the Login component)
  return children;
};

export default ProtectedRoute;
