export const getSubject = (
  item,
  accepted_price,
  getWatchDetails,
  confirmed_price,
  commission_price,
  accepted_price_with_commission,
  sold_price
) => {
  switch (item?.type) {
    case "Be-Partner":
      return (
        <h3 className="m-0">
          <strong className="font-bold">Subject:</strong> Seller has selected
          'Be partner with Estipal'. Confirm selling price to Seller (
          {`${accepted_price} - ${getWatchDetails()}`})
        </h3>
      );
    case "confirm_selling_price":
      return (
        <h3 className="m-0">
          <strong className="font-bold">Subject:</strong>{" "}
          {`The selling price of ${confirmed_price} has been confirmed to the Seller. Sale is pending `}
          ({`${getWatchDetails()} - ${accepted_price}`})
        </h3>
      );
    case "confirm_the_sale":
      return (
        <h3 className="m-0">
          <strong className="font-bold">Subject:</strong>{" "}
          {`Sale has been confirmed by the Seller. Invoice for the amount of ${commission_price} can be issued to Seller `}
          ({`${getWatchDetails()} - ${accepted_price}`})
        </h3>
      );
    case "confirm_the_issuing_of_invoice":
      return (
        <h3 className="m-0">
          <strong className="font-bold">Subject:</strong>{" "}
          {`Invoice for the amount of ${commission_price} has been issued to Seller `}
          ({`${getWatchDetails()} - ${accepted_price}`})
        </h3>
      );
    case "no_sale_has_been_made":
      return (
        <h3 className="m-0">
          <strong className="font-bold">Subject:</strong> {item?.message} (
          {`${getWatchDetails()} - ${accepted_price}`})
        </h3>
      );
    case "seller_invoice_new":
      if (item?.staffWatchActivityDetails?.payment_tier === 1) {
        return (
          <h3 className="m-0">
            <strong className="font-bold">Subject:</strong>{" "}
            {`${item?.message} `}({`${getWatchDetails()} - ${accepted_price}`})
          </h3>
        );
      } else if (item?.staffWatchActivityDetails?.payment_tier === 2) {
        return (
          <h3 className="m-0">
            <strong className="font-bold">Subject:</strong>{" "}
            {`Shipment of the watch is pending. The payment of ${accepted_price_with_commission} is due after receiving the watch.`}
            ({`${getWatchDetails()} - ${accepted_price}`})
          </h3>
        );
      }
      break;
    case "seller_invoice":
      if (item?.staffWatchActivityDetails?.payment_tier === 1) {
        return (
          <h3 className="m-0">
            <strong className="font-bold">Subject:</strong>{" "}
            {`${item?.message} `}({`${getWatchDetails()} - ${accepted_price}`})
          </h3>
        );
      } else if (item?.staffWatchActivityDetails?.payment_tier === 2) {
        return (
          <h3 className="m-0">
            <strong className="font-bold">Subject:</strong>{" "}
            {`Seller has selected 'Sell to Estipal'. Shipment of the watch is pending. The payment of ${accepted_price_with_commission} is due after receiving the watch `}
            ({`${getWatchDetails()} - ${accepted_price}`})
          </h3>
        );
      }
      break;
    case "confirm_payment_seller":
      return (
        <h3 className="m-0">
          <strong className="font-bold">Subject:</strong>{" "}
          {`The payment of ${accepted_price_with_commission} to the seller has been confirmed. Shipment of the watch is pending`}
          ({`${getWatchDetails()} - ${accepted_price}`})
        </h3>
      );
    case "confirm_shipment_estipal":
      return (
        <h3 className="m-0">
          <strong className="font-bold">Subject:</strong> {`${item?.message} `}(
          {`${getWatchDetails()} - ${accepted_price}`})
        </h3>
      );
    case "confirm_the_acceptance":
      if (item?.staffWatchActivityDetails?.payment_tier == 1) {
        return (
          <h3 className="m-0">
            <strong className="font-bold">Subject:</strong>{" "}
            {`${item?.message} `}({`${getWatchDetails()} - ${accepted_price}`})
          </h3>
        );
      } else if (item?.staffWatchActivityDetails?.payment_tier == 2) {
        return (
          <h3 className="m-0">
            <strong className="font-bold">Subject:</strong> Payment and
            acceptance of the watch has been confirmed. This deal has been
            completed ({`${getWatchDetails()} - ${accepted_price}`})
          </h3>
        );
      }
      break;
    case "return_to_seller":
      return (
        <h3 className="m-0">
          <strong className="font-bold">Subject:</strong> {`${item?.message} `}(
          {`${getWatchDetails()} - ${accepted_price}`})
        </h3>
      );
    case "estimator_multi_quotation":
      return (
        <h3 className="m-0">
          <strong className="font-bold">Subject:</strong> Validation required
          for this estimate(s) ({`${accepted_price} - ${getWatchDetails()}`})
        </h3>
      );
    case "estimator_rquied_validation":
      return (
        <h3 className="m-0">
          <strong className="font-bold">Subject:</strong> Validation required
          for this estimate(s) ({`${accepted_price} - ${getWatchDetails()}`})
        </h3>
      );
    case "confirm_sold":
      return (
        <h3 className="m-0">
          <strong className="font-bold">Subject:</strong> {`${item?.message} `}(
          {`${getWatchDetails()} - ${sold_price}`})
        </h3>
      );
    default:
      return (
        <h3 className="m-0">
          <strong className="font-bold">Subject:</strong> {`${item?.message} `}(
          {`${getWatchDetails()} - ${accepted_price}`})
        </h3>
      );
  }
};
