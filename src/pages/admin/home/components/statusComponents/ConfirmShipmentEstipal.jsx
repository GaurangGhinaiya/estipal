import React, { useState } from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";
import axiosInstance from "../../../../../services";
import { toast } from "react-hot-toast";

const ConfirmShipmentEstipal = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (isRequestSellingPrice, isReturn) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const url = isReturn
        ? `/sellers/confirmShipmentEstipalReturnSeller?watch_id=${props?.item?.watch_details?.watch_id}`
        : `/sellers/confirmShipmentEstipal?watch_id=${props?.item?.watch_details?.watch_id}`;

      const requestData = isReturn
        ? { seller_id: props?.item?.user1_id }
        : { isRequestSellingPrice, seller_id: props?.item?.user1_id };

      await axiosInstance.post(url, requestData);

      toast.success(
        isReturn
          ? "Shipment returned to seller successfully!"
          : "Shipment confirmed successfully!"
      );
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="message_box_inner">
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
                <span>Select one of the below options</span>
              </p>
              <ul className="flex gap-3 flex-wrap justify-center items-center">
                <li>
                  <button
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
                    onClick={() => handleAction(1, false)}
                    disabled={isLoading}
                  >
                    Purchase Completed (Request Selling Price)
                  </button>
                </li>
                <li>
                  <button
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
                    onClick={() => handleAction(1, false)}
                    disabled={isLoading}
                  >
                    Purchase Completed
                  </button>
                </li>
                <li>
                  <button
                    className={`btn ${
                      props?.item?.staffWatchActivityDetails
                        ?.confirm_acceptance_return_flag === 0
                        ? "dark_yellow"
                        : props?.item?.staffWatchActivityDetails
                            ?.confirm_acceptance_return_flag === 2
                        ? "bg-[#006400] !border-none"
                        : "bg-[#d3d3d3] opacity-50 !text-black"
                    }`}
                    onClick={() => handleAction(0, true)}
                    disabled={isLoading}
                  >
                    Return to Seller
                  </button>
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
                <span>Select one of the below options</span>
              </p>
              <ul className="flex gap-3 flex-wrap justify-center items-center">
                <li>
                  <button
                    className={`btn ${
                      props?.item?.staffWatchActivityDetails
                        ?.confirm_acceptance_return_flag === 0
                        ? "dark_yellow"
                        : props?.item?.staffWatchActivityDetails
                            ?.confirm_acceptance_return_flag === 1
                        ? "bg-[#006400] !border-none"
                        : "bg-[#d3d3d3] opacity-50 !text-black"
                    }`}
                    onClick={() => handleAction(1, false)}
                    disabled={isLoading}
                  >
                    Confirm the payment and acceptance
                  </button>
                </li>
                <li>
                  <button
                    className={`btn ${
                      props?.item?.staffWatchActivityDetails
                        ?.confirm_acceptance_return_flag === 0
                        ? "dark_yellow"
                        : props?.item?.staffWatchActivityDetails
                            ?.confirm_acceptance_return_flag === 2
                        ? "bg-[#006400] !border-none"
                        : "bg-[#d3d3d3] opacity-50 !text-black"
                    }`}
                    onClick={() => handleAction(0, true)}
                    disabled={isLoading}
                  >
                    Return to Seller
                  </button>
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
