import React from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";

const BePartner = (props) => {
  return (
    <>
      <h3>
        Seller has selected 'Be partner with Estipal'. Confirm selling price to
        Seller:
        <input
          type="text"
          style={{ width: "130px", textAlign: "center" }}
          className={`text-center watch-desc-input ${
            props?.input_confirmed_price ? "not_changed" : ""
          }`}
          name="confirmed_price"
          id="confirmed_price"
          value={props?.input_confirmed_price}
          // onChange={handleConfirmPriceChange}
        />{" "}
        {props?.item?.currency_unit}
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
              />{" "}
            </span>
            <span className="pending_status">Pending Action:</span>
            <span>Confirmation is required</span>
          </p>
          <ul className="list-unstyled list-inline">
            <li
              id="confirmSellingPrice"
              name={props?.item?.watch_details?.watch_id}
              value={props?.item?.user1_id}
              className={props?.input_confirmed_price ? "inactiveLink" : ""}
            >
              <a
                href="javascript:void(0)"
                className={`btn ${
                  props?.input_confirmed_price ? "dark_green" : "dark_yellow"
                }`}
              >
                Confirm selling price
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BePartner;
