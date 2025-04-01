import React from "react";
import { Route, Routes } from "react-router-dom";
import BrandList from "./brandList/BrandList";
import Estimators from "./estimators/Estimators";
import Settings from "./generalSetting/Setting";
import ReadActivity from "./home/ReadActivity";
import Language from "./language/Language";
import AdminPerformanceAnalysis from "./analysis/performance_analysis/performance_analysis_admin/AdminPerformanceAnalysis";
import EstimatorPerformanceAnalysis from "./analysis/performance_analysis/performance_analysis_estimator/EstimatorPerformanceAnalysis";
import AdminRevanueAnalysis from "./analysis/revenue_analysis/revenue_analysis_admin/AdminRevanueAnalysis";
import EstimatorRevanueAnalysis from "./analysis/revenue_analysis/revenue_analysis_estimator/EstimatorRevanueAnalysis";
import SellerEdit from "./seller/SellerEdit";
import SellerUserCreate from "./seller/SellerUserCreate";
import StaffUser from "./staff/StaffUser";
import WatchStatus from "./watchDetail/WatchStatus";
import WatchHistory from "./watchHistory/WatchHistory";
// import SellerPerformanceAnalysis from "../staff/performance_analysis/performance_analysis_seller/SellerPerformanceAnalysis";
import AccountProfile from "../staff/account_profile/AccountProfile";
import ManageStaff from "../staff/manage_staff/ManageStaff";
import SellerRevenueAnalysisStaff from "../staff/revenue_analysis/revenue_analysis_seller/SellerRevenueAnalysis";
import SellerPerformanceAnalysisStaff from "../staff/performance_analysis/performance_analysis_seller/SellerPerformanceAnalysis";
import ActivitiesTable from "./activities/ActivitiesTable";
import EstimatorEdit from "./estimators/EstimatorEdit";
import SellerPerformanceAnalysis from "./analysis/performance_analysis/performance_analysis_seller/SellerPerformanceAnalysis";
import SellerRevenueAnalysis from "./analysis/revenue_analysis/revenue_analysis_seller/SellerRevenueAnalysis";

const AdminRoot = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <div>
      <Routes>
        <Route path="/" element={<ActivitiesTable />} />
        <Route path="/watch_details/watch_history" element={<WatchHistory />} />
        <Route
          path="/staff/staff_user"
          element={userRole === "staff" ? <ManageStaff /> : <StaffUser />}
        />
        <Route path="/home/readActivity/:id" element={<ReadActivity />} />
        <Route
          path="/watch_details/watch_status/:id"
          element={<WatchStatus />}
        />

        <Route path="/panel/settings" element={<Settings />} />
        <Route path="/estimator/estimator_user" element={<Estimators />} />
        <Route
          path="/estimator/estimator_edit/:id"
          element={<EstimatorEdit />}
        />
        <Route
          path="/estimator/estimator_user_create"
          element={<EstimatorEdit />}
        />
        <Route
          path="/analysis/revenue_analysis/admin"
          element={<AdminRevanueAnalysis />}
        />
        <Route
          path="/analysis/revenue_analysis/seller/:seller_id"
          element={<SellerRevenueAnalysis />}
        />
        <Route
          path="/analysis/revenue_analysis/estimator"
          element={<EstimatorRevanueAnalysis />}
        />
        <Route
          path="/analysis/performance_analysis/admin"
          element={<AdminPerformanceAnalysis />}
        />
        <Route
          path="/analysis/performance_analysis/seller/:seller_id"
          element={<SellerPerformanceAnalysis />}
        />
        <Route
          path="/analysis/performance_analysis/estimator"
          element={<EstimatorPerformanceAnalysis />}
        />
        <Route path="/seller/seller_edit/:id" element={<SellerEdit />} />
        <Route
          path="/seller/seller_user_create"
          element={<SellerUserCreate />}
        />
        <Route
          path="/analysis/revenue_analysis/admin"
          element={<AdminRevanueAnalysis />}
        />
        <Route
          path="/analysis/revenue_analysis/estimator"
          element={<EstimatorRevanueAnalysis />}
        />
        <Route
          path="/analysis/revenue_analysis/seller"
          element={<SellerRevenueAnalysisStaff />}
        />
        <Route
          path="/analysis/performance_analysis/seller"
          element={<SellerPerformanceAnalysisStaff />}
        />
        <Route
          path="/analysis/performance_analysis/admin"
          element={<AdminPerformanceAnalysis />}
        />
        <Route
          path="/analysis/performance_analysis/estimator"
          element={<EstimatorPerformanceAnalysis />}
        />
        <Route path="/watch_details/brand_list" element={<BrandList />} />
        <Route path="/panel/account" element={<AccountProfile />} />

        {/* {userRole && <Route
          path="/staff/staff_user"
          element={<ManageStaff />}
        />} */}
        <Route path="language" element={<Language />} />
        {/* <Route path="/edit" element={<EditUser />} />  */}
      </Routes>
    </div>
  );
};

export default AdminRoot;
