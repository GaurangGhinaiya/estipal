import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import GradeIcon from "@mui/icons-material/Grade";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Checkbox from "@mui/material/Checkbox";
import React, { useState } from "react";
import PaginationComponent from "../../../components/common/PaginationComponent";
import SearchBar from "../../../components/common/SearchBar";
import SelectDropdown from "../../../components/common/SelectDropdown";
import { Tooltip } from "@mui/material";
import { statusOptions } from "../components/ActivitiesTable";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const history = [
  {
    id: "W10090",
    brand: "Rolex",
    collection: "Daytona",
    model: "40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel",
    serial: "12356",
    addedBy: "MLA Thai - Bob",
    asking: "USD 20,000 / USD 18,000",
    addedOn: "Nov 15, 2023",
    status: "Rejected",
  },
  {
    id: "W10090",
    brand: "Rolex",
    collection: "Daytona",
    model: "40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel",
    serial: "12356",
    addedBy: "MLA Thai - Bob",
    asking: "USD 20,000 / USD 18,000",
    addedOn: "Nov 15, 2023",
    status: "Rejected",
  },
  {
    id: "W10089",
    brand: "Patek Philippe",
    collection: "Complications",
    model: "World Time - 36mm, Green Dial, Green Leather Strap, Rose Gold",
    serial: "123456",
    addedBy: "MLA Thai - Bob",
    asking: "USD 30,000 / USD 27,000",
    addedOn: "Nov 11, 2023",
    status: "Accepted - Deal in progress",
  },
  {
    id: "W10088",
    brand: "Rolex",
    collection: "Air-King",
    model: "40mm, Black Dial, Bracelet, Stainless Steel",
    serial: "12345678",
    addedBy: "MLA Thai - Robert",
    asking: "USD 10,000 / USD 9,500",
    addedOn: "Nov 09, 2023",
    status: "Pending first counter offer",
  },
  {
    id: "W10087",
    brand: "Rolex",
    collection: "Yacht-Master",
    model:
      "42 mm, Black Dial, Ceramic Bezel, Black Rubber Bracelet, White Gold",
    serial: "23456709",
    addedBy: "Estipal, LLC - Jack Dawson",
    asking: "USD 15,000 / USD 14,000",
    addedOn: "Jul 30, 2023",
    status: "Completed",
  },
  {
    id: "W10086",
    brand: "Rolex",
    collection: "Daytona",
    model: "40mm, Black Dial, Ceramic Bezel, Bracelet, Stainless Steel",
    serial: "xxx",
    addedBy: "maya - test_staff1",
    asking: "USD 20,000 / USD 18,000",
    addedOn: "May 03, 2023",
    status: "Expired",
  },
  {
    id: "W10085",
    brand: "A. Lange & Sohne",
    collection: "1815",
    model: "Honeygold",
    serial: "xxxp",
    addedBy: "maya - test_staff1",
    asking: "USD 18,000 / USD 16,000",
    addedOn: "May 03, 2023",
    status: "Expired",
  },
  {
    id: "W10084",
    brand: "Cartier",
    collection: "Baignoire",
    model: "Large - Pink Gold",
    serial: "yyyy",
    addedBy: "maya - test_staff1",
    asking: "USD 20,000 / USD 19,180",
    addedOn: "Apr 27, 2023",
    status: "Expired",
  },
  {
    id: "W10083",
    brand: "Audemars Piguet",
    collection: "Code 11.59 by Audemars Piguet",
    model: "Selfwinding - White Gold, Blue Dial",
    serial: "xxxx",
    addedBy: "maya - test_staff1",
    asking: "USD 20,000 / USD 19,250",
    addedOn: "Apr 27, 2023",
    status: "Expired",
  },
  {
    id: "W10082",
    brand: "A. Lange & Sohne",
    collection: "1815",
    model: "Honeygold",
    serial: "xxxx",
    addedBy: "maya - test_staff1",
    asking: "USD 20,000 / USD 18,900",
    addedOn: "Apr 27, 2023",
    status: "Completed",
  },
  {
    id: "W10081",
    brand: "Rolex",
    collection: "Daytona",
    model: "40mm, Black Dial, Ceramic Bezel, Bracelet, Stainless Steel",
    serial: "xxxxx",
    addedBy: "maya - test_staff1",
    asking: "USD 20,000 / USD 18,900",
    addedOn: "Apr 27, 2023",
    status: "Completed",
  },
  {
    id: "W10080",
    brand: "Rolex",
    collection: "Submariner",
    model:
      "41 mm, Black Dial, Ceramic Bezel, Bracelet, Stainless Steel and Yellow Gold",
    serial: "12345",
    addedBy: "maya - test_staff1",
    asking: "USD 18,000 / USD 16,300",
    addedOn: "Apr 27, 2023",
    status: "Completed",
  },
  {
    id: "W10079",
    brand: "Rolex",
    collection: "Yacht-Master",
    model:
      "42 mm, Black Dial, Ceramic Bezel, Black Rubber Bracelet, White Gold",
    serial: "2345678",
    addedBy: "Estipal, LLC - Jack Dawson",
    asking: "USD 18,000 / USD 17,400",
    addedOn: "Apr 24, 2023",
    status: "Completed",
  },
  {
    id: "W10078",
    brand: "Rolex",
    collection: "Yacht-Master",
    model:
      "42 mm, Black Dial, Ceramic Bezel, Black Rubber Bracelet, White Gold",
    serial: "123456789",
    addedBy: "Estipal, LLC - Jack Dawson",
    asking: "USD 20,000 / USD 18,000",
    addedOn: "Apr 19, 2023",
    status: "Completed",
  },
  {
    id: "W10077",
    brand: "Rolex",
    collection: "GMT-Master II",
    model:
      "40 mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel, 2022",
    serial: "1234567",
    addedBy: "Estipal, LLC - Jack Dawson",
    asking: "USD 20,000 / USD 18,500",
    addedOn: "Apr 19, 2023",
    status: "Sold",
  },
  {
    id: "W10076",
    brand: "A. Lange & Sohne",
    collection: "1815",
    model: "Honeygold",
    serial: "123456789",
    addedBy: "Estipal, LLC - Jack Dawson",
    asking: "USD 10,000 / USD 9,600",
    addedOn: "Mar 30, 2023",
    status: "Completed",
  },
  {
    id: "W10075",
    brand: "Rolex",
    collection: "Yacht-Master",
    model:
      "42 mm, Falcon's Eye Dial, Ceramic Bezel, Black Rubber Bracelet, White Gold",
    serial: "1234567",
    addedBy: "Estipal, LLC - Jack Dawson",
    asking: "USD 15,000 / ",
    addedOn: "Mar 24, 2023",
    status: "Cancel",
  },
  {
    id: "W10074",
    brand: "Rolex",
    collection: "Yacht-Master",
    model:
      "42 mm, Black Dial, Ceramic Bezel, Black Rubber Bracelet, White Gold",
    serial: "1234567",
    addedBy: "Estipal, LLC - Jack Dawson",
    asking: "USD 21,000 / ",
    addedOn: "Mar 08, 2023",
    status: "Cancel",
  },
  {
    id: "W10073",
    brand: "Bvlgari",
    collection: "Bulgari Aluminium",
    model: "40 mm - Aluminum And Titanium",
    serial: "2345678",
    addedBy: "Estipal, LLC - Jack Dawson",
    asking: "USD 19,000 / ",
    addedOn: "Mar 08, 2023",
    status: "Cancel",
  },
  {
    id: "W10072",
    brand: "Rolex",
    collection: "Daytona",
    model:
      "40mm, Black Diamonds Dial, Bracelet, Stainless Steel and Yellow Gold",
    serial: "dfjghjk",
    addedBy: "MLA Thai - Robert",
    asking: "USD 0 / USD",
    addedOn: "Feb 23, 2023",
    status: "Cancel",
  },
];

