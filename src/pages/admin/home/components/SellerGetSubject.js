const userRole = localStorage.getItem("userRole");

export const sellerGetSubject = (
  t,
  item,
  accepted_price,
  getWatchDetails,
  confirmed_price,
  commission_price,
  accepted_price_with_commission,
  sold_price
) => {

  const watchDetails = item?.watch_details || {};
  const brandDetails = `${watchDetails.brand || ""} ${watchDetails.collection || ""
    } ${watchDetails.model_no || ""} ${watchDetails.serial_no || ""}`;

  if (item?.type === "Be-Partner") {
    // 130
    //SUBJECT;95
    //FROM:68
    return (
      <h3 className="m-0">
        <span className="!font-bold">{t("SUBJECT")}:</span> {t("BEPARTNERTEXT")} (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "confirm_selling_price") {
    //167
    return (
      <h3 className="m-0">
        <span className="!font-bold">{t("SUBJECT")}:</span> {t("CONFIRMSELLINGPRICETEXT1")}{" "}
        {confirmed_price}. {t("CONFIRMSELLINGPRICETEXT2")} (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "confirm_the_sale") {
    //171
    return (
      <h3 className="m-0">
        <span className="!font-bold">{t("SUBJECT")}:</span> {t("CONFIRMTHESALE")} ({`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "confirm_the_issuing_of_invoice") {
    //172
    return (
      <h3 className="m-0">
        <span className="!font-bold">{t("SUBJECT")}:</span> {t("CONFIRMISSUEINVOICETEXT")}{" "}
        {commission_price} ({`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "no_sale_has_been_made") {
    //176
    return (
      <h3 className="m-0">
        <span className="!font-bold">{t("SUBJECT")}:</span> {t("NOSALEHASEBEENMADETEXT")} ({`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "seller_invoice_new") {
    if (item?.staffWatchActivityDetails?.payment_tier === 1) {
      //178
      return (
        <h3 className="m-0">
          <span className="!font-bold">{t("SUBJECT")}:</span>{" "}
          {t("SELLERINVOICENEWTIER1TEXT").replace(
            "{accepted_price_with_commission}",
            accepted_price_with_commission
          )}{" "}
          ({`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    } else if (item?.staffWatchActivityDetails?.payment_tier === 2) {
      //179
      return (
        <h3 className="m-0">
          <span className="!font-bold">{t("SUBJECT")}:</span> {t("SELLERINVOICENEWTIER2TEXT").replace(
            "{accepted_price_with_commission}",
            accepted_price_with_commission
          )}({`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    }
  } else if (item?.type === "seller_invoice") {
    if (item?.staffWatchActivityDetails?.payment_tier === 1) {
      // 154
      return (
        <h3 className="m-0">
          <span className="!font-bold">{t("SUBJECT")}:</span> {t("SELLERINVOICETIER1TEXT").replace(
            "{accepted_price_with_commission}",
            accepted_price_with_commission
          )} (
          {`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    } else if (item?.staffWatchActivityDetails?.payment_tier === 2) {
      // 155
      return (
        <h3 className="m-0">
          <span className="!font-bold">{t("SUBJECT")}:</span> {t("SELLERINVOICETIER2TEXT").replace(
            "{accepted_price_with_commission}",
            accepted_price_with_commission
          )}
          ({`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    }
  } else if (item?.type === "confirm_payment_seller") {
    // 157
    return (
      <h3 className="m-0">
        <span className="!font-bold">{t("SUBJECT")}:</span>  {t("CONFIRMPAYMENTSELLER").replace(
          "{accepted_price_with_commission}",
          accepted_price_with_commission
        )} ({`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "confirm_shipment_estipal") {
    if (item?.staffWatchActivityDetails?.payment_tier === 1) {
      //161
      return (
        <h3 className="m-0">
          <span className="!font-bold">{t("SUBJECT")}:</span> {t("CONFIRMSHIPMENTESTIPALTIER1")} (
          {`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    } else if (item?.staffWatchActivityDetails?.payment_tier === 2) {
      //162
      return (
        <h3 className="m-0">
          <span className="!font-bold">{t("SUBJECT")}:</span> {t("CONFIRMSHIPMENTESTIPALTIER2")} (
          {`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    }
  } else if (item?.type === "confirm_the_acceptance") {
    if (item?.staffWatchActivityDetails?.payment_tier === 1) {
      //164
      return (
        <h3 className="m-0">
          <span className="!font-bold">{t("SUBJECT")}:</span> {t("CONFIRMACCEPTANCETIER1")} ({`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    } else if (item?.staffWatchActivityDetails?.payment_tier === 2) {
      // 165
      return (
        <h3 className="m-0">
          <span className="!font-bold">{t("SUBJECT")}:</span> {t("CONFIRMACCEPTANCETIER2")} (
          {`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    }
  } else if (item?.type === "return_to_seller") {
    //180
    return (
      <h3 className="m-0">
        <span className="!font-bold">{t("SUBJECT")}:</span> {t("RETURNTOSELLER")} ({`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "accept_estimation") {
    //137
    return (
      <h3 className="m-0">
        <span className="!font-bold">{t("SUBJECT")}:</span> {t("ACCEPTESTIMATION")} (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "estimator_quotation") {
    //143
    return (
      <h3 className="m-0">
        <span className="!font-bold">{t("SUBJECT")}:</span> {t("ESTIMATORQUOTATION")} ({`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "Quotation for Watch") {
    //145
    return (
      <h3 className="m-0">
        <span className="!font-bold">{t("SUBJECT")}:</span> {t("QUOTATIONFORWATCH")} (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "counter_offer_1") {
    //147
    return (
      <h3 className="m-0">
        <span className="!font-bold">{t("SUBJECT")}:</span> {t("COUNTEROFFER1")} (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "est_re-estimate") {
    const message =
      item?.message ===
        "Estimator has placed his re-estimation on staff first counter offer"
        ? `${t("ESTREESTIMATE1")}` // 149
        : `${t("ESTREESTIMATE2")}`; //153
    return (
      <h3 className="m-0">
        <span className="!font-bold">{t("SUBJECT")}:</span> {message} (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "counter_offer_2") {
    //151
    return (
      <h3 className="m-0">
        <span className="!font-bold">{t("SUBJECT")}:</span> {t("COUNTEROFFER2")} (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "rejected") {
    //185
    return (
      <h3 className="m-0">
        <span className="!font-bold">{t("SUBJECT")}:</span> {t("REJECTED")} (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "estimation_rejected") {
    // 189
    return (
      <h3 className="m-0">
        <span className="!font-bold">{t("SUBJECT")}:</span> {t("ESTIMATIONREJECTED")} ({`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else {
    return (
      <h3 className="m-0">
        <span className="!font-bold">{t("SUBJECT")}:</span> {item?.message} (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  }
};
