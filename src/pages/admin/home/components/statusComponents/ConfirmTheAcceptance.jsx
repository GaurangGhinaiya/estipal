//checked

import React, { useState } from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../../../services";
import ConfirmDialog from "../../../../../components/common/ConfirmDialog";

const ConfirmTheAcceptance = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const confirmedPrice = props?.input_sold_price
    ? props?.sold_price
    : props?.input_price_for_seller;

  const handleConfirmSold = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const url = `/adminActivity/confirmSold?watch_id=${
        props?.item?.watch_details?.watch_id || props?.item?.watch_id
      }`;
      const payload = { confirmed_price: confirmedPrice };

      const response = await axiosInstance.post(url, payload);

      // toast.success(response?.message);
      toast.success("Watch sale confirmed successfully!");
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
      setDialogOpen(false);
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="message_box_inner">
      <h3>
        {`Estipal Sold the watch (update to actual sale price) : `}
        <input
          type="text"
          style={{
            width: "130px",
            textAlign: "center",
            border: "2px solid #1760a9",
            borderRadius: "5px",
          }}
          className={`text-center bg-[#1d2b38] ${
            props?.item?.staffWatchActivityDetails?.admin_deal_done === 1
              ? "pointer-events-none"
              : ""
          }`}
          name="confirmed_sold_price"
          id="confirmed_sold_price"
          value={confirmedPrice}
          // onChange={(e) => setConfirmedPrice(e.target.value)}
        />
      </h3>
      <h3>Status: {props?.item?.watch_status}</h3>
      <div className="select_box text-center mt-20">
        <div className="select_box_inner max-sm:!p-[10px]">
          <p className="flex max-sm:flex-col items-center gap-[10px] mb-[10px]">
            <span>
              <img alt="urgent" src={UrgentImage} className="max-w-[40px]" />
            </span>
            <span className="pending_status">Pending Action:</span>
            <span>Confirmation is required</span>
          </p>
          <ul className="list-unstyled list-inline">
            <li
              className={
                props?.item?.staffWatchActivityDetails?.admin_deal_done === 1
                  ? "pointer-events-none"
                  : ""
              }
            >
              <button
                className={`btn ${
                  props?.item?.staffWatchActivityDetails?.admin_deal_done === 1
                    ? "dark_green"
                    : "dark_yellow"
                }`}
                onClick={handleOpenDialog}
                disabled={
                  isLoading ||
                  props?.item?.staffWatchActivityDetails?.admin_deal_done === 1
                }
              >
                {isLoading ? "Processing..." : "Confirm Sold"}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <ConfirmDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirmSold}
        title="Confirm Sold"
        content="Are you sure you want to confirm the sale?"
        loading={isLoading}
      />
    </div>
  );
};

export default ConfirmTheAcceptance;
