import React from "react";
import Profile from "./components/Profile";
import { Menu, MenuItem, Button, TextField, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const StyledInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: "#1F2937", // Tailwind gray-800
  color: "white",
  padding: "4px 12px",
  borderRadius: "4px",
  width: "200px",
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <header className="px-[15px] flex justify-between bg-[#1d272e] h-[66px] items-center">
        <div className="flex items-center">
          <a href="" className="pr-[15px]">
            <img
              alt="Logo"
              src="https://www.estipal.com/assets/dist/images/img-logo-bar-admin.svg"
              className="h-[50px]"
            />
          </a>
          <div class="text-[#ffff] font-bold text-[15px]">
            ESTIPAL ADMINISTRATION{" "}
          </div>
        </div>

        <Profile />
      </header>

      <div>
        {/* Navigation Bar */}
        <div className="bg-[#0060aa] text-white flex items-center px-[38px] h-[47px] py-[10px]">
          {/* Navigation Links */}
          <div className="flex space-x-3">
            <Button
              className="text-white !normal-case !text-[14px] !p-[0]"
              sx={{ color: "white" }}
            >
              Activities
            </Button>
            <Button
              className="text-white !normal-case !text-[14px] !p-[0]"
              sx={{ color: "white" }}
            >
              Watches History
            </Button>
            <Button
              className="text-white !normal-case !text-[14px] !p-[0]"
              sx={{ color: "white" }}
            >
              Merchants & Staff
            </Button>
            <Button
              className="text-white !normal-case !text-[14px] !p-[0]"
              sx={{ color: "white" }}
            >
              Estimators
            </Button>

            <div>
              <Button
                className="text-white !normal-case !text-[14px] !p-[0]"
                sx={{ color: "white" }}
                onClick={handleMenuClick}
              >
                Revenue Analysis <ArrowDropDownIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Merchant</MenuItem>
                <MenuItem onClick={handleMenuClose}>Estimator</MenuItem>
              </Menu>
            </div>

            <div>
              <Button
                className="text-white !normal-case !text-[14px] !p-[0]"
                sx={{ color: "white" }}
                onClick={handleMenuClick}
              >
                Performance Analysis <ArrowDropDownIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Merchant</MenuItem>
                <MenuItem onClick={handleMenuClose}>Estimator</MenuItem>
              </Menu>
            </div>
            <Button
              className="text-white !normal-case !text-[14px] !p-[0]"
              sx={{ color: "white" }}
            >
              Brands, Collection and Models
            </Button>
            <Button
              className="text-white !normal-case !text-[14px] !p-[0]"
              sx={{ color: "white" }}
            >
              General Settings
            </Button>
            <Button
              className="text-white !normal-case !text-[14px] !p-[0]"
              sx={{ color: "white" }}
            >
              Languages
            </Button>
          </div>

          {/* Spacer */}
          {/* <div className="flex-1"></div> */}

          {/* Filter and Search */}
          {/* <div className="flex items-center space-x-4">
            <div className="flex items-center text-white space-x-2">
              <span>Filter by Status:</span>
              <select
                className="bg-gray-800 text-white p-2 rounded-md"
                defaultValue="All"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <StyledInput
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Header;
