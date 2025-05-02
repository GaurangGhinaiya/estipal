//checked

import React, { useState } from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";
import axiosInstance from "../../../../../services";
import { toast } from "react-hot-toast";
import ConfirmDialog from "../../../../../components/common/ConfirmDialog";

const ConfirmShipmentEstipal = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [actionType, setActionType] = useState(null);

  const handleAction = async (isRequestSellingPrice, isReturn) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const url = isReturn
        ? `/sellers/confirmShipmentEstipalReturnSeller?watch_id=${
            props?.item?.watch_details?.watch_id || props?.item?.watch_id
          }`
        : `/sellers/confirmShipmentEstipal?watch_id=${
            props?.item?.watch_details?.watch_id || props?.item?.watch_id
          }`;

      const requestData = isReturn
        ? { seller_id: props?.item?.user1_id }
        : { isRequestSellingPrice, seller_id: props?.item?.user1_id };

      const response = await axiosInstance.post(url, requestData);

      // toast.success(response?.message);
      toast.success(
        isReturn
          ? "Shipment returned to seller successfully!"
          : "Shipment confirmed successfully!"
      );
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
      setDialogOpen(false);
    }
  };

  const handleOpenDialog = (type) => {
    setActionType(type);
    if (type === "requestSellingPrice") {
      setDialogTitle("Confirm Purchase Completed (Request Selling Price)");
      setDialogContent(
        "Are you sure you want to confirm the purchase completed and request the selling price?"
      );
    } else if (type === "purchaseCompleted") {
      setDialogTitle("Confirm Purchase Completed");
      setDialogContent(
        "Are you sure you want to confirm the purchase completed?"
      );
    } else if (type === "returnToSeller") {
      setDialogTitle("Confirm Return to Seller");
      setDialogContent(
        "Are you sure you want to return the shipment to the seller?"
      );
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmDialog = () => {
    if (actionType === "requestSellingPrice") {
      handleAction(1, false);
    } else if (actionType === "purchaseCompleted") {
      handleAction(1, false);
    } else if (actionType === "returnToSeller") {
      handleAction(0, true);
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
                <li
                  className={`${
                    props?.item?.staffWatchActivityDetails
                      ?.confirm_acceptance_return_flag !== 0
                      ? "pointer-events-none"
                      : ""
                  }`}
                >
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
                    onClick={() => handleOpenDialog("requestSellingPrice")}
                    disabled={
                      isLoading ||
                      props?.item?.staffWatchActivityDetails
                        ?.confirm_acceptance_return_flag !== 0
                    }
                  >
                    Purchase Completed (Request Selling Price)
                  </button>
                </li>
                <li
                  className={`${
                    props?.item?.staffWatchActivityDetails
                      ?.confirm_acceptance_return_flag !== 0
                      ? "pointer-events-none"
                      : ""
                  }`}
                >
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
                    onClick={() => handleOpenDialog("purchaseCompleted")}
                    disabled={
                      isLoading ||
                      props?.item?.staffWatchActivityDetails
                        ?.confirm_acceptance_return_flag !== 0
                    }
                  >
                    Purchase Completed
                  </button>
                </li>
                <li
                  className={`${
                    props?.item?.staffWatchActivityDetails
                      ?.confirm_acceptance_return_flag !== 0
                      ? "pointer-events-none"
                      : ""
                  }`}
                >
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
                    onClick={() => handleOpenDialog("returnToSeller")}
                    disabled={
                      isLoading ||
                      props?.item?.staffWatchActivityDetails
                        ?.confirm_acceptance_return_flag !== 0
                    }
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
                <li
                  className={`${
                    props?.item?.staffWatchActivityDetails
                      ?.confirm_acceptance_return_flag !== 0
                      ? "pointer-events-none"
                      : ""
                  }`}
                >
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
                    onClick={() => handleOpenDialog("purchaseCompleted")}
                    disabled={
                      isLoading ||
                      props?.item?.staffWatchActivityDetails
                        ?.confirm_acceptance_return_flag !== 0
                    }
                  >
                    Confirm the payment and acceptance
                  </button>
                </li>
                <li
                  className={`${
                    props?.item?.staffWatchActivityDetails
                      ?.confirm_acceptance_return_flag !== 0
                      ? "pointer-events-none"
                      : ""
                  }`}
                >
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
                    onClick={() => handleOpenDialog("returnToSeller")}
                    disabled={
                      isLoading ||
                      props?.item?.staffWatchActivityDetails
                        ?.confirm_acceptance_return_flag !== 0
                    }
                  >
                    Return to Seller
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      <ConfirmDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirmDialog}
        title={dialogTitle}
        content={dialogContent}
        loading={isLoading}
      />
    </div>
  );
};

export default ConfirmShipmentEstipal;
