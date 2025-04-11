import React from "react";
import { useTranslation } from "react-i18next";

const StaffConfirmTheAcceptance = (props) => {
  const { t } = useTranslation();
  return (
    <div className="message_box_inner">
      {props?.item?.staffWatchActivityDetails?.payment_tier === 1 && (
        <>
          {/* 164 */}
          <h3>
            {t("ACCEPTDEALCOMPLETEDTEXT")}
          </h3>
          {/* 131 */} {/* 250 */}
          <h3>{t("STATUS")}: {t("COMPLETED")}</h3>
        </>
      )}

      {props?.item?.staffWatchActivityDetails?.payment_tier === 2 && (
        <>
          {/* 165 */}
          <h3>
            {t("PAYMENTACCEPTDEALCOMPLETEDTEXT")}
          </h3>
          {/* 131 */} {/* 184 */}
          <h3>{t("STATUS")}: {t("PAIDSOLDTEXT")}</h3>
        </>
      )}
    </div>
  );
};

export default StaffConfirmTheAcceptance;
