import React from "react";
import { CircularProgress, Tooltip } from "@mui/material";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import moment from "moment";
import GradeIcon from "@mui/icons-material/Grade";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Checkbox from "@mui/material/Checkbox";
import { useTranslation } from "react-i18next";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StaffTable = ({
  activitesData,
  isLoading,
  handleSort,
  sortField,
  sortOrder,
  navigate,
  getImageSrc,
  currency,
}) => {
  const { t } = useTranslation();
  return (
    <table className="table-auto w-full text-left">
      <thead style={{ borderBottom: "2px solid #111111" }}>
        <tr>
          {[
            { key: "checkbox", label: " " },
            { key: "from", label: `${t("FROM")}`, isSortable: true },
            { key: "message", label: `${t("MESSAGE")}`, isSortable: false },
            { key: "watchId", label: `${t("WATCHID")}`, isSortable: true },
            { key: "status", label: `${t("STATUS")}`, isSortable: true },
            { key: "received", label: `${t("RECEIVED")}`, isSortable: true },
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
          activitesData?.map((activity, index) => {
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
                className="border-b border-[#202b34]"
                onClick={() =>
                  navigate(`/admin/home/readActivity/${activity?.watch_id}`)
                }
              >
                <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center">
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
