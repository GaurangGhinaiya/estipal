import React, { useState } from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";
import axiosInstance from "../../../../../services";
import { toast } from "react-hot-toast";

const ConfirmSold = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmPaidEstimator = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const watchId = props?.item?.watch_details?.watch_id;
      const url = `/adminActivity/confirmPaidEst?watch_id=${watchId}`;

      await axiosInstance.post(url);

      toast.success("Commission payment confirmed successfully!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
                  ? "inactiveLink"
                  : ""
              }
            >
              <button
                className={`btn ${
                  props?.item?.assignWatchDetails[0]?.paid === 1
                    ? "dark_green"
                    : "dark_yellow"
                }`}
                onClick={handleConfirmPaidEstimator}
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
    </div>
  );
};

export default ConfirmSold;
