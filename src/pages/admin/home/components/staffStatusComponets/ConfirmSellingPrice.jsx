import React from "react";

const ConfirmSellingPrice = (props) => {
  return (
    <div>
      {/* 167 */}
      <h3>
        The selling price confirmed by Estipal is {props?.confirmed_price}. Sale
        is pending
      </h3>
      {/* 131 */} {/* 168 */}
      <h3>Status: Pending Sale</h3>
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
            {/* 139 */}
            <span className="pending_status">Pending action:</span>
            {/* 140 */}
            <span>Select one of the below option</span>
          </p>
          <ul className="flex gap-3 flex-wrap justify-center items-center">
            <li
              id="confirmTheSale"
              className={props?.confirm_the_sale_flag ? "inactiveLink" : ""}
            >
              <button
                className={
                  props?.confirm_the_sale_flag
                    ? props?.confirm_the_sale_flag === 1
                      ? "btn dark_green"
                      : "btn dark_yellow"
                    : ""
                }
              >
                Confirm the sale {/* 169 */}
              </button>
            </li>
            <li
              //   id={
              //     new Date(value.time).getTime() + 30 * 24 * 60 * 60 * 1000 <=
              //     Date.now()
              //       ? "noSaleHasBeenMade"
              //       : "noSaleHasBeenMadeMsg"
              //   }
              name={value.watch_details.watch_id}
              value={props?.accepted_price}
              className={props?.confirm_the_sale_flag ? "inactiveLink" : ""}
            >
              <button
                className={
                  props?.confirm_the_sale_flag
                    ? props?.confirm_the_sale_flag === 2
                      ? "btn dark_green"
                      : "btn dark_yellow"
                    : ""
                }
              >
                No sale has been made {/* 170 */}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSellingPrice;
