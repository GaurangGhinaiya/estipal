import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./Admin";
import WatchHistory from "./watchHistory/WatchHistory";
import StaffUser from "./staff/StaffUser";
import ReadActivity from "./home/ReadActivity";
import Estimators from "./estimators/Estimators";
import AdminRevanueAnalysis from "./revenue_analysis/revenue_analysis_admin/AdminRevanueAnalysis";
import EstimatorRevanueAnalysis from "./revenue_analysis/revenue_analysis_estimator/EstimatorRevanueAnalysis";
import AdminPerformanceAnalysis from "./performance_analysis/performance_analysis_admin/AdminPerformanceAnalysis";
import EstimatorPerformanceAnalysis from "./performance_analysis/performance_analysis_estimator/EstimatorPerformanceAnalysis";

const AdminRoot = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/watch_details/watch_history" element={<WatchHistory />} />
        <Route path="/staff/staff_user" element={<StaffUser />} />
        <Route path="/home/readActivity" element={<ReadActivity />} />
        <Route path="/estimator/estimator_user" element={<Estimators />} />
        <Route path="/analysis/revenue_analysis/admin" element={<AdminRevanueAnalysis />} />
        <Route path="/analysis/revenue_analysis/estimator" element={<EstimatorRevanueAnalysis />} />
        <Route path="/analysis/performance_analysis/admin" element={<AdminPerformanceAnalysis />} />
        <Route path="/analysis/performance_analysis/estimator" element={<EstimatorPerformanceAnalysis />} />
        {/* <Route path="/edit" element={<EditUser />} />  */}
      </Routes>
    </div>
  );
};

export default AdminRoot;
