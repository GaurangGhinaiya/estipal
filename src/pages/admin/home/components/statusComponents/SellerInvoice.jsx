import React, { useState } from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";
import axiosInstance from "../../../../../services";
import { toast } from "react-hot-toast";

const SellerInvoice = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmPayment = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        `/sellers/confirmPaymentToSeller?watch_id=${props?.item?.watch_details?.watch_id}`,
        {
          seller_id: props?.item?.user1_id,
        }
      );

      toast.success("Payment confirmed successfully!");
    } catch (error) {
      toast.error("Failed to confirm payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="message_box_inner">
      {props?.item?.staffWatchActivityDetails?.payment_tier == 1 && (
        <>
          <h3>{`Seller has selected 'Sell to Estipal'. The payment of ${props?.accepted_price_with_commission} is required before receiving the watch.`}</h3>
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
                <span>Confirmation is required</span>
              </p>
              <ul className="flex gap-3 flex-wrap justify-center items-center">
                <li
                  id="confirmPaymentToSeller"
                  name={props?.item?.watch_details?.watch_id}
                  value={props?.item?.user1_id}
                  className={
                    props?.item?.staffWatchActivityDetails
                      ?.confirm_payment_flag === 1
                      ? "inactiveLink"
                      : ""
                  }
                >
                  <button
                    className={`btn ${
                      props?.item?.staffWatchActivityDetails
                        ?.confirm_payment_flag === 1
                        ? "bg-[#006400] !border-none"
                        : "dark_yellow"
                    }`}
                    onClick={handleConfirmPayment}
                    disabled={
                      isLoading ||
                      props?.item?.staffWatchActivityDetails
                        ?.confirm_payment_flag === 1
                    }
                  >
                    {isLoading ? "Processing..." : "Confirm payment to Seller"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      {props?.item?.staffWatchActivityDetails?.payment_tier == 2 && (
        <>
          <h3>{`Seller has selected 'Sell to Estipal'. Shipment of the watch is pending. The payment of ${props?.accepted_price_with_commission} is due after receiving the watch.`}</h3>
          <h3>{`Status: ${props?.item?.watch_status}`}</h3>
        </>
      )}
    </div>
  );
};

export default SellerInvoice;
