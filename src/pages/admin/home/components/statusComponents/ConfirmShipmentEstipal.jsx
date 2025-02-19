import React from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";

const ConfirmShipmentEstipal = (props) => {
  return (
    <div className="message_box_inner ">
      {props?.item?.staffWatchActivityDetails?.payment_tier == 1 && (
        <>
          <h3>{`Shipment of the watch has been confirmed by the Seller.`}</h3>
          <h3>{`Status: ${props?.item?.watch_status}`}</h3>
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
                <span className="pending_status">Pending Action:</span>
                <span>Select one of the below option</span>
              </p>
              <ul className="flex gap-3 flex-wrap justify-center items-center">
                <li
                  id="confirmAndRequestSellingPrice"
                  name={props?.item?.watch_details?.watch_id}
                  value={props?.item?.user1_id}
                  className={
                    props?.item?.staffWatchActivityDetails
                      ?.confirm_acceptance_return_flag === 0
                      ? ""
                      : "inactiveLink"
                  }
                >
                  <a
                    className={`btn ${
                      props?.item?.staffWatchActivityDetails
                        ?.confirm_acceptance_return_flag === 0
                        ? "dark_yellow"
                        : props?.item?.staffWatchActivityDetails
                            ?.confirm_acceptance_return_flag === 1 &&
                          props?.item?.staffWatchActivityDetails
                            ?.request_est_price_flag === 1
                        ? "bg-[#006400] !border-none"
                        : "bg-[#d3d3d3] opacity-50 !text-black"
                    }`}
                  >
                    Purchase Completed (Request Selling Price)
                  </a>
                </li>
                <li
                  id="confirmTheAcceptance"
                  name={props?.item?.watch_details?.watch_id}
                  value={props?.item?.user1_id}
                  className={
                    props?.item?.staffWatchActivityDetails
                      ?.confirm_acceptance_return_flag === 0
                      ? ""
                      : "inactiveLink"
                  }
                >
                  <a
                    href="javascript:void(0)"
                    className={`btn ${
                      props?.item?.staffWatchActivityDetails
                        ?.confirm_acceptance_return_flag === 0
                        ? "dark_yellow"
                        : props?.item?.staffWatchActivityDetails
                            ?.confirm_acceptance_return_flag === 1 &&
                          props?.item?.staffWatchActivityDetails
                            ?.request_est_price_flag === 0
                        ? "bg-[#006400] !border-none"
                        : "bg-[#d3d3d3] opacity-50 !text-black"
                    }`}
                  >
                    Purchase Completed
                  </a>
                </li>
                <li
                  id="returnToSeller"
                  name={props?.item?.watch_details?.watch_id}
                  value={props?.item?.user1_id}
                  className={
                    props?.item?.staffWatchActivityDetails
                      ?.confirm_acceptance_return_flag === 0
                      ? ""
                      : "inactiveLink"
                  }
                >
                  <a
                    href="javascript:void(0)"
                    className={`btn ${
                      props?.item?.staffWatchActivityDetails
                        ?.confirm_acceptance_return_flag === 0
                        ? "dark_yellow"
                        : props?.item?.staffWatchActivityDetails
                            ?.confirm_acceptance_return_flag === 2
                        ? "bg-[#006400] !border-none"
                        : "bg-[#d3d3d3] opacity-50 !text-black"
                    }`}
                  >
                    Return to Seller
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      {props?.item?.staffWatchActivityDetails?.payment_tier == 2 && (
        <>
          <h3>{`Shipment of the watch has been confirmed by the Seller.`}</h3>
          <h3>{`Status: ${props?.item?.watch_status}`}</h3>
          <div className="select_box text-center mt-20">
            <div className="select_box_inner max-sm:!p-[10px]">
              <p className="flex max-sm:flex-col items-center justify-center gap-[10px] mb-[10px]">
                <span>
                  <img
                    src={UrgentImage}
                    alt="Urgent"
                    className="w-[40px] block mx-auto"
                  />
                </span>
                <span className="pending_status">Pending Action:</span>
                <span>Select one of the below option</span>
              </p>
              <ul className="flex gap-3 flex-wrap justify-center items-center">
                <li
                  id="confirmTheAcceptance"
                  name={props?.item?.watch_details?.watch_id}
                  value={props?.item?.user1_id}
                  className={
                    props?.item?.staffWatchActivityDetails
                      ?.confirm_acceptance_return_flag === 0
                      ? ""
                      : "inactiveLink"
                  }
                >
                  <a
                    href="javascript:void(0)"
                    className={`btn ${
                      props?.item?.staffWatchActivityDetails
                        ?.confirm_acceptance_return_flag === 0
                        ? "dark_yellow"
                        : props?.item?.staffWatchActivityDetails
                            ?.confirm_acceptance_return_flag === 1
                        ? "bg-[#006400] !border-none"
                        : "bg-[#d3d3d3] opacity-50 !text-black"
                    }`}
                  >
                    Confirm the payment and acceptance
                  </a>
                </li>
                <li
                  id="returnToSeller"
                  name={props?.item?.watch_details?.watch_id}
                  value={props?.item?.user1_id}
                  className={
                    props?.item?.staffWatchActivityDetails
                      ?.confirm_acceptance_return_flag === 0
                      ? ""
                      : "inactiveLink"
                  }
                >
                  <a
                    href="javascript:void(0)"
                    className={`btn ${
                      props?.item?.staffWatchActivityDetails
                        ?.confirm_acceptance_return_flag === 0
                        ? "dark_yellow"
                        : props?.item?.staffWatchActivityDetails
                            ?.confirm_acceptance_return_flag === 2
                        ? "bg-[#006400] !border-none"
                        : "bg-[#d3d3d3] opacity-50 !text-black"
                    }`}
                  >
                    Return to Seller
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConfirmShipmentEstipal;
