import React from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";

const SellerInvoiceNew = (props) => {
  return (
    <div className="message_box_inner">
      {props?.item?.staffWatchActivityDetails?.payment_tier === 1 && (
        <>
          <h3>{`The payment of ${props?.accepted_price_with_commission} is required before receiving the watch.`}</h3>
          <h3>{`Status: ${props?.item?.watch_status}`}</h3>
          <div className="select_box text-center mt-20">
            <div className="select_box_inner !max-sm:p-[10px]">
              <p className="flex max-sm:flex-col items-center justify-center gap-[10px] mb-[10px]">
                <span>
                  <img
                    src={UrgentImage}
                    alt="Urgent"
                    className="w-[40px] block mx-auto"
                  />
                </span>
                <span className="pending_status">Pending Action:</span>
                <span>Confirmation is required</span>
              </p>
              <ul className="flex gap-3 flex-wrap justify-center items-center">
                <li
                  id="confirmPaymentToSeller"
                  name={props?.item?.watch_details?.watch_id}
                  value={props?.item?.user1_id}
                  className={
                    props?.item?.staffWatchActivityDetails
                      ?.confirm_payment_flag === 1
                      ? "inactiveLink"
                      : ""
                  }
                >
                  <a
                    href="javascript:void(0)"
                    className={`btn ${
                      props?.item?.staffWatchActivityDetails
                        ?.confirm_payment_flag === 1
                        ? "dark_green"
                        : "dark_yellow"
                    }`}
                  >
                    Confirm payment to Seller
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      {props?.item?.staffWatchActivityDetails?.payment_tier === 2 && (
        <>
          <h3>{`Shipment of the watch is pending. The payment of ${props?.accepted_price_with_commission} is due after receiving the watch.`}</h3>
          <h3>{`Status: ${props?.item?.watch_status}`}</h3>
        </>
      )}
    </div>
  );
};

export default SellerInvoiceNew;
