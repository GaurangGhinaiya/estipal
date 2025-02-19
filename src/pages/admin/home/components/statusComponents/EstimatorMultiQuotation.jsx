import React from "react";
import NImage from "../../../../../assets/images/icons/n.png";
import YImage from "../../../../../assets/images/icons/y.png";
import moment from "moment";
import { Button } from "@mui/material";
import { formattedNumber } from "../../../../../utils";

const EstimatorMultiQuotation = (props) => {
  const watchDetails = props?.item?.watch_details;
  const estDetails = watchDetails?.est_details || [];
  const currency_unit = props?.item?.currency_unit;
  const autoSelected = props?.item?.auto_selected;

  return (
    <div>
      <table className="table-auto w-full text-left">
        <thead style={{ borderBottom: "2px solid #111111" }}>
          <tr>
            <th className="px-[18px] py-[10px] text-white  cursor-pointer">
              Id
            </th>
            <th className="px-[18px] py-[10px] text-white  cursor-pointer">
              Company
            </th>
            <th className="px-[18px] py-[10px] text-white  cursor-pointer">
              First
            </th>
            <th className="px-[18px] py-[10px] text-white  cursor-pointer">
              Last
            </th>
            <th className="px-[18px] py-[10px] text-white  cursor-pointer text-center">
              Requires validation
            </th>
            <th className="px-[18px] py-[10px] text-white  cursor-pointer">
              Received
            </th>
            <th className="px-[18px] py-[10px] text-white  cursor-pointer">
              Estimate
            </th>
            <th className="px-[18px] py-[10px] text-white  cursor-pointer"></th>
          </tr>
        </thead>
        <tbody>
          {estDetails?.map((value1) => (
            <tr
              className={` ${
                autoSelected
                  ? "border-b border-t border-[#fff]"
                  : "border-b border-[#202b34]"
              } `}
              key={value1?.est_id}
            >
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black ">
                {value1?.est_id || "N/A"}
              </td>
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black ">
                {value1?.est_cpmpany || "N/A"}
              </td>
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black ">
                {value1?.first_name || "N/A"}
              </td>
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black ">
                {value1?.last_name || "N/A"}
              </td>
              <td className="px-[18px] py-[10px] flex justify-center dark:text-[#ffff] text-black ">
                <span>
                  {value1?.est_required_valid == 1 ? (
                    <img src={YImage} alt="valid" />
                  ) : (
                    <img src={NImage} alt="not valid" />
                  )}
                </span>
              </td>
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black">
                <span className="created_at_table">
                  {value1?.est_estimate_date
                    ? moment
                        .unix(value1?.est_estimate_date)
                        .format("MMMM DD , YYYY h:mm")
                    : "N/A"}
                </span>
              </td>
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black">
                {value1?.estimator_watch_status === "Pass"
                  ? value1?.estimator_watch_status
                  : value1?.estimated_watch_price
                  ? `${currency_unit} ${formattedNumber.format(
                      value1?.estimated_watch_price
                    )}`
                  : "N/A"}
              </td>
              <td style={{ textAlign: "right" }}>
                {value1?.estimator_watch_status !== "Pass" && (
                  <Button
                    className={`!normal-case ${
                      props?.item?.selected_estimator ||
                      props?.item?.pass_all_estimator
                        ? "inactiveLink"
                        : props?.item?.selected_estimator === value1?.est_id
                        ? autoSelected
                          ? "!bg-[darkgreen] !text-[#ffff]"
                          : "!bg-[lightGrey] !text-[#000]"
                        : props?.item?.pass_all_estimator
                        ? "!bg-[lightGrey] !text-[#000]"
                        : "!bg-[darkgreen] !text-[#ffff]"
                    }`}
                    // href={`/estimator_assignment/estimator_estimate_staff/${value1?.est_id}/${value1?.watch_unique_id}/${value1?.estimated_watch_price}/${value1?.est_pass_flag}`}
                    style={{ minWidth: "130px" }}
                  >
                    {props?.item?.selected_estimator === value1?.est_id
                      ? autoSelected
                        ? "Auto Selected"
                        : "Selected"
                      : "Select estimate"}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bottam_passall_box">
        <div className="flex justify-between items-center py-4">
          <h3 className="m-0 ellipsis">
            All estimates will be declined and no estimate is confirmed to
            Seller
          </h3>
          <Button
            style={{ minWidth: "130px" }}
            className={` !normal-case ${
              props?.item?.pass_all_estimator || props?.item?.selected_estimator
                ? "inactiveLink"
                : props?.item?.selected_estimator
                ? "!bg-[lightGrey] !text-[#000]"
                : "!bg-[darkgreen] !text-[#ffff]"
            }`}
            // href={`/estimator_assignment/estimator_estimate_staff/${props?.item?.watch_details.est_details[0]?.est_id}/${props?.item?.watch_details.est_details[0]?.watch_unique_id}/0/pass`}
          >
            {props?.item?.pass_all_estimator
              ? "Passed all"
              : "Pass all estimate"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EstimatorMultiQuotation;
