import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import AdminRoot from "./AdminRoot";
import AdminPerformanceAnalysis from "../pages/admin/analysis/performance_analysis/performance_analysis_admin/AdminPerformanceAnalysis";
import EstimatorPerformanceAnalysis from "../pages/admin/analysis/performance_analysis/performance_analysis_estimator/EstimatorPerformanceAnalysis";
import SellerPerformanceAnalysis from "../pages/admin/analysis/performance_analysis/performance_analysis_seller/SellerPerformanceAnalysis";
import AdminRevanueAnalysis from "../pages/admin/analysis/revenue_analysis/revenue_analysis_admin/AdminRevanueAnalysis";
import EstimatorRevanueAnalysis from "../pages/admin/analysis/revenue_analysis/revenue_analysis_estimator/EstimatorRevanueAnalysis";
import SellerRevenueAnalysis from "../pages/admin/analysis/revenue_analysis/revenue_analysis_seller/SellerRevenueAnalysis";
import BrandList from "../pages/admin/brandList/BrandList";
import EstimatorEstimateStaff from "../pages/admin/estimator_assignment/EstimatorEstimateStaff";
import EstimatorEdit from "../pages/admin/estimators/EstimatorEdit";
import Estimators from "../pages/admin/estimators/Estimators";
import Settings from "../pages/admin/generalSetting/Setting";
import ReadActivity from "../pages/admin/home/ReadActivity";
import Language from "../pages/admin/language/Language";
import SellerEdit from "../pages/admin/seller/SellerEdit";
import SellerUserCreate from "../pages/admin/seller/SellerUserCreate";
import StaffUser from "../pages/admin/staff/StaffUser";
import WatchStatus from "../pages/admin/watchDetail/WatchStatus";
import WatchHistory from "../pages/admin/watchHistory/WatchHistory";
import UpdatePassword from "../pages/adminForgotPassword/UpdatePassword";
import ForgotPassword from "../pages/auth/login/ForgotPassword";
import Login from "../pages/auth/login/Login";
import Privacy from "../pages/Privacy";
import SellerVerification from "../pages/seller/SellerVerification";
import AccountProfile from "../pages/staff/account_profile/AccountProfile";
import ManageStaff from "../pages/staff/manage_staff/ManageStaff";
import SellerPerformanceAnalysisStaff from "../pages/staff/performance_analysis/performance_analysis_seller/SellerPerformanceAnalysis";
import SellerRevenueAnalysisStaff from "../pages/staff/revenue_analysis/revenue_analysis_seller/SellerRevenueAnalysis";
import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./PublicRoute";

const AppRoute = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/login/forgot_password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/seller/verification/:code/:type"
          element={<SellerVerification />}
        />

        <Route
          path="/admin_forgot_password/update_password/:token/:id/:email/:type"
          element={<UpdatePassword />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin" replace />} />

          <Route path="/privacy" element={<Privacy />} />

          {/* Admin Routes */}
          <Route
            path="/estimator_assignment/estimator_estimate_staff/:est_id/:watch_unique_id/:estimated_price_admin/:est_pass_flag"
            element={<EstimatorEstimateStaff />}
          />
          <Route path="/admin" element={<AdminRoot />}>
            <Route
              path="watch_details/watch_history"
              element={<WatchHistory />}
            />
            <Route
              path="staff/staff_user"
              element={userRole === "staff" ? <ManageStaff /> : <StaffUser />}
            />
            <Route
              path="home/readActivity/:id/:watch_id"
              element={<ReadActivity />}
            />
            <Route
              path="home/readActivity/:watch_id"
              element={<ReadActivity />}
            />

            <Route
              path="watch_details/watch_status/:id"
              element={<WatchStatus />}
            />
            <Route path="panel/settings" element={<Settings />} />
            <Route path="home/readActivity" element={<ReadActivity />} />
            <Route path="estimator/estimator_user" element={<Estimators />} />
            <Route
              path="estimator/estimator_edit/:id"
              element={<EstimatorEdit />}
            />
            <Route
              path="estimator/estimator_user_create"
              element={<EstimatorEdit />}
            />
            <Route
              path="analysis/revenue_analysis/admin"
              element={<AdminRevanueAnalysis />}
            />
            <Route
              path="analysis/revenue_analysis/seller/:seller_id"
              element={<SellerRevenueAnalysis />}
            />
            <Route
              path="analysis/revenue_analysis/seller"
              element={<SellerRevenueAnalysisStaff />}
            />
            <Route
              path="analysis/performance_analysis/seller"
              element={<SellerPerformanceAnalysisStaff />}
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
              path="analysis/performance_analysis/seller/:seller_id"
              element={<SellerPerformanceAnalysis />}
            />
            <Route
              path="analysis/performance_analysis/estimator"
              element={<EstimatorPerformanceAnalysis />}
            />
            <Route path="seller/seller_edit/:id" element={<SellerEdit />} />
            <Route
              path="seller/seller_user_create"
              element={<SellerUserCreate />}
            />
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
            <Route path="panel/account" element={<AccountProfile />} />
            <Route path="language" element={<Language />} />
          </Route>
        </Route>

        {/* <Route
          path="*"
          element={
            token ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        /> */}

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
