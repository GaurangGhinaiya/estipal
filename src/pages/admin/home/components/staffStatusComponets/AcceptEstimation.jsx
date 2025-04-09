import React from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";
import {
  getClassPartnerSeller,
  getClassSelfSeller,
} from "../../../../../utils";
import { useTranslation } from "react-i18next";

const AcceptEstimation = (props) => {
  const { t } = useTranslation();
  return (
    <div className="message_box_inner">
      <h3 className="up-arrow">
        <span></span>
        {/* 137 */}
        {t("ACCEPTESTIMATION")} ({props?.accepted_price})
      </h3>
      <h3>{t("STATUS")}: {t("ACCEPTEDDEALINPROGRESS")}</h3> {/* 138 */}
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
              id="openShipAdminPopup"
              name={props?.item?.watch_details.watch_id}
              className={
                props?.item?.seller_action_flag === 1 ? "inactiveLink" : ""
              }
            >
              <button
                className={getClassSelfSeller(
                  props?.item?.seller_action_flag,
                  props?.item?.self_selling_flag
                )}
              >
                {t("SELLESTIPAL")} {/* 141 */}
              </button>
            </li>
            <li
              id="openPartnerPopup"
              name={props?.item?.watch_details.watch_id}
              value={props?.accepted_price}
              className={
                props?.item?.seller_action_flag === 1 ? "inactiveLink" : ""
              }
            >
              <button
                className={getClassPartnerSeller(
                  props?.item?.seller_action_flag,
                  props?.item?.seller_partnership_date
                )}
              >
                {t("BEPARTNERWITHESTIPAL")} {/* 142 */}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AcceptEstimation;
