import React from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";

const ConfirmSold = (props) => {
  return (
    <div className="message_box_inner">
      <h3>Estipal sold the watch. This deal has been completed.</h3>
      <h3>Status: {props?.item?.watch_status}</h3>

      <div className="select_box text-center mt-20">
        <div className="select_box_inner max-sm:!p-[10px]">
          <p className="mb-[10px]">
            <span>
              <img
                src={UrgentImage}
                alt="urgent"
                className="w-[40px] block mx-auto"
              />
            </span>
          </p>
          <ul className="list-unstyled list-inline">
            <li
              id="confirmPaidEst"
              name={props?.item?.watch_details?.watch_id}
              value={props?.item?.user1_id}
              className={
                props?.item?.paid_estimator === 1 ? "inactiveLink" : ""
              }
            >
              <a
                className={`btn ${
                  props?.item?.paid_estimator === 1
                    ? "dark_green"
                    : "dark_yellow"
                }`}
                href="javascript:void(0)"
                // onClick={handleConfirmPaidEstimator}
              >
                Confirm commission payment
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSold;
