import moment from "moment";
import React from "react";
import { getSubject } from "./GetSubject";
import BePartner from "./statusComponents/BePartner";
import ConfirmShipmentEstipal from "./statusComponents/ConfirmShipmentEstipal";
import ConfirmSold from "./statusComponents/ConfirmSold";
import ConfirmTheAcceptance from "./statusComponents/ConfirmTheAcceptance";
import ConfirmTheSale from "./statusComponents/ConfirmTheSale";
import EstimatorRquiedValidation from "./statusComponents/EstimatorRquiedValidation";
import SellerInvoice from "./statusComponents/SellerInvoice";
import SellerInvoiceNew from "./statusComponents/SellerInvoiceNew";
import EstimatorMultiQuotation from "./statusComponents/EstimatorMultiQuotation";

const CardData = (props) => {
  const { item, index, staffUser, adminActivitiesData, currency } = props;
  let prefix = "SCA";
  if (item?.admin_group === "estimator") {
    prefix = "ECA";
  } else if (item?.admin_group === "staff") {
    prefix = "UCA";
  }

  const formatPrice = (price) => {
    if (price && !isNaN(price)) {
      return `${currency || ""} ${Number(price)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    } else {
      return "";
    }
  };

  const watchDetails = item?.watch_details || {};
  const { brand, collection, model_no, serial_no } = watchDetails;

  const getWatchDetails = () =>
    `${brand || ""} ${collection || ""} ${model_no || ""} ${serial_no || ""}`;

  const getAcceptedPrice = () => {
    const priceKeys = [
      "accepted_price",
      "estimated_price_admin",
      "admin_counter_offer_price",
      "seller_view_request_price",
      "request_price",
      "seller_display_price",
      "seller_request_price",
      "admin_converted_price",
    ];
    for (const key of priceKeys) {
      if (item?.watch_details?.[key]) {
        return formatPrice(item?.watch_details?.[key]);
      }
    }
    return "";
  };

  const accepted_price = getAcceptedPrice();
  const commission_price = formatPrice(item?.watch_details?.commission_price);

  const confirmed_price = formatPrice(item?.watch_details?.confirmed_price);

  const input_confirmed_price = item?.watch_details?.confirmed_price;

  const accepted_price_with_commission = item?.watch_details
    ?.accepted_price_with_commission
    ? formatPrice(item?.watch_details?.accepted_price_with_commission)
    : accepted_price;

  const sold_price = formatPrice(item?.watch_details?.watch_sold_price);
  const input_sold_price = item?.watch_details?.watch_sold_price;

  const price_for_seller = item?.watch_details?.price_for_seller
    ? `${currency} ${item?.watch_details?.price_for_seller.toFixed(2)}`
    : accepted_price;

  const input_price_for_seller =
    item?.watch_details?.input_price_for_seller || accepted_price;

  const confirm_the_issuing_of_invoice_flag =
    item?.watch_details?.confirm_the_issuing_of_invoice_flag;

  const renderMessageBox = () => {
    const commonProps = {
      item,
      accepted_price,
      confirmed_price,
      commission_price,
      accepted_price_with_commission,
      sold_price,
      input_confirmed_price,
      input_sold_price,
      input_price_for_seller,
      price_for_seller,
      confirm_the_issuing_of_invoice_flag,
      adminActivitiesData,
      currency,
    };
    switch (item?.type) {
      case "accept_estimation":
      case "est_counter_offer_accept":
        return (
          <>
            <h3 className="up-arrow">
              <span></span>
              {item?.message} ({accepted_price})
            </h3>
            <h3>Status: {item?.watch_status}</h3>
          </>
        );
      case "estimator_quotation":
      case "counter_offer_1":
      case "est_re-estimate":
      case "counter_offer_2":
        return (
          <>
            <h3>
              {item?.message} ({accepted_price})
            </h3>
            <h3>Status: {item?.watch_status}</h3>
          </>
        );
      case "Be-Partner":
        return <BePartner {...commonProps} />;
      case "confirm_selling_price":
        return (
          <>
            <h3>
              The selling price of {confirmed_price} has been confirmed to the
              Seller. Sale is pending.
            </h3>
            <h3>Status: {item?.watch_status}</h3>
          </>
        );
      case "confirm_the_sale":
        return <ConfirmTheSale {...commonProps} />;
      case "confirm_the_issuing_of_invoice":
        return (
          <div className="message_box_inner">
            <h3>{`Invoice for the amount of ${commission_price} has been issued to Seller.`}</h3>
            <h3>{`Status: ${item?.watch_status}`}</h3>
          </div>
        );
      case "no_sale_has_been_made":
        return (
          <div className="message_box_inner">
            <h3>{item?.message}</h3>
            <h3>{`Status: ${item?.watch_status}`}</h3>
          </div>
        );
      case "seller_invoice_new":
        return <SellerInvoiceNew {...commonProps} />;
      case "seller_invoice":
        return <SellerInvoice {...commonProps} />;

      case "confirm_payment_seller":
        return (
          <div className="message_box_inner">
            <h3>{`The payment of ${accepted_price_with_commission} to the seller has been confirmed. Shipment of the watch is pending.`}</h3>
            <h3>{`Status: ${item?.watch_status}`}</h3>
          </div>
        );
      case "confirm_shipment_estipal":
        return <ConfirmShipmentEstipal {...commonProps} />;
      case "confirm_the_acceptance":
        return <ConfirmTheAcceptance {...commonProps} />;
      case "return_to_seller":
        return (
          <div className="message_box_inner">
            <h3>
              The sale has been rejected. The watch has to be returned to the
              Seller.
            </h3>
            <h3>Status: {item?.watch_status}</h3>
          </div>
        );
      case "confirm_sold":
        return <ConfirmSold {...commonProps} />;
      case "confirm_paid_estimator":
        return (
          <div className="message_box_inner">
            <h3>
              {"Commissions to estimator has been paid ("}
              {currency} {item?.estimator_watch_revenue?.toFixed(2)})
            </h3>
            <h3>Status: {item?.watch_status}</h3>
          </div>
        );
      case "admin_notify_est_quotation":
        return (
          <div className="message_box_inner">
            <h3>
              {item?.message} ({accepted_price})
            </h3>
            <h3>Status: N/A</h3>
          </div>
        );
      case "estimator_rquied_validation":
        return <EstimatorRquiedValidation {...commonProps} />;
      case "estimator_multi_quotation":
        return <EstimatorMultiQuotation {...commonProps} />;
      default:
        return (
          <div className="message_box_inner">
            <h3>
              {item?.message} ({accepted_price})
            </h3>
            <h3>Status: {item?.watch_status}</h3>
          </div>
        );
    }
  };

  const renderFrom = () => {
    if (
      item?.admin_group === "Estipal-Automated message" ||
      item?.admin_group === "Estipal-Administrator"
    ) {
      return (
        <h3 className="mb-3 capitalize">
          <strong>From: </strong>
          {item?.from_name}
        </h3>
      );
    } else if (
      item?.type === "estimation_rejected" &&
      item?.watch_details?.admin_action
    ) {
      return (
        <h3 className="mb-3 capitalize">
          <strong>From: </strong>
          Estipal Admin
        </h3>
      );
    } else if (
      item?.type === "estimation_rejected" &&
      item?.watch_details?.estipal_auto
    ) {
      return (
        <h3 className="mb-3 capitalize">
          <strong>From: </strong>
          Estipal-Automated message
        </h3>
      );
    } else if (
      item?.type === "estimation_expired" ||
      item?.type === "staff_response_time_expired"
    ) {
      return (
        <h3 className="mb-3 capitalize">
          <strong>From: </strong>
          Estipal response time limit rule
        </h3>
      );
    } else {
      return (
        <h3 className="mb-3 capitalize">
          <strong className="font-bold">From: </strong>

          {`${item?.company_name ?? ""} - ${item?.from_name ?? ""} `}
          <b className="font-bold">
            {`( ${item?.admin_group} - ID: ${prefix}${item?.user1_id} )`}
          </b>
        </h3>
      );
    }
  };

  return (
    <div
      key={index}
      className="mt-5 dark:bg-[#1E252B] bg-[#F8F8F8] dark:text-white text-black p-6 rounded-lg dark:shadow-lg shadow-none border border-gray-300 dark:border-none"
      style={{ border: "1px solid #ccc" }}
    >
      <div className="border_bottom pb-4">
        {getSubject(
          item,
          accepted_price,
          getWatchDetails,
          confirmed_price,
          commission_price,
          accepted_price_with_commission,
          sold_price
        )}
        <div className="flex justify-between items-center flex-wrap">
          {renderFrom()}
          <h3 className="mb-3">
            <strong className="font-bold">Received: </strong>
            <span className="created_at">
              {moment.unix(item?.created_on).format("MMMM DD , YYYY h:mm A")}
            </span>
          </h3>
        </div>
      </div>
      <hr
        className="my-5"
        style={{
          borderTopColor: staffUser ? "#DFDFDF" : "#ffffff1a",
          borderTopWidth: "2px",
        }}
      />
      <div className="message_box_inner">{renderMessageBox()}</div>
    </div>
  );
};

export default CardData;
