import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminRoot from "../pages/admin/AdminRoot";
import Login from "../pages/auth/login/Login";
import MainLayout from "../components/layout/MainLayout";
import WatchHistory from "../pages/admin/watchHistory/WatchHistory";
import StaffUser from "../pages/admin/staff/StaffUser";
import ReadActivity from "../pages/admin/home/ReadActivity";
import WatchStatus from "../pages/admin/watchDetail/WatchStatus";
import Settings from "../pages/admin/generalSetting/Setting";
import Estimators from "../pages/admin/estimators/Estimators";
import AdminRevanueAnalysis from "../pages/admin/revenue_analysis/revenue_analysis_admin/AdminRevanueAnalysis";
import EstimatorRevanueAnalysis from "../pages/admin/revenue_analysis/revenue_analysis_estimator/EstimatorRevanueAnalysis";
import AdminPerformanceAnalysis from "../pages/admin/performance_analysis/performance_analysis_admin/AdminPerformanceAnalysis";
import EstimatorPerformanceAnalysis from "../pages/admin/performance_analysis/performance_analysis_estimator/EstimatorPerformanceAnalysis";
import SellerEdit from "../pages/admin/seller/SellerEdit";
import BrandList from "../pages/admin/brandList/BrandList";
import Language from "../pages/admin/language/Language";
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
            <Route
              path="watch_details/watch_status"
              element={<WatchStatus />}
            />
            <Route path="panel/settings" element={<Settings />} />
            <Route path="home/readActivity" element={<ReadActivity />} />
            <Route path="estimator/estimator_user" element={<Estimators />} />
            <Route
              path="analysis/revenue_analysis/admin"
              element={<AdminRevanueAnalysis />}
            />
            <Route
              path="analysis/revenue_analysis/estimator"
              element={<EstimatorRevanueAnalysis />}
            />
            <Route
              path="analysis/performance_analysis/admin"
              element={<AdminPerformanceAnalysis />}
            />
            <Route
              path="analysis/performance_analysis/estimator"
              element={<EstimatorPerformanceAnalysis />}
            />
            <Route path="seller/seller_edit" element={<SellerEdit />} />
            <Route
              path="analysis/revenue_analysis/admin"
              element={<AdminRevanueAnalysis />}
            />
            <Route
              path="analysis/revenue_analysis/estimator"
              element={<EstimatorRevanueAnalysis />}
            />
            <Route
              path="analysis/performance_analysis/admin"
              element={<AdminPerformanceAnalysis />}
            />
            <Route
              path="analysis/performance_analysis/estimator"
              element={<EstimatorPerformanceAnalysis />}
            />
            <Route path="watch_details/brand_list" element={<BrandList />} />
            <Route path="language" element={<Language />} />

            {/* <Route path="edit" element={<EditUser />} />  */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoute;
