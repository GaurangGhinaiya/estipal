import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/index";
import AdminProfile from "../../../assets/images/icons/AdminProfile.png";
import ProfileImg from "../../../assets/images/icons/Profile.png";
import HbFlag from "../../../assets/images/icons/hb_flag.png";
import AlFlag from "../../../assets/images/icons/al_flag.png";
import { languageToCountry } from "../../../utils";
import { useTranslate } from "../../../language";

export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElLang, setAnchorElLang] = React.useState(null);
  const [languageSettings, setLanguageSettings] = React.useState([]);
  const { translate } = useTranslate();
  const [selectedLang, setSelectedLang] = React.useState(
    localStorage.getItem("Language")
  );
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
    // i18n.changeLanguage(lang);
    setSelectedLang(lang);
    toast.success("Language change successfully");
    // setLanguage(lang);
    window.location.reload();
  };

  const fetchLanguageList = async () => {
    try {
      const languagesSettingsResponse = await axiosInstance.get(
        "/languagesSetting"
      );
      const updatedLanguages = languagesSettingsResponse?.payload?.data
        ?.filter((item) => item?.enable === 1)
        ?.map((item) => ({
          ...item,
          countryCode: languageToCountry[item?.name] || null,
        }));
      setLanguageSettings(updatedLanguages || []);

      const findDefaultSelected = updatedLanguages?.some((item) => {
        return item?.name === selectedLang;
      });

      if (!findDefaultSelected) {
        setSelectedLang(updatedLanguages[0]?.name);
        localStorage.setItem("Language", updatedLanguages[0]?.name);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  React.useEffect(() => {
    fetchLanguageList();
  }, []);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: { xs: "hidden", md: "flex" },
          alignItems: userRole === "admin" ? "center" : "start",
          textAlign: userRole === "admin" ? "center" : "start",
        }}
      >
        <Tooltip>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, display: { xs: "none", md: "flex" } }}
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
        {userRole === "staff" && (
          <Tooltip className="flex pb-[8px]">
            <IconButton
              onClick={handleLangOpen}
              size="small"
              sx={{ ml: 1 }}
              aria-controls={openLang ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openLang ? "true" : undefined}
            >
              {languageSettings
                ?.filter((item) => item?.name === selectedLang)
                ?.map((lang) => {
                  return (
                    <img
                      src={
                        lang?.countryCode === "hb"
                          ? HbFlag
                          : lang?.countryCode === "al"
                          ? AlFlag
                          : `https://flagcdn.com/w40/${lang?.countryCode?.toLowerCase()}.png`
                      }
                      alt="icon-profile"
                      className="w-[30px] mt-[5px] mr-[4px]"
                    />
                  );
                })}
            </IconButton>
            {languageSettings
              ?.filter((item) => item?.name === selectedLang)
              ?.map((lang) => {
                return (
                  <p className="p-[7px] flex lg:hidden">{lang?.full_name}</p>
                );
              })}
          </Tooltip>
        )}
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
          <p className="font-bold">
            {" "}
            {translate("SIGNINASTEXT")} {userData?.username}
          </p>
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
          {translate("LOGOUT")}
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
                // left: { xs: 0, md: 14 },
                // right: { xs: 14, md: 0 },

                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
                left: 10,
                right: 0,

                // Override for md+ (media query based)
                "@media (min-width:900px)": {
                  left: 110,
                  right: 0,
                },
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {languageSettings?.map((lang, index) => {
          return (
            <MenuItem
              onClick={() => {
                handleLangSelect(lang?.name);
                handleLangClose();
              }}
              className="gap-2 !text-[15px]"
              style={{
                backgroundColor:
                  selectedLang === lang?.name ? "#e1e3e9" : "transparent", // Change color for selected language
              }}
            >
              <ListItemIcon>
                <img
                  src={
                    lang?.countryCode === "hb"
                      ? HbFlag
                      : lang?.countryCode === "al"
                      ? AlFlag
                      : `https://flagcdn.com/w40/${lang?.countryCode?.toLowerCase()}.png`
                  }
                  alt="icon-profile"
                  className="w-[30px] mr-[4px]"
                />
              </ListItemIcon>
              {lang?.full_name}
            </MenuItem>
          );
        })}

        {/* <MenuItem
          onClick={() => {
            handleLangSelect("it");
            handleLangClose();
          }}
          className="gap-2 !text-[15px]"
          style={{
            backgroundColor: selectedLang === "it" ? "#e1e3e9" : "transparent", // Change color for selected language
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
        <MenuItem
          onClick={() => {
            handleLangSelect("es");
            handleLangClose();
          }}
          className="gap-2 !text-[15px]"
          style={{
            backgroundColor: selectedLang === "es" ? "#e1e3e9" : "transparent", // Change color for selected language
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
        <MenuItem
          onClick={() => {
            handleLangSelect("zh");
            handleLangClose();
          }}
          className="gap-2 !text-[15px]"
          style={{
            backgroundColor: selectedLang === "zh" ? "#e1e3e9" : "transparent", // Change color for selected language
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
        </MenuItem> */}
      </Menu>
    </React.Fragment>
  );
}
