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
import { useTranslate } from "../../../../language";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StaffTable = ({
  activitesData,
  isLoading,
  handleSort,
  sortField,
  sortOrder,
  getImageSrc,
  currency,
}) => {
  const [activitiesShowData, setActivitiesShowData] = useState([]);
  const navigate = useNavigate();
  const { translate } = useTranslate();

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
          item.id === id ? { ...item, star_selected_flag_seller: select } : item
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
            { key: "checkbox", label: " " },
            {
              key: "from",
              label: `${translate("FROM")}`,
              isSortable: true,
            },
            {
              key: "message",
              label: `${translate("MESSAGE")}`,
              isSortable: true,
            },
            {
              key: "watch_id",
              label: `${translate("WATCHID")}`,
              isSortable: true,
            },
            {
              key: "staff_watch_status",
              label: `${translate("STATUS")}`,
              isSortable: true,
            },
            {
              key: "created_on",
              label: `${translate("RECEIVED")}`,
              isSortable: true,
            },
          ].map((column) => (
            <th
              key={column.key}
              onClick={
                column.isSortable ? () => handleSort(column.key) : undefined
              }
              className={`py-2 px-[20px] dark:text-[#ffff] text-black text-center whitespace-nowrap cursor-pointer ${
                column.isSortable && sortField === column.key
                  ? "active-sorting"
                  : ""
              }  ${
                column.isSortable && sortField !== column.key ? "sorting" : ""
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
            <td colSpan={12} className="py-[200px] px-4 text-center">
              <CircularProgress />
            </td>
          </tr>
        ) : activitiesShowData?.length > 0 ? (
          activitiesShowData?.map((activity, index) => {
            let acceptedPrice = "";
            if (activity?.watch_details?.seller_display_accept) {
              acceptedPrice = `${currency} ${Number(
                activity.watch_details.seller_display_accept
              ).toFixed(2)}`;
            } else if (activity?.watch_details?.estimated_price_seller) {
              acceptedPrice = `${currency} ${Number(
                activity.watch_details.estimated_price_seller
              ).toFixed(2)}`;
            } else if (activity?.watch_details?.seller_display_counter) {
              acceptedPrice = `${currency} ${Number(
                activity.watch_details.seller_display_counter
              ).toFixed(2)}`;
            } else if (activity?.watch_details?.seller_view_request_price) {
              acceptedPrice = `${currency} ${Number(
                activity.watch_details.seller_view_request_price
              ).toFixed(2)}`;
            } else if (activity?.watch_details?.seller_display_price) {
              acceptedPrice = `${currency} ${Number(
                activity.watch_details.seller_display_price
              ).toFixed(2)}`;
            } else if (activity?.watch_details?.seller_request_price) {
              acceptedPrice = `${currency} ${Number(
                activity.watch_details.seller_request_price
              ).toFixed(2)}`;
            } else if (activity?.watch_details?.price) {
              acceptedPrice = `${currency} ${Number(
                activity.watch_details.price
              ).toFixed(2)}`;
            }

            const isActionRequired =
              activity?.watch_details?.is_action_required || "";

            return (
              <tr
                key={index}
                className={`border-b border-[#202b34] ${
                  activity?.seller_msg_read == 1 && "!font-semibold"
                }`}
                onClick={() =>
                  navigate(
                    `/admin/home/readActivity/${activity?.id}/${activity?.watch_id}`
                  )
                }
              >
                <td className="px-[18px] py-[0px] text-[#ffff] text-center">
                  <div className="w-[35px]">
                    {getImageSrc(activity) && (
                      <img alt="img" src={getImageSrc(activity)} width="35px" />
                    )}
                  </div>
                </td>
                <td
                  className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Checkbox
                    {...label}
                    checked={activity?.star_selected_flag_seller}
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
                <td className="px-[18px] py-[10px] dark:text-[#ffffff] text-black text-center whitespace-nowrap">
                  {activity?.admin_group == "staff"
                    ? activity?.from_name
                    : activity?.admin_group}
                </td>

                <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap cursor-pointer">
                  <Tooltip
                    title={
                      <>
                        {" "}
                        {activity.message}{" "}
                        {activity?.watch_details?.brand && "( "}
                        {activity?.watch_details?.brand}{" "}
                        {activity?.watch_details?.model_no}{" "}
                        {activity?.watch_details?.model_no && "Serial -"}{" "}
                        {activity?.watch_details?.serial_no}
                        {activity?.watch_details?.model_no && "- Year :"}{" "}
                        {activity?.watch_details?.year_of_production}{" "}
                        {activity?.watch_details?.model_no &&
                          "- Last requested/quoted price: "}{" "}
                        {acceptedPrice}
                        {activity?.watch_details?.brand && ")"}
                      </>
                    }
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
                      "- Last requested/quoted price: "}{" "}
                    {acceptedPrice}
                    {activity?.watch_details?.brand && ")"}
                  </Tooltip>
                </td>
                <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center">
                  W{activity?.watch_id}
                </td>
                <td className="px-[18px] py-[10px] dark:text-[#ffffff] text-black text-center whitespace-nowrap">
                  {activity?.staffWatchActivityDetails?.watch_status}
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
            );
          })
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
