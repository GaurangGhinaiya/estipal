import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./Admin";
import WatchHistory from "./watchHistory/WatchHistory";
import StaffUser from "./staff/StaffUser";
import ReadActivity from "./home/ReadActivity";

const AdminRoot = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/watch_details/watch_history" element={<WatchHistory />} />
        <Route path="/staff/staff_user" element={<StaffUser />} />
        <Route path="/home/readActivity" element={<ReadActivity />} />

        {/* <Route path="/edit" element={<EditUser />} />  */}
      </Routes>
    </div>
  );
};

export default AdminRoot;
