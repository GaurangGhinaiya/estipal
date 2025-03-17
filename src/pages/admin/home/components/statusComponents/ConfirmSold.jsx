import React, { useState } from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";
import axiosInstance from "../../../../../services";
import { toast } from "react-hot-toast";
import ConfirmDialog from "../../../../../components/common/ConfirmDialog";

const ConfirmSold = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConfirmPaidEstimator = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const watchId = props?.item?.watch_details?.watch_id;
      const url = `/adminActivity/confirmPaidEst?watch_id=${watchId}`;

      await axiosInstance.post(url);

      toast.success("Commission payment confirmed successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
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
                props?.item?.assignWatchDetails[0]?.paid === 1
                  ? "pointer-events-none"
                  : ""
              }
            >
              <button
                className={`btn ${
                  props?.item?.assignWatchDetails[0]?.paid === 1
                    ? "dark_green"
                    : "dark_yellow"
                }`}
                onClick={handleOpenDialog}
                disabled={
                  isLoading || props?.item?.assignWatchDetails[0]?.paid === 1
                }
              >
                {isLoading ? "Processing..." : "Confirm commission payment"}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <ConfirmDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirmPaidEstimator}
        title="Confirm Commission Payment"
        content="Are you sure you want to confirm the commission payment?"
      />
    </div>
  );
};

export default ConfirmSold;
