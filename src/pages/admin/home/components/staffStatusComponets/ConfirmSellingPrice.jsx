// checked
import React, { useState } from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";
import axiosInstance from "../../../../../services";
import toast from "react-hot-toast";
import ConfirmDialog from "../../../../../components/common/ConfirmDialog";
import { useTranslate } from "../../../../../language";

const ConfirmSellingPrice = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [noSaleDialogOpen, setNoSaleDialogOpen] = useState(false);
  const { translate } = useTranslate();

  const confirmedPrice = props?.input_confirmed_price
    ? props?.input_confirmed_price
    : props?.price_for_seller;

  const handleConfirmSale = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const url = `/adminActivity/confirmTheSale?watch_id=${
        props?.item?.watch_details?.watch_id || props?.item?.watch_id
      }`;
      const payload = { confirmed_price: confirmedPrice };

      const response = await axiosInstance.post(url, payload);
      // toast.success(response?.message);
      toast.success("The sale has been successfully confirmed!");
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
      setDialogOpen(false);
    }
  };

  const handleNoSale = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const url = `/staffWatchActivities/noSaleHasBeenMade`;
      const payload = {
        watch_id: props?.item?.watch_details?.watch_id || props?.item?.watch_id,
      };

      const response = await axiosInstance.post(url, payload);
      toast.success("No Sale action has been successfully recorded!");
      window.location.reload();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to record No Sale action."
      );
    } finally {
      setIsLoading(false);
      setNoSaleDialogOpen(false);
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenNoSaleDialog = () => {
    setNoSaleDialogOpen(true);
  };

  const handleCloseNoSaleDialog = () => {
    setNoSaleDialogOpen(false);
  };

  return (
    <div>
      {/* 167 */}
      <h3>
        {translate("CONFIRMSELLINGPRICETEXT").replace(
          "{props?.confirmed_price}",
          props?.confirmed_price
        )}
      </h3>
      {/* 131 */} {/* 168 */}
      <h3>
        {translate("STATUS")}: {translate("PENDINGSALE")}
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
            {/* 140 */}
            <span>{translate("SELECTOPTIONBELOW")}</span>
          </p>
          <ul className="flex gap-3 flex-wrap justify-center items-center">
            <li
              id="confirmTheSale"
              className={props?.confirm_the_sale_flag ? "inactiveLink" : ""}
            >
              <button
                className={
                  props?.confirm_the_sale_flag
                    ? props?.confirm_the_sale_flag === 1
                      ? "btn dark_green"
                      : "btn dark_yellow"
                    : "text-[#3c8dbc]"
                }
                onClick={handleOpenDialog}
              >
                {translate("CONFIRMTHESALE1")} {/* 169 */}
              </button>
            </li>
            <li
              // id={
              //   new Date(props?.item?.time).getTime() +
              //     30 * 24 * 60 * 60 * 1000 <=
              //   Date.now()
              //     ? "noSaleHasBeenMade"
              //     : "noSaleHasBeenMadeMsg"
              // }
              name={props?.item?.watch_details.watch_id}
              value={props?.accepted_price}
              className={props?.confirm_the_sale_flag ? "inactiveLink" : ""}
            >
              <button
                className={
                  props?.confirm_the_sale_flag
                    ? props?.confirm_the_sale_flag === 2
                      ? "btn dark_green"
                      : "btn dark_yellow"
                    : "text-[#3c8dbc]"
                }
                onClick={handleOpenNoSaleDialog}
              >
                {translate("NOSALEFOUND")} {/* 170 */}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <ConfirmDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirmSale}
        title="Confirm the sale"
        content=""
        type={"staff"}
        loading={isLoading}
      />
      <ConfirmDialog
        open={noSaleDialogOpen}
        handleClose={handleCloseNoSaleDialog}
        handleConfirm={handleNoSale}
        title="No Sale Found"
        content="Are you sure you want to record this as No Sale?"
        type={"staff"}
        loading={isLoading}
      />
    </div>
  );
};

export default ConfirmSellingPrice;
