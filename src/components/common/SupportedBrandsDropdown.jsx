import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services";

const SupportedBrandsDropdown = ({
  selectedBrands,
  setSelectedBrands,
  disabled,
}) => {
  const navigate = useNavigate();
  const [supportedBrands, setSupportedBrands] = useState([]);

  useEffect(() => {
    const fetchSupportedBrands = async () => {
      try {
        const response = await axiosInstance.get(`/watchBrands?show_all=true`);

        setSupportedBrands(response?.payload?.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchSupportedBrands();
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;

    // Check if "Select All" is clicked
    if (value.includes("all")) {
      if (selectedBrands.length === supportedBrands.length) {
        setSelectedBrands([]); // Deselect all
      } else {
        setSelectedBrands(supportedBrands.map((brand) => brand.brand)); // Select all
      }
    } else {
      setSelectedBrands(value); // Update selected values
    }
  };

  return (
    <FormControl
      style={{
        minWidth: "auto",
        backgroundColor: "#1e252b",
        color: "white",
        display: "flex",
        flexDirection: "row",
        gap: "10px",
      }}
    >
      <div className="flex items-center">
        {selectedBrands?.length === 0 && <div>None Selected</div>}
      </div>
      <Select
        multiple
        disabled={disabled}
        value={selectedBrands}
        onChange={handleChange}
        renderValue={(selected) => {
          return selected?.length > 0
            ? `${selected?.length} Selected`
            : "Select Brands";
        }} // Display "X Selected"
        sx={{
          backgroundColor: "#1e252b",
          color: "white",
          "& .Mui-disabled": {
            color: "white !important",
            "-webkit-text-fill-color": "white !important",
            opacity: "0.7 !important",
          },
          "& .css-lohd6h-MuiSvgIcon-root-MuiSelect-icon": {
            color: disabled ? "grey" : "white",
          },
        }}
        size="small"
      >
        {/* "Select All" Option */}
        <MenuItem value="all">
          <Checkbox
            checked={selectedBrands?.length === supportedBrands?.length}
            // indeterminate={
            //   selectedBrands?.length > 0 &&
            //   selectedBrands?.length < supportedBrands?.length
            // }
            style={{ color: "black" }}
          />
          <ListItemText primary="Select All" />
        </MenuItem>

        {/* Supported Brands Options */}
        {supportedBrands?.map((item) => (
          <MenuItem
            key={item?.brand}
            value={item?.brand}
            sx={{ color: "black" }}
          >
            <Checkbox
              checked={selectedBrands?.indexOf(item?.brand) > -1}
              style={{ color: "black" }}
            />
            <ListItemText primary={item?.brand} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SupportedBrandsDropdown;
