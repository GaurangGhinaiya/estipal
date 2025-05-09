import React from "react";

import { useTranslate } from "../../../../../language";

const StaffConfirmTheAcceptance = (props) => {
  const { translate } = useTranslate();

  return (
    <div className="message_box_inner">
      {props?.item?.staffWatchActivityDetails?.payment_tier === 1 && (
        <>
          {/* 164 */}
          <h3>{translate("ACCEPTDEALCOMPLETEDTEXT")}</h3>
          {/* 131 */} {/* 250 */}
          <h3>
            {translate("STATUS")}: {translate("COMPLETED")}
          </h3>
        </>
      )}

      {props?.item?.staffWatchActivityDetails?.payment_tier === 2 && (
        <>
          {/* 165 */}
          <h3>{translate("PAYMENTACCEPTDEALCOMPLETEDTEXT")}</h3>
          {/* 131 */} {/* 184 */}
          <h3>
            {translate("STATUS")}: {translate("PAIDSOLDTEXT")}
          </h3>
        </>
      )}
    </div>
  );
};

export default StaffConfirmTheAcceptance;
