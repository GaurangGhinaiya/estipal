// checked
import React, { useState } from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";
import axiosInstance from "../../../../../services";
import toast from "react-hot-toast";
import ConfirmDialog from "../../../../../components/common/ConfirmDialog";
import { useTranslate } from "../../../../../language";

const ConfirmPaymentSeller = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { translate } = useTranslate();

  const handleConfirmShipment = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const url = `/adminActivity/sellerInvoiceNew?watch_id=${
        props?.item?.watch_details?.watch_id || props?.item?.watch_id
      }`;
      const response = await axiosInstance.post(url);

      // toast.success(response?.message || "Shipment confirmed successfully!");
      toast.success("Shipment confirmed successfully!");
      props.getDetailById();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to confirm shipment."
      );
    } finally {
      setIsLoading(false);
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
      {/* 157 */}
      <h3>
        {translate("CONFIRMPAYMENTSELLERONE").replace(
          "{accepted_price_with_commission}",
          props?.accepted_price_with_commission
        )}
      </h3>
      {/* 131 */} {/* 158 */}
      <h3>
        {translate("STATUS")}: {translate("PAIDPENDINGSHIPPING")}
      </h3>
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
            {/* 159 */}
            <span>{translate("CONFIRMATIONREQUIREDTEXT")}</span>
          </p>
          <ul className="flex gap-3 flex-wrap justify-center items-center">
            <li
              id="confirmShipmentToEstipal"
              name={props?.item?.watch_details?.watch_id}
              value={props?.item?.user1_id}
              className={
                props?.item?.staffWatchActivityDetails?.confirm_shipping === 1
                  ? "inactiveLink"
                  : ""
              }
            >
              <button
                className={`btn ${
                  props?.item?.staffWatchActivityDetails?.confirm_shipping === 1
                    ? "bg-[#006400] !border-none"
                    : "dark_yellow"
                }`}
                onClick={handleOpenDialog}
                disabled={isLoading}
              >
                {/* 160 */}
                {isLoading
                  ? "Processing..."
                  : translate("CONFIRMSHIPMENTESTIPALTEXT")}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <ConfirmDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirmShipment}
        title="Confirm shipment to Estipal"
        content=""
        type={"staff"}
        loading={isLoading}
      />
    </div>
  );
};

export default ConfirmPaymentSeller;
