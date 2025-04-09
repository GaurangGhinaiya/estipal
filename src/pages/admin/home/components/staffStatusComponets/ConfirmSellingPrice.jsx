import { t } from "i18next";
import React from "react";

const ConfirmSellingPrice = (props) => {
  return (
    <div>
      {/* 167 */}
      <h3>
        {t("CONFIRMSELLINGPRICETEXT").replace(
          "{props?.confirmed_price}",
          props?.confirmed_price
        )}
      </h3>
      {/* 131 */} {/* 168 */}
      <h3>{t("STATUS")}: {t("PENDINGSALE")}</h3>
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
            <span className="pending_status">{t("PENDINGACTION")}:</span>
            {/* 140 */}
            <span>{t("SELECTOPTIONBELOW")}</span>
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
                {t("CONFIRMTHESALE")} {/* 169 */}
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
                {t("NOSALEFOUND")} {/* 170 */}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSellingPrice;
