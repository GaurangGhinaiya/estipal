const userRole = localStorage.getItem("userRole");

export const sellerGetSubject = (
  item,
  accepted_price,
  getWatchDetails,
  confirmed_price,
  commission_price,
  accepted_price_with_commission,
  sold_price
) => {
  const watchDetails = item?.watch_details || {};
  const brandDetails = `${watchDetails.brand || ""} ${
    watchDetails.collection || ""
  } ${watchDetails.model_no || ""} ${watchDetails.serial_no || ""}`;

  if (item?.type === "Be-Partner") {
    // 130
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> The confirmed selection is 'Be partner with
        Estipal', Estipal selling price confirmation is pending (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "confirm_selling_price") {
    //167
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> The selling price confirmed by Estipal is{" "}
        {confirmed_price}. Sale is pending (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "confirm_the_sale") {
    //171
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> Sale has been confirmed to Estipal. Waiting to
        receive Estipal invoice ({`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "confirm_the_issuing_of_invoice") {
    //172
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> Estipal issued and invoice for the amount of{" "}
        {commission_price} ({`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "no_sale_has_been_made") {
    //176
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> Sale has been cancelled and Estipal has been
        notified ({`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "seller_invoice_new") {
    if (item?.staffWatchActivityDetails?.payment_tier === 1) {
      //178
      return (
        <h3 className="m-0">
          <strong>Subject:</strong> A payment request of{" "}
          {accepted_price_with_commission} has been notified to Estipal and
          payment is pending ({`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    } else if (item?.staffWatchActivityDetails?.payment_tier === 2) {
      //179
      return (
        <h3 className="m-0">
          <strong>Subject:</strong> Shipment of the watch has to be arranged.
          Estipal will make payment of {accepted_price_with_commission} after
          receiving the watch ({`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    }
  } else if (item?.type === "seller_invoice") {
    if (item?.staffWatchActivityDetails?.payment_tier === 1) {
      // 154
      return (
        <h3 className="m-0">
          <strong>Subject:</strong> The confirmed selection is 'Sell to
          Estipal', a payment request of {accepted_price_with_commission} has
          been notified to Estipal and payment is pending (
          {`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    } else if (item?.staffWatchActivityDetails?.payment_tier === 2) {
      // 155
      return (
        <h3 className="m-0">
          <strong>Subject:</strong> The confirmed selection is 'Sell to
          Estipal'. Shipment of the watch has to be arranged. Estipal will make
          payment of {accepted_price_with_commission} after receiving the watch
          ({`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    }
  } else if (item?.type === "confirm_payment_seller") {
    // 157
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> Estipal confirmed the payment of{" "}
        {accepted_price_with_commission}. Shipment of the watch to Estipal has
        to be arranged ({`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "confirm_shipment_estipal") {
    if (item?.staffWatchActivityDetails?.payment_tier === 1) {
      //161
      return (
        <h3 className="m-0">
          <strong>Subject:</strong> Shipment of the watch has been confirmed.
          Waiting to receive Estipal acceptance (
          {`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    } else if (item?.staffWatchActivityDetails?.payment_tier === 2) {
      //162
      return (
        <h3 className="m-0">
          <strong>Subject:</strong> Shipment of the watch has been confirmed.
          Waiting to receive Estipal payment and acceptance (
          {`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    }
  } else if (item?.type === "confirm_the_acceptance") {
    if (item?.staffWatchActivityDetails?.payment_tier === 1) {
      //164
      return (
        <h3 className="m-0">
          <strong>Subject:</strong> Acceptance of the watch has been confirmed.
          This deal has been completed ({`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    } else if (item?.staffWatchActivityDetails?.payment_tier === 2) {
      // 165
      return (
        <h3 className="m-0">
          <strong>Subject:</strong> Payment and acceptance of the watch has been
          confirmed. This deal has been completed (
          {`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    }
  } else if (item?.type === "return_to_seller") {
    //180
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> Estipal rejected the sale. The watch will be
        returned ({`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "accept_estimation") {
    //137
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> Staff has accepted estimation of the watch (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "estimator_quotation") {
    //143
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> Estimator has sent his estimation on given
        watch quotation ({`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "Quotation for Watch") {
    //145
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> Seller is waiting for quotation (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "counter_offer_1") {
    //147
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> Staff has placed first counter offer on
        estimation of the watch quotation (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "est_re-estimate") {
    const message =
      item?.message ===
      "Estimator has placed his re-estimation on staff first counter offer"
        ? "Estimator has placed his re-estimation on staff first counter offer" // 149
        : "Estimator has placed his re-estimation on staff second counter offer"; //153
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> {message} (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "counter_offer_2") {
    //151
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> Staff has again placed counter offer on
        estimation of the watch quotation (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "rejected") {
    //185
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> Staff has declined the estimate request (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "estimation_rejected") {
    // 189
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> We regret to inform you that we could not
        estimate your watch ({`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else {
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> {item?.message} (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  }
};
