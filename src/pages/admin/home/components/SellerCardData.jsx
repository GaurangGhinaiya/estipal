import moment from "moment";
import React from "react";
import { sellerGetSubject } from "./SellerGetSubject";
import AcceptEstimation from "./staffStatusComponets/AcceptEstimation";
import ConfirmPaymentSeller from "./staffStatusComponets/ConfirmPaymentSeller";
import ConfirmSellingPrice from "./staffStatusComponets/ConfirmSellingPrice";
import StaffConfirmShipmentEstipal from "./staffStatusComponets/StaffConfirmShipmentEstipal";
import StaffConfirmTheAcceptance from "./staffStatusComponets/StaffConfirmTheAcceptance";
import StaffSellerInvoice from "./staffStatusComponets/StaffSellerInvoice";
import StaffSellerInvoiceNew from "./staffStatusComponets/StaffSellerInvoiceNew";
import { translate } from "../../../../language";

const SellerCardData = (props) => {
  const { item, index, userRole, adminActivitiesData, currency } = props;

  let accepted_price = "";
  let accepted_price_with_commission = "";
  let price_for_seller = "";
  let confirmed_price = "";
  let input_confirmed_price = "";
  let confirm_the_sale_flag = "";
  let commission_price = "";

  if (item?.type !== "confirm_sold") {
    const watchDetails = item?.watch_details || {};
    if (watchDetails?.seller_display_accept) {
      accepted_price = `${currency} ${Number(
        watchDetails?.seller_display_accept
      )
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    } else if (watchDetails?.estimated_price_seller) {
      accepted_price = `${currency} ${Number(
        watchDetails?.estimated_price_seller
      )
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    } else if (watchDetails?.seller_display_counter) {
      accepted_price = `${currency} ${Number(
        watchDetails?.seller_display_counter
      )
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    } else if (watchDetails?.seller_view_request_price) {
      accepted_price = `${currency} ${Number(
        watchDetails?.seller_view_request_price
      )
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    } else if (watchDetails?.seller_display_price) {
      accepted_price = `${currency} ${Number(watchDetails?.seller_display_price)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    } else if (watchDetails?.seller_request_price) {
      accepted_price = `${currency} ${Number(watchDetails?.seller_request_price)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    } else if (watchDetails?.price) {
      accepted_price = `${currency} ${Number(watchDetails?.price)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    }

    accepted_price_with_commission =
      watchDetails?.accepted_price_with_commission
        ? `${currency} ${Number(watchDetails?.accepted_price_with_commission)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
        : accepted_price;

    price_for_seller = watchDetails?.price_for_seller
      ? `${currency} ${Number(watchDetails?.price_for_seller)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
      : accepted_price;

    if (watchDetails?.confirmed_price) {
      confirmed_price = `${currency} ${Number(watchDetails?.confirmed_price)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
      input_confirmed_price = watchDetails?.confirmed_price;
    }

    confirm_the_sale_flag = watchDetails?.confirm_the_sale_flag || "";

    commission_price = watchDetails?.commission_price
      ? `${currency} ${Number(watchDetails?.commission_price)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
      : "";
  }

  let prefix = "SCA";
  if (item?.admin_group === "estimator") {
    prefix = "ECA";
  } else if (item?.admin_group === "staff") {
    prefix = "UCA";
  }

  const watchDetails = item?.watch_details || {};
  const { brand, collection, model_no, serial_no } = watchDetails;

  const getWatchDetails = () =>
    `${brand || ""} ${collection || ""} ${model_no || ""} ${serial_no || ""}`;

  const renderMessageBox = () => {
    const commonProps = {
      item,
      accepted_price,
      confirmed_price,
      commission_price,
      accepted_price_with_commission,
      sold_price: "",
      input_confirmed_price,
      input_sold_price: "",
      input_price_for_seller: "",
      price_for_seller,
      confirm_the_issuing_of_invoice_flag: "",
      adminActivitiesData,
      currency,
      confirm_the_sale_flag,
    };
    switch (item?.type) {
      case "accept_estimation":
      case "est_counter_offer_accept":
        return <AcceptEstimation {...commonProps} />;
      case "estimator_quotation":
        return (
          <div className="message_box_inner">
            {/* 143 */}
            <h3>{`${translate("ESTIMATORQUOTATION")} (${accepted_price})`}</h3>
            {/* 131 */} {/* 144 */}
            <h3>{`${translate("STATUS")}: ${translate(
              "QUOTATIONRECEIVED"
            )}`}</h3>
          </div>
        );
      case "counter_offer_1":
        return (
          <div className="message_box_inner">
            {/* 147 */}
            <h3>{`${translate("COUNTEROFFER1")} (${accepted_price})`}</h3>
            {/* 148 */}
            <h3>{`${translate("STATUS")}: ${translate(
              "PENDINGFIRSTCOUNTEROFFER"
            )}`}</h3>
          </div>
        );
      case "est_re-estimate":
        return (
          <div className="message_box_inner">
            <h3>
              {item?.message ===
              "Estimator has placed his re-estimation on staff first counter offer"
                ? `${translate("ESTREESTIMATE1")}` // 149
                : `${translate("ESTREESTIMATE2")} `}{" "}
              {`(${accepted_price})`}
            </h3>{" "}
            {/* 153 */}
            {/* 150 */}
            <h3>{`${translate("STATUS")}: ${translate("REESTIMATE")}`}</h3>
          </div>
        );
      case "counter_offer_2":
        return (
          <div className="message_box_inner">
            {/* 151 */}
            <h3>{`${translate("COUNTEROFFER2")} (${accepted_price})`}</h3>{" "}
            {/* 152 */}
            <h3>{`${translate("STATUS")}: ${translate(
              "PENDINGSECONDCOUNTEROFFER"
            )}`}</h3>
          </div>
        );
      case "Be-Partner":
        return (
          <div className="message_box_inner">
            {/* 130 */}
            <h3>{`${translate("BEPARTNERTEXT")}`}</h3> {/* 132 */}
            <h3>{`${translate("STATUS")}: ${translate(
              "BEPARTNERSTATUSTEXT"
            )}`}</h3>
          </div>
        );
      case "confirm_selling_price":
        return <ConfirmSellingPrice {...commonProps} />;
      case "confirm_the_sale":
        return (
          <div className="message_box_inner">
            {/* 171 */}
            <h3>{`${translate("CONFIRMTHESALE")}`}</h3> {/* 250 */}
            <h3>{`${translate("STATUS")}: ${translate("COMPLETED")}`}</h3>
          </div>
        );
      case "confirm_the_issuing_of_invoice":
        return (
          <div className="message_box_inner">
            {/* 172 */}
            <h3>
              {translate("CONFIRMISSUEINVOICETEXTONE").replace(
                "{commission_price}",
                commission_price
              )}
            </h3>{" "}
            {/* 250 */}
            <h3>{`${translate("STATUS")}: ${translate("COMPLETED")}`}</h3>
          </div>
        );
      case "no_sale_has_been_made":
        return (
          <div className="message_box_inner">
            {/* 176 */}
            <h3>{`${translate("NOSALEHASEBEENMADETEXT")}`}</h3> {/* 177 */}
            <h3>{`${translate("STATUS")}: ${translate("NOTSOLD")}`}</h3>
          </div>
        );
      case "seller_invoice_new":
        return <StaffSellerInvoiceNew {...commonProps} />;
      case "seller_invoice":
        return <StaffSellerInvoice {...commonProps} />;

      case "confirm_payment_seller":
        return <ConfirmPaymentSeller {...commonProps} />;
      case "confirm_shipment_estipal":
        return <StaffConfirmShipmentEstipal {...commonProps} />;
      case "confirm_the_acceptance":
        return <StaffConfirmTheAcceptance {...commonProps} />;
      case "return_to_seller":
        return (
          <div className="message_box_inner">
            {/* 180 */}
            <h3>{`${translate("RETURNTOSELLER")}`}</h3> {/* 181 */}
            <h3>{`${translate("STATUS")}: ${translate(
              "REJECTEDSALEFORSELLERTEXT"
            )}`}</h3>
          </div>
        );
      case "confirm_sold":
        return (
          <div className="message_box_inner">
            {/* 251 */}
            <h3>{`${translate("DEALCOMPLETEDFORWATCHTEXT")}`}</h3> {/* 250 */}
            <h3>{`${translate("STATUS")}: ${translate("COMPLETED")}`}</h3>
          </div>
        );
      case "Quotation for Watch":
        return (
          <div className="message_box_inner">
            {/* 145 */}
            <h3>{`${translate("QUOTATIONFORWATCH")}`}</h3>
            {/* 146 */}
            <h3>{`${translate("STATUS")}: ${translate(
              "WAITINGFORQUOTATION"
            )}`}</h3>
          </div>
        );
      case "rejected":
        return (
          <div className="message_box_inner">
            {/* 185 */}
            <h3>{`${translate("REJECTED")}`}</h3>
            {/* 186 */}
            <h3>{`${translate("COMPLETED")}: ${translate("REJECTEDTEXT")}`}</h3>
          </div>
        );
      case "estimation_rejected":
        return (
          <div className="message_box_inner">
            {/* 189 */}
            <h3>{`${translate("ESTIMATIONREJECTED")}`}</h3>
            {/* 190 */}
            <h3>{`${translate("STATUS")}: ${translate("PASSTEXT")}`}</h3>
          </div>
        );

      default:
        return (
          <div className="message_box_inner">
            <h3>
              {item?.message} ({accepted_price})
            </h3>
            {/* 131 */}
            <h3>
              {translate("STATUS")}: {item?.watch_status}
            </h3>
          </div>
        );
    }
  };

  const renderFrom = () => {
    if (item?.admin_group === "staff") {
      if (item?.type === "staff_response_time_expired") {
        return (
          <h3 className="mb-0 sm:mb-3 capitalize">
            <span className="font-bold">{translate("FROM")}: </span>
            Estipal response time limit rule
          </h3>
        );
      } else {
        return (
          <h3 className="mb-0 sm:mb-3 capitalize">
            <span className="font-bold">{translate("FROM")}: </span>
            {item?.from_name
              ? item?.from_name.charAt(0).toUpperCase() +
                item?.from_name.slice(1)
              : ""}
          </h3>
        );
      }
    } else if (item?.admin_group === "Estipal-Administrator") {
      return (
        <h3 className="mb-0 sm:mb-3 capitalize">
          <span className="font-bold">{translate("FROM")}: </span>
          {translate("ESTIPALADMINISTRATOR")} {/* 211 */}
        </h3>
      );
    } else if (item?.admin_group === "estimator") {
      if (item?.type === "estimation_expired") {
        return (
          <h3 className="mb-0 sm:mb-3 capitalize">
            <span className="font-bold">{translate("FROM")}: </span>
            Estipal response time limit rule
          </h3>
        );
      } else {
        return (
          <h3 className="mb-0 sm:mb-3 capitalize">
            <span className="font-bold">{translate("FROM")}: </span>
            {translate("ESTIMATOR")} {/* 212 */}
          </h3>
        );
      }
    } else if (item?.admin_group === "seller") {
      return (
        <h3 className="mb-0 sm:mb-3 capitalize">
          <span className="font-bold">{translate("FROM")}: </span>
          {item?.from_name
            ? item?.from_name.charAt(0).toUpperCase() + item?.from_name.slice(1)
            : ""}
        </h3>
      );
    } else {
      return (
        <h3 className="mb-0 sm:mb-3 capitalize">
          <span className="font-bold">{translate("FROM")}: </span>
          {item?.admin_group
            ? item?.admin_group.charAt(0).toUpperCase() +
              item?.admin_group.slice(1)
            : ""}
        </h3>
      );
    }
  };

  return (
    <>
      {item?.type !== "confirm_sold" && (
        <div
          key={index}
          className="mt-5 dark:bg-[#1E252B] bg-[#F8F8F8] dark:text-white text-black p-6 rounded-lg dark:shadow-lg shadow-none border border-gray-300 dark:border-none"
          style={{ border: "1px solid #ccc" }}
        >
          <div className="border_bottom pb-4">
            {sellerGetSubject(
              item,
              accepted_price,
              getWatchDetails,
              confirmed_price,
              commission_price,
              accepted_price_with_commission,
              ""
            )}
            <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row">
              {renderFrom()}
              <h3 className="mb-3">
                <strong className="font-bold">{translate("RECEIVED")}: </strong>
                <span className="created_at">
                  {moment
                    .unix(item?.created_on)
                    .format("MMMM DD , YYYY h:mm A")}
                </span>
              </h3>
            </div>
          </div>
          <hr
            className="my-5"
            style={{
              borderTopColor: userRole === "staff" ? "#DFDFDF" : "#ffffff1a",
              borderTopWidth: "2px",
            }}
          />
          <div className="message_box_inner">{renderMessageBox()}</div>
        </div>
      )}
    </>
  );
};

export default SellerCardData;
