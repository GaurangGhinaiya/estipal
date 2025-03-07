import React from "react";
import NImage from "../../../../../assets/images/icons/n.png";
import YImage from "../../../../../assets/images/icons/y.png";
import moment from "moment";
import { Button } from "@mui/material";

const EstimatorRquiedValidation = (props) => {
  const watchDetails = props?.item?.watch_details;
  const selectedEstimator = props?.item?.assignWatchDetails?.[0]?.estimator_id;

  const passAllEstimator =
    props?.item?.staffEstimatorQuotationDeniedDetails?.length > 0 &&
    props?.item?.staffEstimatorQuotationDeniedDetails[0]?.watch_status ==
      "Pass";

  return (
    <div>
      <table className="table-auto w-full text-left">
        <thead style={{ borderBottom: "2px solid #111111" }}>
          <tr>
            <th className="px-[18px] py-[10px] text-white cursor-pointer">
              Id
            </th>
            <th className="px-[18px] py-[10px] text-white cursor-pointer">
              Company
            </th>
            <th className="px-[18px] py-[10px] text-white cursor-pointer">
              First
            </th>
            <th className="px-[18px] py-[10px] text-white cursor-pointer">
              Last
            </th>
            <th className="px-[18px] py-[10px] text-white cursor-pointer text-center">
              Requires validation
            </th>
            <th className="px-[18px] py-[10px] text-white cursor-pointer">
              Received
            </th>
            <th className="px-[18px] py-[10px] text-white cursor-pointer">
              Estimate
            </th>
            <th className="px-[18px] py-[10px] text-white cursor-pointer"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[#202b34]">
            <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black">
              {watchDetails?.est_id || "N/A"}
            </td>
            <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black">
              {watchDetails?.est_cpmpany || "N/A"}
            </td>
            <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black">
              {watchDetails?.first_name || "N/A"}
            </td>
            <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black">
              {watchDetails?.last_name || "N/A"}
            </td>
            <td className="px-[18px] py-[10px] flex justify-center dark:text-[#ffff] text-black">
              <span>
                {watchDetails?.est_req_valid == 1 ? (
                  <img src={YImage} alt="valid" />
                ) : (
                  <img src={NImage} alt="not valid" />
                )}
              </span>
            </td>
            <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black">
              <span className="created_at_table">
                {watchDetails?.est_estimate_date
                  ? moment
                      .unix(watchDetails?.est_estimate_date)
                      .format("MMMM DD , YYYY h:mm")
                  : "N/A"}
              </span>
            </td>
            <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black">
              {props?.item?.watch_status === "pass"
                ? props?.item?.watch_status
                : props?.accepted_price}
            </td>
            <td style={{ textAlign: "right" }}>
              {props?.item?.watch_status !== "pass" && (
                <Button
                  className={`btn btn-primary  ${
                    !passAllEstimator && !selectedEstimator
                      ? "inactiveLink"
                      : ""
                  } ${
                    selectedEstimator === watchDetails?.est_id
                      ? "dark_green"
                      : ""
                  } ${
                    !selectedEstimator && passAllEstimator ? "light_grey" : ""
                  }
 `}
                  // href={`/estimator_assignment/estimator_estimate_staff/${watchDetails?.est_id}/${watchDetails?.watch_unique_id}/${watchDetails?.estimated_price_admin}/${watchDetails?.est_pass_flag}`}
                  style={{ minWidth: "130px" }}
                >
                  {selectedEstimator === watchDetails?.est_id
                    ? "Selected"
                    : "Select estimate"}
                </Button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EstimatorRquiedValidation;
