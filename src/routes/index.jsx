import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminRoot from "../pages/admin/AdminRoot";
import Login from "../pages/auth/login/Login";
import MainLayout from "../components/layout/MainLayout";
import WatchHistory from "../pages/admin/watchHistory/WatchHistory";
import StaffUser from "../pages/admin/staff/StaffUser";
import ReadActivity from "../pages/admin/home/ReadActivity";
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
        />

        <Route path="/" element={<MainLayout />}>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoot />}>
            <Route
              path="watch_details/watch_history"
              element={<WatchHistory />}
            />

            <Route path="staff/staff_user" element={<StaffUser />} />
            <Route path="home/readActivity" element={<ReadActivity />} />
            {/* <Route path="edit" element={<EditUser />} />  */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoute;