const WatchHistory = () => {
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [status, setStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (column) => {
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? (
      <ArrowUpwardIcon sx={{ fontSize: "16px" }} />
    ) : (
      <ArrowDownwardIcon sx={{ fontSize: "16px" }} />
    );
  };
  return (
    <div className="p-[15px]">
      <div className="px-0 sm:px-[15px] flex justify-between flex-wrap">
        <h1 className="text-[30px] font-medium mb-4 px-0 sm:px-[15px] font-sans text-white">
          Watches History
        </h1>

        <div className="flex justify-between items-center mb-4 gap-4 sm:gap-8 flex-wrap ">
          <SelectDropdown
            title=" Filter by Status :"
            status={status}
            setStatus={setStatus}
            options={statusOptions}
          />

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder={"Search"}
          />
        </div>
      </div>

      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px]">
        <table className="table-auto w-full text-left">
          <thead style={{ borderBottom: "2px solid #111111" }}>
            <tr>
              <th className="p-2 text-[#ffff] text-center "></th>
              <th className="p-2 text-[#ffff] text-center ">
                <Checkbox
                  icon={
                    <StarOutlineIcon
                      sx={{ color: "#9b9b9b", fontSize: "21px" }}
                    />
                  }
                  checkedIcon={
                    <GradeIcon sx={{ color: "#ff9300", fontSize: "21px" }} />
                  }
                />
              </th>

              <th className="p-2 text-[#ffff] text-center sorting cursor-pointer">
                Id
              </th>
              <th className="p-2 text-[#ffff] text-center sorting cursor-pointer">
                Brand
              </th>
              <th className="p-2 text-[#ffff] text-center sorting cursor-pointer">
                Collection
              </th>
              <th className="p-2 text-[#ffff] text-center sorting cursor-pointer">
                Model
              </th>
              <th className="p-2 text-[#ffff] text-center sorting cursor-pointer">
                Serial
              </th>
              <th className="p-2 text-[#ffff] text-center sorting cursor-pointer">
                Added by
              </th>
              <th className="p-2 text-[#ffff] text-center sorting cursor-pointer">
                Asking / Estimate
              </th>
              <th className="p-2 text-[#ffff] text-center sorting cursor-pointer">
                Added on
              </th>
              <th className="p-2 text-[#ffff] text-center sorting cursor-pointer">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index} className="border-b border-[#202b34]">
                <td className="px-[18px] py-[0px] text-[#ffff] text-center">
                  <div className="w-[35px]">
                    <a href="">
                      <img
                        src="https://www.estipal.com/assets/dist/images/icons/icn-mai-light.svg"
                        width="25px"
                      />
                    </a>
                  </div>
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center">
                  {" "}
                  <Checkbox
                    {...label}
                    icon={
                      <StarOutlineIcon
                        sx={{ color: "#494a4b", fontSize: "21px" }}
                      />
                    }
                    checkedIcon={
                      <GradeIcon sx={{ color: "#ff9300", fontSize: "21px" }} />
                    }
                  />
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center">
                  {item.id}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] cursor-pointer">
                  <Tooltip title={item.brand} placement="top" arrow>
                    <div className="whitespace-nowrap text-center">
                      {item.brand}
                    </div>
                  </Tooltip>
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] whitespace-nowrap text-center">
                  {item.collection}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] whitespace-nowrap text-center cursor-pointer">
                  <Tooltip title={item.model} placement="top" arrow>
                    {item.model}
                  </Tooltip>
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center">
                  {item.serial}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap">
                  {item.addedBy}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap">
                  {item.asking}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap">
                  {item.addedOn}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationComponent totalPages={5} />
    </div>
  );
};

export default WatchHistory;
