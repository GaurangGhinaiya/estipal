import React from "react";
import Header from "../../components/Drawer/Header";
import ActivitiesTable from "./components/ActivitiesTable";
import Footer from "../../components/Drawer/Footer";

const Admin = () => {
  return (
    <div>
      <Header />
      <ActivitiesTable />
      <Footer />
    </div>
  );
};

export default Admin;
