import React from "react";
import NImage from "../../../../../assets/images/icons/n.png";
import YImage from "../../../../../assets/images/icons/y.png";
import moment from "moment";
import { Button } from "@mui/material";
import { formattedNumber } from "../../../../../utils";

const EstimatorMultiQuotation = (props) => {
  const watchDetails = props?.item?.watch_details;
  const estDetails = watchDetails?.est_details || [];
  const currency_unit = props?.currency;

  const selectedEstimator = props?.item?.assignWatchDetails?.[0]?.estimator_id;
  const autoSelected = props?.adminActivitiesData.some(
    (item) => item.type === "admin_notify_est_quotation"
  );

  const passAllEstimator =
    props?.item?.staffEstimatorQuotationDeniedDetails?.length > 0 &&
    props?.item?.staffEstimatorQuotationDeniedDetails[0]?.watch_status ==
      "Pass";

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
          {estDetails?.map((value1) => {
            const estId = Number(value1?.est_id);

            return (
              <tr
                style={{
                  borderTop:
                    selectedEstimator == estId && autoSelected
                      ? "1px solid #ffffff"
                      : "",
                  borderBottom:
                    selectedEstimator == estId && autoSelected
                      ? "1px solid #ffffff"
                      : "",
                }}
                key={estId}
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
                        !selectedEstimator || !passAllEstimator
                          ? "inactiveLink"
                          : ""
                      }

                    ${
                      selectedEstimator == estId
                        ? autoSelected
                          ? "!bg-[darkgreen] !text-[#ffff]"
                          : "!bg-[#797c7f] !text-[#000]"
                        : !passAllEstimator
                        ? "!bg-[#797c7f] !text-[#000]"
                        : "!bg-[darkgreen] !text-[#ffff]"
                    }
                      }`}
                      // href={`/estimator_assignment/estimator_estimate_staff/${estId}/${value1?.watch_unique_id}/${value1?.estimated_watch_price}/${value1?.est_pass_flag}`}
                      style={{ minWidth: "130px" }}
                    >
                      {selectedEstimator == estId
                        ? autoSelected
                          ? "Auto Selected"
                          : "Selected"
                        : "Select estimate"}
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
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
              passAllEstimator || selectedEstimator ? "inactiveLink" : ""
            }
                ${
                  selectedEstimator
                    ? "!bg-[#797c7f] !text-[#000]"
                    : "!bg-[darkgreen] !text-[#ffff]"
                }
            }`}
            // href={`/estimator_assignment/estimator_estimate_staff/${props?.item?.watch_details.est_details[0]?.est_id}/${props?.item?.watch_details.est_details[0]?.watch_unique_id}/0/pass`}
          >
            {passAllEstimator ? "Passed all" : "Pass all estimate"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EstimatorMultiQuotation;
