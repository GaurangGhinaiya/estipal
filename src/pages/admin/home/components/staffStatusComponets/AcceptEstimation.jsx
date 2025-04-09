import React from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";
import {
  getClassPartnerSeller,
  getClassSelfSeller,
} from "../../../../../utils";

const AcceptEstimation = (props) => {
  return (
    <div className="message_box_inner">
      <h3 className="up-arrow">
        {/* 137 */}
        Staff has accepted estimation of the watch ({props?.accepted_price})
      </h3>
      <h3>Status: Accepted - Deal in progress</h3> {/* 138 */}
      <div className="select_box text-center mt-20">
        <div className="select_box_inner !max-sm:p-[10px] white_select_box_inner">
          <p className="flex max-sm:flex-col items-center justify-center gap-[10px] mb-[10px]">
            <span>
              <img
                src={UrgentImage}
                alt="Urgent"
                className="w-[40px] block mx-auto"
              />
            </span>
            {/* 139 */}
            <span className="pending_status">Pending action:</span>
            {/* 140 */}
            <span>Select one of the below option</span>
          </p>
          <ul className="flex gap-3 flex-wrap justify-center items-center">
            <li
              id="openShipAdminPopup"
              name={props?.item?.watch_details.watch_id}
              className={
                props?.item?.staffWatchActivityDetails?.seller_action_flag === 1
                  ? "inactiveLink"
                  : ""
              }
            >
              <button
                className={getClassSelfSeller(
                  props?.item?.staffWatchActivityDetails?.seller_action_flag,
                  props?.item?.staffWatchActivityDetails?.self_selling_flag
                )}
              >
                Sell to Estipal {/* 141 */}
              </button>
            </li>
            <li
              id="openPartnerPopup"
              name={props?.item?.watch_details.watch_id}
              value={props?.accepted_price}
              className={
                props?.item?.staffWatchActivityDetails?.seller_action_flag === 1
                  ? "inactiveLink"
                  : ""
              }
            >
              <button
                className={getClassPartnerSeller(
                  props?.item?.staffWatchActivityDetails?.seller_action_flag,
                  props?.item?.staffWatchActivityDetails
                    ?.seller_partnership_date
                )}
              >
                Be partner with Estipal {/* 142 */}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AcceptEstimation;
