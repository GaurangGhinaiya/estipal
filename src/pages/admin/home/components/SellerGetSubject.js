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
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> Seller has selected 'Be partner with Estipal'.
        Confirm selling price to Seller ({`${brandDetails} - ${accepted_price}`}
        )
      </h3>
    );
  } else if (item?.type === "confirm_selling_price") {
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> The selling price of {confirmed_price} has
        been confirmed to the Seller. Sale is pending (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "confirm_the_sale") {
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> Sale has been confirmed by the Seller. Invoice
        for the amount of {commission_price} can be issued to Seller (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "confirm_the_issuing_of_invoice") {
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> Invoice for the amount of {commission_price}{" "}
        has been issued to Seller ({`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "no_sale_has_been_made") {
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> No sale has been made (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "seller_invoice_new") {
    if (item?.payment_tier === 1) {
      return (
        <h3 className="m-0">
          <strong>Subject:</strong> Payment of {accepted_price_with_commission}{" "}
          is due after receiving the watch (
          {`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    } else if (item?.payment_tier === 2) {
      return (
        <h3 className="m-0">
          <strong>Subject:</strong> Shipment of the watch is pending. Payment of{" "}
          {accepted_price_with_commission} is due after receiving the watch (
          {`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    }
  } else if (item?.type === "seller_invoice") {
    if (item?.payment_tier === 1) {
      return (
        <h3 className="m-0">
          <strong>Subject:</strong> Payment of {accepted_price_with_commission}{" "}
          is due ({`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    } else if (item?.payment_tier === 2) {
      return (
        <h3 className="m-0">
          <strong>Subject:</strong> Seller has selected 'Sell to Estipal'.
          Shipment of the watch is pending. Payment of{" "}
          {accepted_price_with_commission} is due (
          {`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    }
  } else if (item?.type === "confirm_payment_seller") {
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> Payment of {accepted_price_with_commission} to
        the seller has been confirmed. Shipment of the watch is pending (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "confirm_shipment_estipal") {
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> Shipment of the watch is confirmed (
        {`${brandDetails} - ${accepted_price}`})
      </h3>
    );
  } else if (item?.type === "confirm_the_acceptance") {
    if (item?.payment_tier === 1) {
      return (
        <h3 className="m-0">
          <strong>Subject:</strong> Payment and acceptance of the watch has been
          confirmed ({`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    } else if (item?.payment_tier === 2) {
      return (
        <h3 className="m-0">
          <strong>Subject:</strong> This deal has been completed (
          {`${brandDetails} - ${accepted_price}`})
        </h3>
      );
    }
  } else if (item?.type === "return_to_seller") {
    return (
      <h3 className="m-0">
        <strong>Subject:</strong> The watch has been returned to the seller (
        {`${brandDetails} - ${accepted_price}`})
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
