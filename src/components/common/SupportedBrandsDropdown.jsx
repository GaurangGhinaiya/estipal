import React, { useState } from "react";
import {
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
} from "@mui/material";
import supportedBrands from "../../constant/supported_brands.json"; // Import your JSON data

const SupportedBrandsDropdown = ({
  selectedBrands,
  setSelectedBrands,
  disabled,
}) => {
  const handleChange = (event) => {
    const value = event.target.value;

    // Check if "Select All" is clicked
    if (value.includes("all")) {
      if (selectedBrands.length === supportedBrands.length) {
        setSelectedBrands([]); // Deselect all
      } else {
        setSelectedBrands(supportedBrands.map((brand) => brand.label)); // Select all
      }
    } else {
      setSelectedBrands(value); // Update selected values
    }
  };

  return (
    <FormControl
      style={{ minWidth: "auto", backgroundColor: "#1e252b", color: "white" }}
    >
      <Select
        multiple
        disabled={disabled}
        value={selectedBrands}
        onChange={handleChange}
        renderValue={(selected) =>
          selected.length > 0 ? `${selected.length} Selected` : "Select Brands"
        } // Display "X Selected"
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
            checked={selectedBrands.length === supportedBrands.length}
            indeterminate={
              selectedBrands.length > 0 &&
              selectedBrands.length < supportedBrands.length
            }
            style={{ color: "black" }}
          />
          <ListItemText primary="Select All" />
        </MenuItem>

        {/* Supported Brands Options */}
        {supportedBrands.map((brand) => (
          <MenuItem
            key={brand.label}
            value={brand.label}
            sx={{ color: "black" }}
          >
            <Checkbox
              checked={selectedBrands.indexOf(brand.label) > -1}
              style={{ color: "black" }}
            />
            <ListItemText primary={brand.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SupportedBrandsDropdown;
