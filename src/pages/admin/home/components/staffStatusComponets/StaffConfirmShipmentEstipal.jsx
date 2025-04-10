import React from "react";
import { useTranslation } from "react-i18next";

const StaffConfirmShipmentEstipal = (props) => {
  const { t } = useTranslation();
  return (
    <div className="message_box_inner">
      {props?.item?.staffWatchActivityDetails?.payment_tier === 1 && (
        <>
          {/* 161 */}
          <h3>
            {t("SHIPPINGCOMPPENDINGESTIPALACCTEXT")}
          </h3>
          {/* 131 */} {/* 163 */}
          <h3>{t("STATUS")}: {t("SHIPPEDTEXT")}</h3>
        </>
      )}

      {props?.item?.staffWatchActivityDetails?.payment_tier === 2 && (
        <>
          {/* 162 */}
          <h3>
            {t("SHIPPINGCOMPPENDINGPAYMENTESTIPALACCTEXT")}
          </h3>
          {/* 131 */} {/* 183 */}
          <h3>{t("STATUS")}: {t("SHIPPENTPENDINGPAYMENTTEXT")}</h3>
        </>
      )}
    </div>
  );
};

export default StaffConfirmShipmentEstipal;
