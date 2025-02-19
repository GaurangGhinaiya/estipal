import React from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";

const ConfirmTheSale = (props) => {
  return (
    <>
      <h3>
        The sale has been confirmed by the Seller. Invoice for the amount of{" "}
        {props?.commission_price} can be issued to the Seller.
      </h3>
      <h3>Status: {props?.item?.watch_status}</h3>
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
              id="confirmTheIssuingOfInvoice"
              name={props?.item?.watch_details?.watch_id}
              value={props?.item?.user1_id}
              className={
                props?.confirm_the_issuing_of_invoice_flag ? "inactiveLink" : ""
              }
            >
              <a
                href="javascript:void(0)"
                className={`btn ${
                  props?.confirm_the_issuing_of_invoice_flag
                    ? "dark_green"
                    : "dark_yellow"
                }`}
              >
                Confirm the issuing of invoice
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ConfirmTheSale;
