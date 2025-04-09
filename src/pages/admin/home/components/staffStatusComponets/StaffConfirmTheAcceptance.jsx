import React from "react";

const StaffConfirmTheAcceptance = (props) => {
  return (
    <div className="message_box_inner">
      {props?.item?.staffWatchActivityDetails?.payment_tier === 1 && (
        <>
          {/* 164 */}
          <h3>
            Acceptance of the watch has been confirmed. This deal has been
            completed
          </h3>
          {/* 131 */} {/* 250 */}
          <h3>Status: Completed</h3>
        </>
      )}

      {props?.item?.staffWatchActivityDetails?.payment_tier === 2 && (
        <>
          {/* 165 */}
          <h3>
            Payment and acceptance of the watch has been confirmed. This deal
            has been completed
          </h3>
          {/* 131 */} {/* 184 */}
          <h3>Status: Paid / Sold</h3>
        </>
      )}
    </div>
  );
};

export default StaffConfirmTheAcceptance;
