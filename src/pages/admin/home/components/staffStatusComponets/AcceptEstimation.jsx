//checked
import React, { useState } from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";
import {
  getClassPartnerSeller,
  getClassSelfSeller,
} from "../../../../../utils";
import ConfirmDialog from "../../../../../components/common/ConfirmDialog";
import axiosInstance from "../../../../../services";
import toast from "react-hot-toast";
import { translate } from "../../../../../language";

const AcceptEstimation = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sellDialogOpen, setSellDialogOpen] = useState(false);
  const [partnerDialogOpen, setPartnerDialogOpen] = useState(false);

  const handleConfirmSellToEstipal = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        `/adminActivity/sellToEstipal?watch_id=${
          props?.item?.watch_details?.watch_id || props?.item?.watch_id
        }`
      );
      toast.success("Successfully sold to Estipal!");
      // toast.success(response?.message);
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
      setSellDialogOpen(false);
    }
  };

  const handleConfirmBePartnerWithEstipal = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        `/adminActivity/bePartnerWithEstipal?watch_id=${
          props?.item?.watch_details?.watch_id || props?.item?.watch_id
        }`
      );
      toast.success("Successfully became a partner with Estipal!");
      // toast.success(response?.message);
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
      setPartnerDialogOpen(false);
    }
  };

  const handleOpenSellDialog = () => {
    setSellDialogOpen(true);
  };

  const handleCloseSellDialog = () => {
    setSellDialogOpen(false);
  };

  const handleOpenPartnerDialog = () => {
    setPartnerDialogOpen(true);
  };

  const handleClosePartnerDialog = () => {
    setPartnerDialogOpen(false);
  };

  return (
    <div className="message_box_inner">
      <h3 className="up-arrow">
        {/* 137 */}
        {translate("ACCEPTESTIMATION")} ({props?.accepted_price})
      </h3>
      <h3>
        {translate("STATUS")}: {translate("ACCEPTEDDEALINPROGRESS")}
      </h3>{" "}
      {/* 138 */}
      <div className="select_box text-center mt-20">
        <div className="select_box_inner !max-sm:p-[10px] white_select_box_inner">
          <p className="flex max-sm:flex-col items-center justify-center gap-[10px] mb-[10px]">
            <span>
              <img
                src={UrgentImage}
                alt="Urgent"
                className="w-[40px] block mx-auto"
              />
            </span>
            {/* 139 */}
            <span className="pending_status">
              {translate("PENDINGACTION")}:
            </span>
            {/* 140 */}
            <span>{translate("SELECTOPTIONBELOW")}</span>
          </p>
          <ul className="flex gap-3 flex-wrap justify-center items-center">
            <li
              id="openShipAdminPopup"
              name={props?.item?.watch_details.watch_id}
              className={
                props?.item?.staffWatchActivityDetails?.seller_action_flag === 1
                  ? "inactiveLink"
                  : ""
              }
            >
              <button
                className={getClassSelfSeller(
                  props?.item?.staffWatchActivityDetails?.seller_action_flag,
                  props?.item?.staffWatchActivityDetails?.self_selling_flag
                )}
                onClick={handleOpenSellDialog}
              >
                {translate("SELLESTIPAL")} {/* 141 */}
              </button>
            </li>
            <li
              id="openPartnerPopup"
              name={props?.item?.watch_details.watch_id}
              value={props?.accepted_price}
              className={
                props?.item?.staffWatchActivityDetails?.seller_action_flag === 1
                  ? "inactiveLink"
                  : ""
              }
            >
              <button
                className={getClassPartnerSeller(
                  props?.item?.staffWatchActivityDetails?.seller_action_flag,
                  props?.item?.staffWatchActivityDetails
                    ?.seller_partnership_date
                )}
                onClick={handleOpenPartnerDialog}
              >
                {translate("BEPARTNERWITHESTIPAL")} {/* 142 */}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <ConfirmDialog
        open={sellDialogOpen}
        handleClose={handleCloseSellDialog}
        handleConfirm={handleConfirmSellToEstipal}
        title="Sell to Estipal"
        content=""
        type="staff"
        loading={isLoading}
      />
      <ConfirmDialog
        open={partnerDialogOpen}
        handleClose={handleClosePartnerDialog}
        handleConfirm={handleConfirmBePartnerWithEstipal}
        title="Be Partner with Estipal"
        content=""
        type="staff"
        loading={isLoading}
      />
    </div>
  );
};

export default AcceptEstimation;
