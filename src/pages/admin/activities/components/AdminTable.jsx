import React, { useEffect, useState } from "react";
import { CircularProgress, Tooltip } from "@mui/material";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import moment from "moment";
import GradeIcon from "@mui/icons-material/Grade";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../services";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AdminTable = ({
  activitesData,
  isLoading,
  handleSort,
  sortField,
  sortOrder,
  getImageSrc,
}) => {
  const [activitiesShowData, setActivitiesShowData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setActivitiesShowData(activitesData);
  }, [activitesData]);

  const handleRowClick = (watchId) => {
    navigate(`/admin/home/readActivity/${watchId}`);
    window.scrollTo(0, 0);
  };

  const handleStarClick = async (id, select) => {
    try {
      const response = await axiosInstance.post(
        `adminActivity/addSelectedFavorite?id=${id}`,
        {
          select,
        }
      );

      setActivitiesShowData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, star_selected_flag_admin: select } : item
        )
      );
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <table className="table-auto w-full text-left">
      <thead style={{ borderBottom: "2px solid #111111" }}>
        <tr>
          {[
            { key: "", label: "" },
            { key: "checkbox", label: "" },
            { key: "who", label: "Who", isSortable: true },
            { key: "from", label: "From", isSortable: true },
            { key: "user1_id", label: "ID", isSortable: true },
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
              className={`p-2 dark:text-[#ffff] text-nowrap text-black text-center ${
                column.isSortable ? "cursor-pointer" : ""
              } ${
                column.isSortable && sortField === column.key
                  ? "active-sorting"
                  : ""
              } ${
                column.isSortable && sortField !== column.key
                  ? "pr-5 sorting"
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
        {isLoading && activitiesShowData?.length === 0 ? (
          <tr>
            <td colSpan={12} className="py-[200px] px-4  text-center">
              <CircularProgress />
            </td>
          </tr>
        ) : activitiesShowData?.length > 0 ? (
          activitiesShowData?.map((activity, index) => (
            <tr
              key={index}
              className="border-b border-[#202b34] cursor-pointer"
              onClick={() => handleRowClick(activity?.watch_id)}
            >
              <td className="px-[18px] py-[0px] text-[#ffff] text-center">
                <div className="w-[35px]">
                  {getImageSrc(activity) && (
                    <img alt="img" src={getImageSrc(activity)} width="35px" />
                  )}
                </div>
              </td>
              <td
                className="px-[18px] py-[10px] text-[#ffff] text-center"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {" "}
                <Checkbox
                  {...label}
                  checked={activity?.star_selected_flag_admin}
                  onChange={(e) =>
                    handleStarClick(activity?.id, e.target.checked)
                  }
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
                {activity?.admin_group === "staff"
                  ? "(U)"
                  : activity?.admin_group === "estimator"
                  ? "(E)"
                  : activity?.admin_group === "seller"
                  ? "(S)"
                  : "(Admin)"}
              </td>
              <td className="px-[18px] py-[10px] text-[#ffff] cursor-pointer">
                <Tooltip
                  title={activity?.from_name ? activity?.from_name : "-"}
                  placement="top"
                  arrow
                >
                  <div className="w-[77px] text-center  min-w-[200px]">
                    {activity?.from_name
                      ? (activity?.company_name
                          ? activity?.company_name + " - "
                          : "") +
                          activity?.from_name.length >
                        16
                        ? (
                            (activity?.company_name
                              ? activity?.company_name + " - "
                              : "") + activity?.from_name
                          ).substring(0, 15) + "..."
                        : (activity?.company_name
                            ? activity?.company_name + " - "
                            : "") + activity?.from_name
                      : "-"}
                  </div>
                </Tooltip>
              </td>
              <td className="px-[18px] py-[10px] text-[#ffff] text-center">
                {activity?.user2_id && `UCA${activity?.user2_id}`}
              </td>
              <td className="px-[18px] py-[10px] text-[#ffff] whitespace-nowrap cursor-pointer">
                <Tooltip
                  title={`${activity?.watch_details?.brand && "( "}
                       ${activity?.watch_details?.brand}
                       ${activity?.watch_details?.collection}
                       ${activity?.watch_details?.model_no}
                       ${activity?.watch_details?.model_no && "Serial -"}
                       ${activity?.watch_details?.serial_no}
                       ${activity?.watch_details?.model_no && "- Year :"}
                       ${activity?.watch_details?.year_of_production}
                       ${
                         activity?.watch_details?.model_no &&
                         "- Last requested/quoted price: USD"
                       }
                       ${activity?.watch_details?.admin_converted_price ?? 0}
                       ${activity?.watch_details?.brand && ")"}`}
                  placement="top"
                  arrow
                >
                  {activity.message} {activity?.watch_details?.brand && "( "}
                  {activity?.watch_details?.brand}{" "}
                  {activity?.watch_details?.collection}{" "}
                  {activity?.watch_details?.model_no}{" "}
                  {activity?.watch_details?.model_no && "Serial -"}{" "}
                  {activity?.watch_details?.serial_no}
                  {activity?.watch_details?.model_no && "- Year :"}{" "}
                  {activity?.watch_details?.year_of_production}{" "}
                  {activity?.watch_details?.model_no &&
                    "- Last requested/quoted price: USD"}{" "}
                  {activity?.watch_details?.admin_converted_price ?? 0}
                  {activity?.watch_details?.brand && ")"}
                </Tooltip>
              </td>
              <td className="px-[18px] py-[10px] text-[#ffff] text-center">
                W{activity?.watch_id}
              </td>
              <td className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap">
                {activity?.watch_status}
              </td>
              <td className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap">
                {`${
                  activity.created_on
                    ? moment
                        .unix(activity.created_on)
                        .format("MMMM DD, YYYY hh:mm A")
                    : "-"
                }  `}
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

export default AdminTable;
