import GradeIcon from "@mui/icons-material/Grade";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Checkbox from "@mui/material/Checkbox";
import React, { useState } from "react";
import PaginationComponent from "../../../components/common/PaginationComponent";
import SearchBar from "../../../components/common/SearchBar";
import SelectDropdown from "../../../components/common/SelectDropdown";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { sortData } from "../../../components/common/Sort";

export const statusOptions = [
  "All",
  "Active Only",
  "Not Active Only",
  "Waiting for Quotation",
  "Quotation Received",
  "Accepted",
  "Rejected by Staff",
  "Pass by Estimator",
  "Cancel",
  "Expired",
  "Pending Estipal Payment",
  "Paid / Pending Shipping",
  "Shipped",
  "Sold",
  "Completed",
];

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const activities = [
  {
    who: "(S)",
    from: "M - mayawizard",
    id: "UCA1000",
    message:
      "Action Required! Seller has sent invoice for watch (Rolex Daytona Stainless Steel - Bracelet - Serial: 43141331 - Year: 2019 - Last requested/quoted price: USD 0)",
    watchId: "W10015",
    status: "Pending Estipal Payment",
    received: "April 20, 2023 10:55 PM",
  },
  {
    who: "(Admin)",
    from: "Estipal-Administrator",
    id: "UCA1009",
    message:
      "Acceptance of the watch has been confirmed. This deal has been completed (Rolex GMT-Master II 40 mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel, 2022 - Serial: 1234567 - Year: 2021 - Last requested/quoted price: USD 0)",
    watchId: "W10077",
    status: "Sold",
    received: "April 19, 2023 10:05 AM",
  },
  {
    who: "(Admin)",
    from: "Estipal-Administrator",
    id: "UCA1009",
    message:
      "Acceptance of the watch has been confirmed. This deal has been completed (A. Lange & Söhne 1815 Up/Down - Serial: xbbzx - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10018",
    status: "Sold",
    received: "April 03, 2023 02:00 AM",
  },
  {
    who: "(S)",
    from: "Estipal, LLC - Administrator",
    id: "UCA1009",
    message:
      "Shipment of the watch has been confirmed by the Seller (Rolex Daytona 40mm, Black Dial, Ceramic Bezel, Bracelet, Stainless Steel - Serial: 123456 - Year: 2003 - Last requested/quoted price: USD 0)",
    watchId: "W10024",
    status: "Shipped",
    received: "December 21, 2022 08:59 AM",
  },
  {
    who: "(S)",
    from: "Estipal, LLC - Administrator",
    id: "UCA1009",
    message:
      "Shipment of the watch has been confirmed by the Seller (Rolex Sea-Dweller 44 mm, Black Dial, Ceramic Bezel, Bracelet, Stainless Steel, 2022 - Serial: 1234567890 - Year: 2018 - Last requested/quoted price: USD 0)",
    watchId: "W10022",
    status: "Shipped",
    received: "December 15, 2022 03:19 PM",
  },
  {
    who: "(U)",
    from: "MLA Thai - Bob",
    id: "UCA1001",
    message:
      "Staff has declined the estimate request. (Rolex Daytona 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel - Serial: 12356 - Year: 2019 - Last requested/quoted price: USD 0)",
    watchId: "W10009",
    status: "Rejected",
    received: "November 15, 2023 12:18 PM",
  },
  {
    who: "(E)",
    from: "Karan Company -Administrator",
    id: "UCA1001",
    message:
      "Staff has accepted deal at staff first counter offer price (Patek Philippe Complications World Time - 36mm, Green Dial, Green Leather Strap, Rose Gold - Serial: 123456 - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10089",
    status: "Accepted - Deal in progress",
    received: "November 11, 2023 03:33 PM",
  },
  {
    who: "(U)",
    from: "MLA Thai - RobeAdministrator",
    id: "UCA1001",
    message:
      "Staff has placed first counter offer on estimation of the watch quotation (Rolex Air-King 40mm, Black Dial, Bracelet, Stainless Steel - Serial: 12345678 - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10088",
    status: "Pending first counter offer",
    received: "November 09, 2023 04:16 PM",
  },
  {
    who: "(Admin)",
    from: "Estipal-AdminisAdministrator",
    id: "UCA1009",
    message:
      "Estipal sold the watch. This deal has been completed. (Rolex Yacht-Master 42 mm, Black Dial, Ceramic Bezel, Black Rubber Bracelet, White Gold - Serial: 23456709 - Year: 2020 - Last requested/quoted price: USD 0)",
    watchId: "W10087",
    status: "Sold",
    received: "July 31, 2023 10:33 AM",
  },
  {
    who: "(Admin)",
    from: "Estipal-AdminisAdministrator",
    id: "UCA1000",
    message:
      "Commissions to estimator has been paid (USD 0.00) (A. Lange & Söhne 1815 Honeygold - Serial: xxxx - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10023",
    status: "Sold",
    received: "June 05, 2023 11:25 AM",
  },
  {
    who: "(Admin)",
    from: "Estipal-AdminisAdministrator",
    id: "UCA1012",
    message:
      "Commissions to estimator has been paid (USD 270.00) (Rolex Daytona 40mm, Black Dial, Ceramic Bezel, Bracelet, Stainless Steel - Serial: xxxxx - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10081",
    status: "Sold",
    received: "June 04, 2023 10:51 PM",
  },
  {
    who: "(Admin)",
    from: "Estipal-AdminisAdministrator",
    id: "UCA1012",
    message:
      "Commissions to estimator has been paid (USD 0.00) (A. Lange & Söhne 1815 Honeygold - Serial: xxxx - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10082",
    status: "Sold",
    received: "June 04, 2023 10:51 PM",
  },
  {
    who: "(U)",
    from: "maya - test_staAdministrator",
    id: "UCA1012",
    message:
      "This estimate is expired, please submit your request again (Rolex Daytona 40mm, Black Dial, Ceramic Bezel, Bracelet, Stainless Steel - Serial: zxx - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10086",
    status: "Expired",
    received: "May 04, 2023 09:12 AM",
  },
  {
    who: "(U)",
    from: "maya - test_staAdministrator",
    id: "UCA1012",
    message:
      "This estimate is expired, please submit your request again (A. Lange & Söhne 1815 Honeygold - Serial: xxop - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10085",
    status: "Expired",
    received: "May 04, 2023 07:39 AM",
  },
  {
    who: "(U)",
    from: "maya - test_staAdministrator",
    id: "UCA1012",
    message:
      "This estimate is expired, please submit your request again (Cartier Baignoire Large - Pink Gold - Serial: yyyy - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10084",
    status: "Expired",
    received: "April 28, 2023 10:37 AM",
  },
  {
    who: "(U)",
    from: "maya - test_staAdministrator",
    id: "UCA1012",
    message:
      "This estimate is expired, please submit your request again (Audemars Piguet Code 11.59 by Audemars Piguet Selfwinding - White Gold, Blue Dial - Serial: xxxx - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10083",
    status: "Expired",
    received: "April 28, 2023 10:21 AM",
  },
  {
    who: "(Admin)",
    from: "Estipal-AdminisAdministrator",
    id: "UCA1009",
    message:
      "Estipal sold the watch. This deal has been completed. (Rolex Submariner 41 mm, Black Dial, Ceramic Bezel, Bracelet, Stainless Steel and Yellow Gold - Serial: 12345 - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10080",
    status: "Sold",
    received: "April 24, 2023 02:26 PM",
  },
  {
    who: "(Admin)",
    from: "Estipal-AdminisAdministrator",
    id: "UCA1009",
    message:
      "Estipal sold the watch. This deal has been completed. (Rolex Yacht-Master 42 mm, Black Dial, Ceramic Bezel, Black Rubber Bracelet, White Gold - Serial: 23456789 - Year: 2021 - Last requested/quoted price: USD 0)",
    watchId: "W10079",
    status: "Sold",
    received: "April 21, 2023 09:04 AM",
  },
  {
    who: "(Admin)",
    from: "Estipal-AdminisAdministrator",
    id: "UCA1009",
    message:
      "The payment of the seller has been confirmed. Shipment of the watch is pending (Rolex Daytona Stainless Steel - Bracelet - Serial: 43141331 - Year: 2019 - Last requested/quoted price: USD 0)",
    watchId: "W10016",
    status: "Paid / Pending Shipping",
    received: "April 20, 2023 10:55 PM",
  },
  {
    who: "(Admin)",
    from: "Estipal-AdminisAdministrator",
    id: "UCA1009",
    message:
      "Estipal sold the watch. This deal has been completed. (Rolex Yacht-Master 42 mm, Black Dial, Ceramic Bezel, Black Rubber Bracelet, White Gold - Serial: 123456789 - Year: 2021 - Last requested/quoted price: USD 0)",
    watchId: "W10078",
    status: "Sold",
    received: "April 19, 2023 10:05 AM",
  },
];

const ActivitiesTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(activities);
  const [status, setStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const handleSort = (key) => {
    const newOrder = sortField === key && sortOrder === "asc" ? "desc" : "asc";
    setSortField(key);
    setSortOrder(newOrder);

    // Sort data and update state
    const sortedData = sortData(data, key, newOrder);
    setData(sortedData);
  };

  return (
    <div className="p-[15px]">
      <div className="px-0 sm:px-[15px] flex justify-between flex-wrap">
        <h1 className="text-[30px] font-medium mb-4 px-0 sm:px-[15px] font-sans text-white">
          Activities
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
          {/* <thead style={{ borderBottom: "2px solid #111111" }}>
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
              <th
                className="p-2 text-[#ffff] text-center sorting cursor-pointer"
                onClick={() => handleSort("who")}
              >
                Who {renderSortIcon("who")}
              </th>
              <th
                className="p-2 text-[#ffff] text-center sorting cursor-pointer"
                onClick={() => handleSort("from")}
              >
                From {renderSortIcon("from")}
              </th>
              <th
                className="p-2 text-[#ffff] text-center sorting cursor-pointer"
                onClick={() => handleSort("id")}
              >
                ID {renderSortIcon("id")}
              </th>
              <th className="p-2 text-[#ffff] sorting">Message</th>
              <th
                className="p-2 text-[#ffff] text-center sorting cursor-pointer"
                onClick={() => handleSort("watchId")}
              >
                Watch Id {renderSortIcon("watchId")}
              </th>
              <th
                className="p-2 text-[#ffff] text-center sorting cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status {renderSortIcon("status")}
              </th>
              <th
                className="p-2 text-[#ffff] text-center sorting cursor-pointer"
                onClick={() => handleSort("received")}
              >
                Received {renderSortIcon("received")}
              </th>
            </tr>
          </thead> */}
          <thead style={{ borderBottom: "2px solid #111111" }}>
            <tr>
              {[
                { key: "", label: "" },
                {
                  key: "checkbox",
                  label: <StarOutlineIcon sx={{ color: "#9b9b9b", fontSize: "21px" }} />,
                  render: () => (
                    <Checkbox
                      icon={<StarOutlineIcon sx={{ color: "#9b9b9b", fontSize: "21px" }} />}
                      checkedIcon={<GradeIcon sx={{ color: "#ff9300", fontSize: "21px" }} />}
                    />
                  ),
                },
                { key: "who", label: "Who", isSortable: true },
                { key: "from", label: "From", isSortable: true },
                { key: "id", label: "ID", isSortable: true },
                { key: "message", label: "Message", isSortable: false },
                { key: "watchId", label: "Watch Id", isSortable: true },
                { key: "status", label: "Status", isSortable: true },
                { key: "received", label: "Received", isSortable: true },
              ].map((column) => (
                <th
                  key={column.key}
                  onClick={column.isSortable ? () => handleSort(column.key) : undefined}
                  className={`p-2 text-[#ffff] text-center ${column.isSortable ? "cursor-pointer" : ""} ${column.isSortable && sortField === column.key ? "active-sorting" : ""} ${column.isSortable && sortField !== column.key ? "sorting" : ""}`}
                >
                  {column.label}{" "}
                  {column.isSortable && sortField === column.key && (
                    sortOrder === "asc" ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((activity, index) => (
              <tr
                key={index}
                className="border-b border-[#202b34]"
                onClick={() => navigate("/admin/home/readActivity")}
              >
                <td className="px-[18px] py-[0px] text-[#ffff] text-center">
                  <div className="w-[35px]">
                    <a href="#" role="button">
                      <img
                        alt="img"
                        src="https://www.estipal.com/assets/dist/images/icons/Alarm_watch_light.png"
                        width="35px"
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
                  {activity.who}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] cursor-pointer">
                  <Tooltip title={activity.from} placement="top" arrow>
                    <div className="w-[97px] truncate">{activity.from}</div>
                  </Tooltip>
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center">
                  {activity.id}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] whitespace-nowrap cursor-pointer">
                  <Tooltip
                    title="Rolex Daytona Stainless Steel - Bracelet - Serial: 43141331 - Year: 2019 - Last requested/quoted price: USD "
                    placement="top"
                    arrow
                  >
                    {activity.message}
                  </Tooltip>
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center">
                  {activity.watchId}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap">
                  {activity.status}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap">
                  {activity.received}
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

export default ActivitiesTable;
