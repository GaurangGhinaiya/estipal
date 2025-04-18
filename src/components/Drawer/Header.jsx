import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Profile from "./components/Profile";
import LightLogo from "../../assets/images/img-logo-bar-admin.png";
import DarkLogo from "../../assets/images/img-logo-login.png";

import { translate } from "../../language";

const Header = () => {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = React.useState(false);
  const [openRevenueMenu, setOpenRevenueMenu] = React.useState(false);
  const [openPerformanceMenu, setOpenPerformanceMenu] = React.useState(false);
  const pathName = useLocation();
  const { pathname } = pathName;
  const userRole = localStorage.getItem("userRole");
  const userName = JSON.parse(localStorage.getItem("userData"));
  const close_Revenue_Analysis_ref = useRef(null);
  const close_Performance_Analysis_ref = useRef(null);

  const handleRevenueMenuClick = (event) => {
    setOpenRevenueMenu(!openRevenueMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        close_Revenue_Analysis_ref.current &&
        !close_Revenue_Analysis_ref.current.contains(event.target)
      ) {
        setOpenRevenueMenu(false);
      }

      if (
        close_Performance_Analysis_ref.current &&
        !close_Performance_Analysis_ref.current.contains(event.target)
      ) {
        setOpenPerformanceMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePerformanceMenuClick = (event) => {
    setOpenPerformanceMenu(!openPerformanceMenu);
  };

  return (
    <div>
      <header
        className={`px-[15px] flex justify-between bg-white dark:bg-[#1d272e] h-[66px] items-center sticky top-0 left-0 bottom-0 z-[1]`}
      >
        <div className="flex items-center">
          <Button
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <MenuIcon sx={{ color: "#888" }} />
          </Button>
          <a href="/" className="pr-[15px]">
            <img
              alt="Logo"
              src={userRole === "admin" ? LightLogo : DarkLogo}
              className="h-[50px]"
            />
          </a>
          <div className=" text-black dark:text-[#ffff] font-bold text-[15px]">
            {userRole === "staff"
              ? "ESTIPAL MERCHANT ADMIN CONSOLE"
              : "ESTIPAL ADMINISTRATION"}
          </div>
        </div>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <Profile />
        </Box>
      </header>

      {/* Navigation Bar Desktop*/}
      <Box
        className="bg-[#0060aa] shadow-xl dark:shadow-transparent text-white flex items-center px-[38px] py-[11px]"
        sx={{ display: { xs: "none", md: "block" } }}
      >
        {/* Navigation Links */}
        <div className="flex gap-[12px] flex-wrap">
          <Button
            className="text-white !normal-case !text-[14px] !p-[0] !m-[0] "
            sx={{
              color: "white",
              fontWeight: pathname === "/admin" ? "bold" : "normal",
            }}
            onClick={() => navigate("/admin")}
          >
            {translate("ACTIVITIES")}
          </Button>
          <Button
            className="text-white !normal-case !text-[14px] !p-[0] !m-[0]"
            sx={{
              color: "white",
              fontWeight: pathname.includes(
                "/admin/watch_details/watch_history"
              )
                ? "bold"
                : "normal",
            }}
            onClick={() => navigate("/admin/watch_details/watch_history")}
          >
            {translate("WATCHESHISTORY")}
          </Button>
          {userRole === "admin" && (
            <Button
              className="text-white !normal-case !text-[14px] !p-[0] !m-[0]"
              sx={{
                color: "white",
                fontWeight: pathname.includes("/admin/staff/staff_user")
                  ? "bold"
                  : "normal",
              }}
              onClick={() => navigate("/admin/staff/staff_user")}
            >
              Merchants & Staff
            </Button>
          )}
          {userRole === "admin" && (
            <Button
              className="text-white !normal-case !text-[14px] !p-[0] !m-[0]"
              sx={{
                color: "white",
                fontWeight: pathname.includes("/admin/estimator/estimator_user")
                  ? "bold"
                  : "normal",
              }}
              onClick={() => navigate("/admin/estimator/estimator_user")}
            >
              Estimators
            </Button>
          )}
          {userRole === "staff" && (
            <div className="relative">
              <Button
                className="text-white !normal-case !text-[14px] !p-[0] !m-[0] "
                sx={{
                  color: "white",
                  fontWeight: pathname.includes(
                    "/admin/analysis/revenue_analysis/seller"
                  )
                    ? "bold"
                    : "normal",
                }}
                onClick={() =>
                  navigate("/admin/analysis/revenue_analysis/seller")
                }
              >
                {translate("REVANUEANALYSIS")}
              </Button>
            </div>
          )}
          {userRole === "admin" && (
            <div ref={close_Revenue_Analysis_ref} className="relative">
              <button
                style={{
                  fontSize: "14px",
                  fontWeight:
                    pathname.includes(
                      "/admin/analysis/revenue_analysis/admin"
                    ) ||
                    pathname.includes(
                      "/admin/analysis/revenue_analysis/estimator"
                    )
                      ? "bold"
                      : "normal",
                }}
                onClick={() => handleRevenueMenuClick()}
                className=""
              >
                Revenue Analysis <ArrowDropDownIcon />
              </button>
              {openRevenueMenu && (
                <div className="absolute bg-[#0060aa] border border-white mt-3 rounded-lg">
                  <button
                    className="block rounded-lg px-4 py-2 hover:bg-[#b3c1c5]"
                    onClick={() => {
                      navigate("/admin/analysis/revenue_analysis/admin");
                      setOpenRevenueMenu(false);
                    }}
                  >
                    Merchant
                  </button>
                  <button
                    className="block rounded-lg  px-4 py-2 hover:bg-[#b3c1c5]"
                    onClick={() => {
                      navigate("/admin/analysis/revenue_analysis/estimator");
                      setOpenRevenueMenu(false);
                    }}
                  >
                    Estimator
                  </button>
                </div>
              )}
            </div>
          )}
          {userRole === "staff" && (
            <div className="relative">
              <Button
                className="text-white !normal-case !text-[14px] !p-[0] !m-[0] "
                sx={{
                  color: "white",
                  fontWeight: pathname.includes(
                    "/admin/analysis/performance_analysis/seller"
                  )
                    ? "bold"
                    : "normal",
                }}
                onClick={() =>
                  navigate("/admin/analysis/performance_analysis/seller")
                }
              >
                {translate("PERFORMANCEANALYSIS")}
              </Button>
            </div>
          )}
          {userRole === "admin" && (
            <div ref={close_Performance_Analysis_ref} className="relative">
              <button
                style={{
                  fontSize: "14px",
                  fontWeight:
                    pathname.includes(
                      "/admin/analysis/performance_analysis/admin"
                    ) ||
                    pathname.includes(
                      "/admin/analysis/performance_analysis/estimator"
                    )
                      ? "bold"
                      : "normal",
                }}
                onClick={() => handlePerformanceMenuClick()}
                className=""
              >
                Performance Analysis <ArrowDropDownIcon />
              </button>
              {openPerformanceMenu && (
                <div className="absolute bg-[#0060aa] border border-white mt-3 rounded-lg">
                  <button
                    className="block rounded-lg px-4 py-2 hover:bg-[#b3c1c5]"
                    onClick={() => {
                      navigate("/admin/analysis/performance_analysis/admin");
                      setOpenPerformanceMenu(false);
                    }}
                  >
                    Merchant
                  </button>
                  <button
                    className="block rounded-lg  px-4 py-2 hover:bg-[#b3c1c5]"
                    onClick={() => {
                      navigate(
                        "/admin/analysis/performance_analysis/estimator"
                      );
                      setOpenPerformanceMenu(false);
                    }}
                  >
                    Estimator
                  </button>
                </div>
              )}
            </div>
          )}
          {userRole === "admin" && (
            <Button
              className="text-white !normal-case !text-[14px] !p-[0] !m-[0]"
              sx={{
                color: "white",
                fontWeight: pathname.includes("/admin/watch_details/brand_list")
                  ? "bold"
                  : "normal",
              }}
              onClick={() => navigate("/admin/watch_details/brand_list")}
            >
              Brands, Collection and Models
            </Button>
          )}
          {userRole === "admin" && (
            <Button
              className="text-white !normal-case !text-[14px] !p-[0] !m-[0]"
              sx={{
                color: "white",
                fontWeight: pathname.includes("/admin/panel/settings")
                  ? "bold"
                  : "normal",
              }}
              onClick={() => navigate("/admin/panel/settings")}
            >
              General Settings
            </Button>
          )}
          {userRole === "admin" && (
            <Button
              className="text-white !normal-case !text-[14px] !p-[0] !m-[0]"
              sx={{
                color: "white",
                fontWeight: pathname.includes("/admin/language")
                  ? "bold"
                  : "normal",
              }}
              onClick={() => navigate("/admin/language")}
            >
              Languages
            </Button>
          )}
          {userRole === "staff" && (
            <Button
              className="text-white !normal-case !text-[14px] !p-[0] !m-[0]"
              sx={{
                color: "white",
                fontWeight: pathname.includes("/admin/staff/staff_user")
                  ? "bold"
                  : "normal",
              }}
              onClick={() => navigate("/admin/staff/staff_user")}
            >
              {translate("MANAGESTAFF")}
            </Button>
          )}
          {userRole === "staff" && (
            <Button
              className="text-white !normal-case !text-[14px] !p-[0] !m-[0]"
              sx={{
                color: "white",
                fontWeight: pathname.includes("/admin/panel/account")
                  ? "bold"
                  : "normal",
              }}
              onClick={() => navigate("/admin/panel/account")}
            >
              {translate("ACCOUNTPROFILE")}
            </Button>
          )}
        </div>
      </Box>

      {/* Navigation Bar Mobile*/}

      <Box
        className="bg-[#1d272e] text-white py-[11px] fixed z-[1] w-full"
        sx={{ display: { xs: openMenu ? "block" : "none", md: "none" } }}
      >
        <hr className="mb-3" />
        {/* Navigation Links */}
        <div className="flex flex-col gap-[12px] max-h-[340px] overflow-auto">
          <Button className="!text-white !normal-case !text-left !justify-start !px-[15px] !py-[10px] !font-bold">
            <PersonIcon fontSize="medium" sx={{ color: "#ffff", mr: "10px" }} />
            {translate("SIGNINASTEXT")} {userName?.username}
          </Button>
          <div>
            <Profile />
          </div>
          <hr style={{ borderTopColor: "#ffffff1a", borderTopWidth: "2px" }} />
          <Button
            className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold "
            sx={{
              color: "white",
              fontWeight: pathname === "/admin" ? "bold" : "normal",
            }}
            onClick={() => {
              navigate("/admin");
              setOpenMenu(false);
            }}
          >
            {translate("ACTIVITIES")}
          </Button>
          <Button
            className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
            sx={{
              color: "white",
              fontWeight: pathname.includes(
                "/admin/watch_details/watch_history"
              )
                ? "bold"
                : "normal",
            }}
            onClick={() => {
              navigate("/admin/watch_details/watch_history");
              setOpenMenu(false);
            }}
          >
            {translate("WATCHESHISTORY")}
          </Button>
          {userRole === "admin" && (
            <Button
              className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
              sx={{
                color: "white",
                fontWeight: pathname.includes("/admin/staff/staff_user")
                  ? "bold"
                  : "normal",
              }}
              onClick={() => {
                navigate("/admin/staff/staff_user");
                setOpenMenu(false);
              }}
            >
              Merchants & Staff
            </Button>
          )}
          {userRole === "admin" && (
            <Button
              className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
              sx={{
                color: "white",
                fontWeight: pathname.includes("/admin/estimator/estimator_user")
                  ? "bold"
                  : "normal",
              }}
              onClick={() => {
                navigate("/admin/estimator/estimator_user");
                setOpenMenu(false);
              }}
            >
              Estimators
            </Button>
          )}
          {userRole === "staff" && (
            <Button
              className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
              sx={{
                color: "white",
                fontWeight: pathname.includes(
                  "/admin/analysis/revenue_analysis/seller"
                )
                  ? "bold"
                  : "normal",
              }}
              onClick={() => {
                navigate("/admin/analysis/revenue_analysis/seller");
                setOpenMenu(false);
              }}
            >
              {translate("REVANUEANALYSIS")}
            </Button>
          )}
          {userRole === "admin" && (
            <div className="relative mb-1">
              <button
                style={{
                  fontSize: "14px",
                  fontWeight:
                    pathname.includes(
                      "/admin/analysis/revenue_analysis/admin"
                    ) ||
                    pathname.includes(
                      "/admin/analysis/revenue_analysis/estimator"
                    )
                      ? "bold"
                      : "normal",
                }}
                onClick={() => handleRevenueMenuClick()}
                className="px-4 text-[14px]"
              >
                Revenue Analysis <ArrowDropDownIcon />
              </button>
              {openRevenueMenu && (
                <div className="z-20 absolute bg-[#0060aa] border border-white mt-3 rounded-lg">
                  <button
                    className="block rounded-lg px-4 py-2 hover:bg-[#b3c1c5]"
                    onClick={() => {
                      navigate("/admin/analysis/revenue_analysis/admin");
                      setOpenRevenueMenu(false);
                      setOpenMenu(false);
                    }}
                  >
                    Merchant
                  </button>
                  <button
                    className="block rounded-lg  px-4 py-2 hover:bg-[#b3c1c5]"
                    onClick={() => {
                      navigate("/admin/analysis/revenue_analysis/estimator");
                      setOpenRevenueMenu(false);
                      setOpenMenu(false);
                    }}
                  >
                    Estimator
                  </button>
                </div>
              )}
            </div>
          )}
          {userRole === "staff" && (
            <Button
              className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
              sx={{
                color: "white",
                fontWeight: pathname.includes(
                  "/admin/analysis/performance_analysis/seller"
                )
                  ? "bold"
                  : "normal",
              }}
              onClick={() => {
                navigate("/admin/analysis/performance_analysis/seller");
                setOpenMenu(false);
              }}
            >
              {translate("PERFORMANCEANALYSIS")}
            </Button>
          )}
          {userRole === "admin" && (
            <div className="relative">
              <button
                style={{
                  fontSize: "14px",
                  fontWeight:
                    pathname.includes(
                      "/admin/analysis/performance_analysis/admin"
                    ) ||
                    pathname.includes(
                      "/admin/analysis/performance_analysis/estimator"
                    )
                      ? "bold"
                      : "normal",
                }}
                onClick={() => handlePerformanceMenuClick()}
                className="px-4 text-[14px]"
              >
                Performance Analysis <ArrowDropDownIcon />
              </button>
              {openPerformanceMenu && (
                <div className="absolute bg-[#0060aa] border border-white mt-3 rounded-lg z-20">
                  <button
                    className="block rounded-lg px-4 py-2 hover:bg-[#b3c1c5]"
                    onClick={() => {
                      navigate("/admin/analysis/performance_analysis/admin");
                      setOpenPerformanceMenu(false);
                      setOpenMenu(false);
                    }}
                  >
                    Merchant
                  </button>
                  <button
                    className="block rounded-lg  px-4 py-2 hover:bg-[#b3c1c5]"
                    onClick={() => {
                      navigate(
                        "/admin/analysis/performance_analysis/estimator"
                      );
                      setOpenPerformanceMenu(false);
                      setOpenMenu(false);
                    }}
                  >
                    Estimator
                  </button>
                </div>
              )}
            </div>
          )}
          {userRole === "admin" && (
            <Button
              className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
              sx={{
                color: "white",
                fontWeight: pathname.includes("/admin/watch_details/brand_list")
                  ? "bold"
                  : "normal",
              }}
              onClick={() => {
                navigate("/admin/watch_details/brand_list");
                setOpenMenu(false);
              }}
            >
              Brands, Collection and Models
            </Button>
          )}
          {userRole === "admin" && (
            <Button
              className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
              sx={{
                color: "white",
                fontWeight: pathname.includes("/admin/panel/settings")
                  ? "bold"
                  : "normal",
              }}
              onClick={() => {
                navigate("/admin/panel/settings");
                setOpenMenu(false);
              }}
            >
              General Settings
            </Button>
          )}
          {userRole === "admin" && (
            <Button
              className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
              sx={{
                color: "white",
                fontWeight: pathname.includes("/admin/language")
                  ? "bold"
                  : "normal",
              }}
              onClick={() => {
                navigate("/admin/language");
                setOpenMenu(false);
              }}
            >
              Languages
            </Button>
          )}
          {userRole === "staff" && (
            <Button
              className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
              sx={{
                color: "white",
                fontWeight: pathname.includes("/admin/staff/staff_user")
                  ? "bold"
                  : "normal",
              }}
              onClick={() => {
                navigate("/admin/staff/staff_user");
                setOpenMenu(false);
              }}
            >
              {translate("MANAGESTAFF")}
            </Button>
          )}
          {userRole === "staff" && (
            <Button
              className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
              sx={{
                color: "white",
                fontWeight: pathname.includes("/admin/panel/account")
                  ? "bold"
                  : "normal",
              }}
              onClick={() => {
                navigate("/admin/panel/account");
                setOpenMenu(false);
              }}
            >
              {translate("ACCOUNTPROFILE")}
            </Button>
          )}

          <hr style={{ borderTopColor: "#ffffff1a", borderTopWidth: "2px" }} />

          <Button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="!text-white !normal-case !text-left !justify-start !px-[15px] !py-[10px] !font-bold"
          >
            <Logout fontSize="medium" sx={{ color: "#ffff", mr: "10px" }} />
            {translate("LOGOUT")}
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Header;
