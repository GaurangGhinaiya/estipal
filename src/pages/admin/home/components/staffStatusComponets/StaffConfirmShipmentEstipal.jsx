import React from "react";

const StaffConfirmShipmentEstipal = (props) => {
  return (
    <div className="message_box_inner">
      {props?.item?.staffWatchActivityDetails?.payment_tier === 1 && (
        <>
          {/* 161 */}
          <h3>
            Shipment of the watch has been confirmed. Waiting to receive Estipal
            acceptance
          </h3>
          {/* 131 */} {/* 163 */}
          <h3>Status: Shipped</h3>
        </>
      )}

      {props?.item?.staffWatchActivityDetails?.payment_tier === 2 && (
        <>
          {/* 162 */}
          <h3>
            Shipment of the watch has been confirmed. Waiting to receive Estipal
            payment and acceptance
          </h3>
          {/* 131 */} {/* 183 */}
          <h3>Status: Shipped / Pending Payment</h3>
        </>
      )}
    </div>
  );
};

export default StaffConfirmShipmentEstipal;
