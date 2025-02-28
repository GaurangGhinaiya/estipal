import React from "react";
import { CircularProgress, Tooltip } from "@mui/material";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import moment from "moment";
import GradeIcon from "@mui/icons-material/Grade";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StaffTable = ({
  activitesData,
  isLoading,
  handleSort,
  sortField,
  sortOrder,
  navigate,
  getImageSrc,
}) => {
  return (
    <table className="table-auto w-full text-left">
      <thead style={{ borderBottom: "2px solid #111111" }}>
        <tr>
          {[
            { key: "checkbox", label: "" },
            { key: "from", label: "From", isSortable: true },
            { key: "message", label: "Message", isSortable: false },
            { key: "watchId", label: "Watch Id", isSortable: true },
            { key: "status", label: "Status", isSortable: true },
            { key: "received", label: "Received", isSortable: true },
          ].map((column) => (
            <th
              key={column.key}
              onClick={
                column.isSortable ? () => handleSort(column.key) : undefined
              }
              className={`p-2 dark:text-[#ffff] text-black text-center cursor-pointer ${
                column.isSortable && sortField === column.key
                  ? "active-sorting"
                  : ""
              }`}
            >
              {column.label}{" "}
              {column.isSortable &&
                sortField === column.key &&
                (sortOrder === "asc" ? (
                  <ArrowDropUpRoundedIcon />
                ) : (
                  <ArrowDropDownRoundedIcon />
                ))}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading && activitesData?.length === 0 ? (
          <tr>
            <td colSpan={12} className="py-[200px] px-4 text-center">
              <CircularProgress />
            </td>
          </tr>
        ) : activitesData?.length > 0 ? (
          activitesData?.map((activity, index) => (
            <tr
              key={index}
              className="border-b border-[#202b34]"
              onClick={() =>
                navigate(`/admin/home/readActivity/${activity?.watch_id}`)
              }
            >
              <td className="px-[18px] py-[0px] text-[#ffff] text-center">
                <div className="w-[35px]">
                  {getImageSrc(activity) && (
                    <a
                      href={`/admin/home/readActivity/${activity?.id}/${activity?.watch_id}`}
                      role="button"
                    >
                      <img alt="img" src={getImageSrc(activity)} width="35px" />
                    </a>
                  )}
                </div>
              </td>
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center">
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

              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black cursor-pointer">
                <Tooltip
                  title={activity.from ? activity.from : "-"}
                  placement="top"
                  arrow
                >
                  <div className="w-[77px] text-center">
                    {activity.from ? activity.from : "-"}
                  </div>
                </Tooltip>
              </td>

              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap cursor-pointer">
                <Tooltip
                  title="Rolex Daytona Stainless Steel - Bracelet - Serial: 43141331 - Year: 2019 - Last requested/quoted price: USD "
                  placement="top"
                  arrow
                >
                  {activity.message} {activity?.watch_details?.brand && "( "}
                  {activity?.watch_details?.brand}{" "}
                  {activity?.watch_details?.model_no}{" "}
                  {activity?.watch_details?.model_no && "Serial -"}{" "}
                  {activity?.watch_details?.serial_no}
                  {activity?.watch_details?.model_no && "- Year :"}{" "}
                  {activity?.watch_details?.year_of_production}{" "}
                  {activity?.watch_details?.model_no &&
                    "- Last requested/quoted price: USD"}{" "}
                  {activity?.watch_details?.price}
                  {activity?.watch_details?.brand && ")"}
                </Tooltip>
              </td>
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center">
                {activity?.watch_id}
              </td>
              <td className="px-[18px] py-[10px] dark:text-[#ffffff] text-black text-center whitespace-nowrap">
                {activity?.watch_status}
              </td>
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                {`${
                  activity.created_on
                    ? moment
                        .unix(activity.created_on)
                        .format("MMMM D, YYYY h:mm A")
                    : "-"
                }`}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={12}
              className="py-[200px] px-4  text-center text-nowrap dark:text-[#ffff] text-black font-bold"
            >
              No Data Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StaffTable;
