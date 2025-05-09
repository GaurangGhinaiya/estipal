import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "../Drawer/Footer";
import Header from "../Drawer/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchLanguages } from "../../store/slices/languageSlice";
import { useEffect } from "react";

const MainLayout = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { languages, loading, error } = useSelector(
    (state) => state?.languages
  );

  // console.log("languages: ", languages?.find((item) => item?.id === 59)["en"]);     
  // const token = true;

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  if (pathname === "/") {
    return <Navigate to={"/admin"} />;
  }

  // if (!token) {
  //   return <Navigate to={"/login"} />;
  // }

  return (
    <>
      <Header />
      <div className="pt-[52px] lg:pt-[0px] max-xs:px-[10px] min-h-[calc(100vh-162.5px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
