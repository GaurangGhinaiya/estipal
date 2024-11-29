import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../pages/auth/login/Login";
import Admin from "../pages/admin/Admin";
// import ProtectedRoute from "./protectedRoute";

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            // <ProtectedRoute>
            <Login />
            // </ProtectedRoute>
          }
        />{" "}
        <Route path="/admin" element={<Admin />} />
        {/* <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoute;
