import React from "react";
import {
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  FormControl,
} from "@mui/material";

const YearDropdown = ({ selectedYears, setSelectedYears, disabled }) => {
  const startYear = 1900;
  const endYear = new Date().getFullYear();
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleChange = (event) => {
    const value = event.target.value;

    if (value.includes("all")) {
      if (selectedYears.length === years.length) {
        setSelectedYears([]); // Deselect all
      } else {
        setSelectedYears(years); // Select all
      }
    } else {
      setSelectedYears(value); // Update selected values
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
        {selectedYears?.length === 0 && <div>None Selected</div>}
      </div>
      <Select
        multiple
        disabled={disabled}
        value={selectedYears}
        onChange={handleChange}
        renderValue={(selected) =>
          selected?.length > 0 ? `${selected?.length} Selected` : "Select Years"
        }
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
            checked={selectedYears.length === years.length}
            // indeterminate={
            //   selectedYears.length > 0 && selectedYears.length < years.length
            // }
            style={{ color: "black" }}
          />
          <ListItemText primary="Select All" />
        </MenuItem>

        {/* Year Options */}
        {years.map((year) => (
          <MenuItem key={year} value={year} sx={{ color: "black" }}>
            <Checkbox
              checked={selectedYears.indexOf(year) > -1}
              style={{ color: "black" }}
            />
            <ListItemText primary={year} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default YearDropdown;
