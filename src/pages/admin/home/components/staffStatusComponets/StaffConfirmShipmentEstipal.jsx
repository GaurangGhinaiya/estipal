import React from "react";

import { translate, useTranslate } from "../../../../../language";

const StaffConfirmShipmentEstipal = (props) => {
  const { translate } = useTranslate();
  
  return (
    <div className="message_box_inner">
      {props?.item?.staffWatchActivityDetails?.payment_tier === 1 && (
        <>
          {/* 161 */}
          <h3>{translate("SHIPPINGCOMPPENDINGESTIPALACCTEXT")}</h3>
          {/* 131 */} {/* 163 */}
          <h3>
            {translate("STATUS")}: {translate("SHIPPEDTEXT")}
          </h3>
        </>
      )}

      {props?.item?.staffWatchActivityDetails?.payment_tier === 2 && (
        <>
          {/* 162 */}
          <h3>{translate("SHIPPINGCOMPPENDINGPAYMENTESTIPALACCTEXT")}</h3>
          {/* 131 */} {/* 183 */}
          <h3>
            {translate("STATUS")}: {translate("SHIPPENTPENDINGPAYMENTTEXT")}
          </h3>
        </>
      )}
    </div>
  );
};

export default StaffConfirmShipmentEstipal;
