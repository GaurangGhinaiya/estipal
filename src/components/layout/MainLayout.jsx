import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "../Drawer/Footer";
import Header from "../Drawer/Header";

const MainLayout = () => {
  const { pathname } = useLocation();
  // const token = true;

  if (pathname === "/") {
    return <Navigate to={"/admin"} />;
  }

  // if (!token) {
  //   return <Navigate to={"/login"} />;
  // }

  return (
    <>
      <Header />
      <div className="max-sm:px-[10px] min-h-[calc(100vh-162.5px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
