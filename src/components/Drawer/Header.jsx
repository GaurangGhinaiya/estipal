import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import Profile from "./components/Profile";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openRevanueMenu, setOpenRevanueMenu] = React.useState(false);
  const [openPerformanceMenu, setOpenPerformanceMenu] = React.useState(false);
  const pathName = useLocation();
  const { pathname } = pathName

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleRevanueMenuClick = (event) => {
    setOpenRevanueMenu(!openRevanueMenu);
  };
  const handlePerformanceMenuClick = (event) => {
    setOpenPerformanceMenu(!openPerformanceMenu);
  };

  const handleRevanueMenuClose = () => {
    setOpenRevanueMenu(false);
  };

  return (
    <>
      <header className="px-[15px] flex justify-between bg-[#1d272e] h-[66px] items-center sticky top-0 left-0 bottom-0 z-[1]">
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
              src="https://www.estipal.com/assets/dist/images/img-logo-bar-admin.svg"
              className="h-[50px]"
            />
          </a>
          <div className="text-[#ffff] font-bold text-[15px]">
            ESTIPAL ADMINISTRATION{" "}
          </div>
        </div>

        <Profile />
      </header>

      {/* Navigation Bar Desktop*/}
      <Box
        className="bg-[#0060aa] text-white flex items-center px-[38px] py-[11px]"
        sx={{ display: { xs: "none", md: "block" } }}
      >
        {/* Navigation Links */}
        <div className="flex gap-[12px] flex-wrap">
          <Button
            className="text-white !normal-case !text-[14px] !p-[0] !m-[0] "
            sx={{ color: "white", fontWeight: pathname === "/admin" ? "bold" : "normal" }}
            onClick={() => navigate("/admin")}
          >
            Activities
          </Button>
          <Button
            className="text-white !normal-case !text-[14px] !p-[0] !m-[0]"
            sx={{ color: "white", fontWeight: pathname.includes("/admin/watch_details/watch_history") ? "bold" : "normal" }}
            onClick={() => navigate("/admin/watch_details/watch_history")}
          >
            Watches History
          </Button>
          <Button
            className="text-white !normal-case !text-[14px] !p-[0] !m-[0]"
            sx={{ color: "white", fontWeight: pathname.includes("/admin/staff/staff_user") ? "bold" : "normal" }}
            onClick={() => navigate("/admin/staff/staff_user")}
          >
            Merchants & Staff
          </Button>
          <Button
            className="text-white !normal-case !text-[14px] !p-[0] !m-[0]"
            sx={{ color: "white", fontWeight: pathname.includes("/admin/estimator/estimator_user") ? "bold" : "normal" }}
            onClick={() => navigate("/admin/estimator/estimator_user")}
          >
            Estimators
          </Button>
          <div className="relative">
            <button style={{ fontSize:"14px",fontWeight: (pathname.includes("/admin/analysis/revenue_analysis/admin") || pathname.includes("/admin/analysis/revenue_analysis/estimator")) ? "bold" : "normal" }} onClick={() => handleRevanueMenuClick()} className="">
              Revenue Analysis <ArrowDropDownIcon />
            </button>
            {openRevanueMenu && (
              <div className="absolute bg-[#0060aa] border border-white mt-3 rounded-lg">
                <a href="/admin/analysis/revenue_analysis/admin" className="block rounded-lg px-4 py-2 hover:bg-[#b3c1c5]">Merchant</a>
                <a href="/admin/analysis/revenue_analysis/estimator" className="block rounded-lg  px-4 py-2 hover:bg-[#b3c1c5]">Estimator</a>
              </div>
            )}
          </div>
          <div className="relative">
            <button style={{ fontSize:"14px",fontWeight: (pathname.includes("/admin/analysis/performance_analysis/admin") || pathname.includes("/admin/analysis/performance_analysis/estimator")) ? "bold" : "normal" }} onClick={() => handlePerformanceMenuClick()} className="">
            Performance Analysis <ArrowDropDownIcon />
            </button>
            {openPerformanceMenu && (
              <div className="absolute bg-[#0060aa] border border-white mt-3 rounded-lg">
                <a href="/admin/analysis/performance_analysis/admin" className="block rounded-lg px-4 py-2 hover:bg-[#b3c1c5]">Merchant</a>
                <a href="/admin/analysis/performance_analysis/estimator" className="block rounded-lg  px-4 py-2 hover:bg-[#b3c1c5]">Estimator</a>
              </div>
            )}
          </div>
          <Button
            className="text-white !normal-case !text-[14px] !p-[0] !m-[0]"
            sx={{ color: "white",fontWeight: pathname.includes("/admin/watch_details/brand_list") ? "bold" : "normal"  }}
            onClick={() => navigate("/admin/watch_details/brand_list")}
          >
            Brands, Collection and Models
          </Button>
          <Button
            className="text-white !normal-case !text-[14px] !p-[0] !m-[0]"
            sx={{ color: "white", fontWeight: pathname.includes("/admin/panel/settings") ? "bold" : "normal" }}
            onClick={() => navigate("/admin/panel/settings")}
          >
            General Settings
          </Button>
          <Button
            className="text-white !normal-case !text-[14px] !p-[0] !m-[0]"
            sx={{ color: "white" }}
          >
            Languages
          </Button>
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
            Signed in as admin
          </Button>

          <hr style={{ borderTopColor: "#ffffff1a", borderTopWidth: "2px" }} />
          <Button
            className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold "
            sx={{ color: "white" }}
          >
            Activities
          </Button>
          <Button
            className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
            sx={{ color: "white" }}
          >
            Watches History
          </Button>
          <Button
            className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
            sx={{ color: "white" }}
          >
            Merchants & Staff
          </Button>
          <Button
            className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
            sx={{ color: "white" }}
          >
            Estimators
          </Button>

          <Button
            className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
            sx={{ color: "white" }}
          >
            Revenue Analysis
          </Button>

          <Button
            className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
            sx={{ color: "white" }}
          >
            Performance Analysis
          </Button>
          <Button
            className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
            sx={{ color: "white" }}
          >
            Brands, Collection and Models
          </Button>
          <Button
            className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
            sx={{ color: "white" }}
          >
            General Settings
          </Button>
          <Button
            className="text-white !normal-case !text-left !justify-start !text-[14px] !py-[5px] !px-[15px] !m-[0] !font-bold"
            sx={{ color: "white" }}
          >
            Languages
          </Button>

          <hr style={{ borderTopColor: "#ffffff1a", borderTopWidth: "2px" }} />

          <Button className="!text-white !normal-case !text-left !justify-start !px-[15px] !py-[10px] !font-bold">
            <Logout fontSize="medium" sx={{ color: "#ffff", mr: "10px" }} />
            Logout
          </Button>
        </div>
      </Box>
    </>
  );
};

export default Header;
