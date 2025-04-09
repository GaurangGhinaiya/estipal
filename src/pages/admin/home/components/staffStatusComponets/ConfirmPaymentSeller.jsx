import React, { useState } from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";
import axiosInstance from "../../../../../services";
import { toast } from "react-hot-toast";
import ConfirmDialog from "../../../../../components/common/ConfirmDialog";

const ConfirmPaymentSeller = (props) => {
  return (
    <div className="message_box_inner">
      {/* 157 */}
      <h3>
        Estipal confirmed the payment of {props?.accepted_price_with_commission}
        . Shipment of the watch to Estipal has to be arranged
      </h3>
      {/* 131 */} {/* 158 */}
      <h3>Status: Paid / Pending Shipping</h3>
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
            {/* 159 */}
            <span>Confirmation is required</span>
          </p>
          <ul className="flex gap-3 flex-wrap justify-center items-center">
            <li
              id="confirmShipmentToEstipal"
              name={props?.item?.watch_details?.watch_id}
              value={props?.item?.user1_id}
              className={
                props?.item?.staffWatchActivityDetails?.confirm_shipping === 1
                  ? "inactiveLink"
                  : ""
              }
            >
              <button
                className={`btn ${
                  props?.item?.staffWatchActivityDetails?.confirm_shipping === 1
                    ? "bg-[#006400] !border-none"
                    : "dark_yellow"
                }`}
              >
                {/* 160 */}
                Confirm shipment to Estipal
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPaymentSeller;
