import React from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";

const ConfirmTheAcceptance = (props) => {
  return (
    <div className="message_box_inner">
      <h3>
        {`Estipal Sold the watch (update to actual sale price) : `}
        <input
          type="text"
          style={{
            width: "130px",
            textAlign: "center",
            border: "2px solid #1760a9",
            borderRadius: "5px",
          }}
          className={`text-center bg-[#1d2b38]  ${
            props?.item?.staffWatchActivityDetails?.admin_deal_done === 1
              ? "pointer-events-none"
              : ""
          }`}
          name="confirmed_sold_price"
          id="confirmed_sold_price"
          value={
            props?.input_sold_price
              ? props?.sold_price
              : props?.input_price_for_seller
          }
        />
      </h3>
      <h3>Status: {props?.item?.watch_status}</h3>
      <div className="select_box text-center mt-20">
        <div className="select_box_inner max-sm:!p-[10px]">
          <p className="flex max-sm:flex-col items-center gap-[10px] mb-[10px]">
            <span>
              <img alt="urgent" src={UrgentImage} className="max-w-[40px]" />
            </span>
            <span className="pending_status">Pending Action:</span>
            <span>Confirmation is required</span>
          </p>
          <ul className="list-unstyled list-inline">
            <li
              // id="confirmSold"
              // name={props?.item?.watch_details?.watch_id}
              // value={props?.item?.user1_id}
              className={
                props?.item?.staffWatchActivityDetails?.admin_deal_done === 1
                  ? "pointer-events-none"
                  : ""
              }
            >
              <a
                className={`btn ${
                  props?.item?.staffWatchActivityDetails?.admin_deal_done === 1
                    ? "dark_green"
                    : "dark_yellow"
                }`}
                href="javascript:void(0)"
                // onClick={handleConfirmSold}
              >
                Confirm Sold
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTheAcceptance;
