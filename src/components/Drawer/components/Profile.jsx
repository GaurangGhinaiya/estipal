import Logout from "@mui/icons-material/Logout";
import PersonIcon from '@mui/icons-material/Person';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AdminProfile from "../../../assets/images/icons/AdminProfile.png";
import ProfileImg from "../../../assets/images/icons/Profile.png";
import ChinaFlag from "../../../assets/images/icons/cn_flag.png";
import EngFlag from "../../../assets/images/icons/en_flag.png";
import SpanishFlag from "../../../assets/images/icons/esp_flag.png";
import ItlyFlag from "../../../assets/images/icons/ita_flag.png";

export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { i18n } = useTranslation();
  const [anchorElLang, setAnchorElLang] = React.useState(null);
  const [selectedLang, setSelectedLang] = React.useState(localStorage.getItem("Language"));
  const open = Boolean(anchorEl);
  const openLang = Boolean(anchorElLang);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLangOpen = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleLangClose = () => {
    setAnchorElLang(null);
  };

  const handleLangSelect = (lang) => {
    localStorage.setItem("Language", lang);
    i18n.changeLanguage(lang);
    setSelectedLang(lang); // Set selected language
    toast.success("Language change successfully");
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Tooltip>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <img
              src={userRole === "staff" ? ProfileImg : AdminProfile}
              alt="icon-profile"
              className="w-[30px] mr-[4px]"
            />
          </IconButton>
        </Tooltip>
        {userRole === "staff" && <Tooltip>
          <IconButton
            onClick={handleLangOpen}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={openLang ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openLang ? "true" : undefined}
          >
            <img
              src={selectedLang === "en" ? EngFlag : selectedLang === "it" ? ItlyFlag : selectedLang === "es" ? SpanishFlag : ChinaFlag}
              alt="icon-profile"
              className="w-[30px] mr-[4px]"
            />
          </IconButton>
        </Tooltip>}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} className="!cursor-default">
          <ListItemIcon>
            <PersonIcon fontSize="medium" />
          </ListItemIcon>
          Signed in as {userData?.username}
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorElLang}
        id="account-menu"
        open={openLang}
        onClose={handleLangClose}
        onClick={handleLangClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => {
          handleLangSelect("en");
          handleLangClose()
        }} className="gap-2 !text-[15px]"
          style={{
            backgroundColor:
              selectedLang === "en" ? "#e1e3e9" : "transparent", // Change color for selected language
          }}
        >
          <ListItemIcon>
            <img
              src={EngFlag}
              alt="icon-profile"
              className="w-[30px] mr-[4px]"
            />
          </ListItemIcon>
          English
        </MenuItem>

        <MenuItem onClick={() => {
          handleLangSelect("it");
          handleLangClose()
        }} className="gap-2 !text-[15px]"
          style={{
            backgroundColor:
              selectedLang === "it" ? "#e1e3e9" : "transparent", // Change color for selected language
          }}
        >
          <ListItemIcon>
            <img
              src={ItlyFlag}
              alt="icon-profile"
              className="w-[30px] mr-[4px]"
            />
          </ListItemIcon>
          Italiano
        </MenuItem>
        <MenuItem onClick={() => {
          handleLangSelect("es");
          handleLangClose()
        }} className="gap-2 !text-[15px]"
          style={{
            backgroundColor:
              selectedLang === "es" ? "#e1e3e9" : "transparent", // Change color for selected language
          }}
        >
          <ListItemIcon>
            <img
              src={SpanishFlag}
              alt="icon-profile"
              className="w-[30px] mr-[4px]"
            />
          </ListItemIcon>
          Español
        </MenuItem>
        <MenuItem onClick={() => {
          handleLangSelect("zh");
          handleLangClose()
        }} className="gap-2 !text-[15px]"
          style={{
            backgroundColor:
              selectedLang === "zh" ? "#e1e3e9" : "transparent", // Change color for selected language
          }}
        >
          <ListItemIcon>
            <img
              src={ChinaFlag}
              alt="icon-profile"
              className="w-[30px] mr-[4px]"
            />
          </ListItemIcon>
          简体中文
        </MenuItem>

      </Menu>
    </React.Fragment>
  );
}
