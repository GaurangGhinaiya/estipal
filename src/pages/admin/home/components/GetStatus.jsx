export const getStatus = (
  item,
  accepted_price,
  input_confirmed_price,
  confirm_the_issuing_of_invoice_flag,
  accepted_price_with_commission,
  input_sold_price,
  confirmed_price,
  commission_price,
  sold_price,
  input_price_for_seller
) => {
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
      return (
        <>
          <h3>
            Seller has selected 'Be partner with Estipal'. Confirm selling price
            to Seller:
            <input
              type="text"
              style={{ width: "130px", textAlign: "center" }}
              className={`text-center watch-desc-input ${
                input_confirmed_price ? "not_changed" : ""
              }`}
              name="confirmed_price"
              id="confirmed_price"
              value={input_confirmed_price}
              // onChange={handleConfirmPriceChange}
            />{" "}
            {item?.currency_unit}
          </h3>
          <h3>Status: {item?.watch_status}</h3>
          <div className="select_box text-center mt-20">
            <div className="select_box_inner">
              <p>
                <span>
                  <img src="path_to_urgent_icon.png" alt="Urgent" />
                </span>
                <span className="pending_status">Pending Action:</span>
                <span>Confirmation is required</span>
              </p>
              <ul className="list-unstyled list-inline">
                <li
                  id="confirmSellingPrice"
                  name={item?.watch_details?.watch_id}
                  value={item?.user1_id}
                  className={input_confirmed_price ? "inactiveLink" : ""}
                >
                  <a
                    href="javascript:void(0)"
                    className={`btn ${
                      input_confirmed_price ? "dark_green" : "dark_yellow"
                    }`}
                  >
                    Confirm selling price
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      );

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
      return (
        <>
          <h3>
            The sale has been confirmed by the Seller. Invoice for the amount of{" "}
            {commission_price} can be issued to the Seller.
          </h3>
          <h3>Status: {item?.watch_status}</h3>
          <div className="select_box text-center mt-20">
            <div className="select_box_inner">
              <p>
                <span>
                  <img src="path_to_urgent_icon.png" alt="Urgent" />
                </span>
                <span className="pending_status">Pending Action:</span>
                <span>Confirmation is required</span>
              </p>
              <ul className="list-unstyled list-inline">
                <li
                  id="confirmTheIssuingOfInvoice"
                  name={item?.watch_details?.watch_id}
                  value={item?.user1_id}
                  className={
                    confirm_the_issuing_of_invoice_flag ? "inactiveLink" : ""
                  }
                >
                  <a
                    href="javascript:void(0)"
                    className={`btn ${
                      confirm_the_issuing_of_invoice_flag
                        ? "dark_green"
                        : "dark_yellow"
                    }`}
                  >
                    Confirm the issuing of invoice
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      );

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
      return (
        <div className="message_box_inner">
          {item?.staffWatchActivityDetails?.payment_tier === 1 && (
            <>
              <h3>{`The payment of ${accepted_price_with_commission} is required before receiving the watch.`}</h3>
              <h3>{`Status: ${item?.watch_status}`}</h3>
              <div className="select_box text-center mt-20">
                <div className="select_box_inner">
                  <p>
                    <span>
                      <img
                        src={`assets/dist/images/icons/Urgent 1.png`}
                        alt="Urgent"
                      />
                    </span>
                    <span className="pending_status">Pending Action:</span>
                    <span>Confirmation is required</span>
                  </p>
                  <ul className="list-unstyled list-inline">
                    <li
                      id="confirmPaymentToSeller"
                      name={item?.watch_details?.watch_id}
                      value={item?.user1_id}
                      className={
                        item?.staffWatchActivityDetails
                          ?.confirm_payment_flag === 1
                          ? "inactiveLink"
                          : ""
                      }
                    >
                      <a
                        href="javascript:void(0)"
                        className={`btn ${
                          item?.staffWatchActivityDetails
                            ?.confirm_payment_flag === 1
                            ? "dark_green"
                            : "dark_yellow"
                        }`}
                      >
                        Confirm payment to Seller
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
          {item?.staffWatchActivityDetails?.payment_tier === 2 && (
            <>
              <h3>{`Shipment of the watch is pending. The payment of ${accepted_price_with_commission} is due after receiving the watch.`}</h3>
              <h3>{`Status: ${item?.watch_status}`}</h3>
            </>
          )}
        </div>
      );

    case "seller_invoice":
      return (
        <div className="message_box_inner">
          {item?.staffWatchActivityDetails?.payment_tier === 1 && (
            <>
              <h3>{`Seller has selected 'Sell to Estipal'. The payment of ${accepted_price_with_commission} is required before receiving the watch.`}</h3>
              <h3>{`Status: ${item?.watch_status}`}</h3>
              <div className="select_box text-center mt-20">
                <div className="select_box_inner">
                  <p>
                    <span>
                      <img
                        src={`assets/dist/images/icons/Urgent 1.png`}
                        alt="Urgent"
                      />
                    </span>
                    <span className="pending_status">Pending Action:</span>
                    <span>Confirmation is required</span>
                  </p>
                  <ul className="list-unstyled list-inline">
                    <li
                      id="confirmPaymentToSeller"
                      name={item?.watch_details?.watch_id}
                      value={item?.user1_id}
                      className={
                        item?.staffWatchActivityDetails
                          ?.confirm_payment_flag === 1
                          ? "inactiveLink"
                          : ""
                      }
                    >
                      <a
                        href="javascript:void(0)"
                        className={`btn ${
                          item?.staffWatchActivityDetails
                            ?.confirm_payment_flag === 1
                            ? "dark_green"
                            : "dark_yellow"
                        }`}
                      >
                        Confirm payment to Seller
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
          {item?.staffWatchActivityDetails?.payment_tier === 2 && (
            <>
              <h3>{`Seller has selected 'Sell to Estipal'. Shipment of the watch is pending. The payment of ${accepted_price_with_commission} is due after receiving the watch.`}</h3>
              <h3>{`Status: ${item?.watch_status}`}</h3>
            </>
          )}
        </div>
      );

    case "confirm_payment_seller":
      return (
        <div className="message_box_inner">
          <h3>{`The payment of ${accepted_price_with_commission} to the seller has been confirmed. Shipment of the watch is pending.`}</h3>
          <h3>{`Status: ${item?.watch_status}`}</h3>
        </div>
      );

    case "confirm_shipment_estipal":
      return (
        <div className="message_box_inner">
          {item?.staffWatchActivityDetails?.payment_tier === 1 && (
            <>
              <h3>{`Shipment of the watch has been confirmed by the Seller.`}</h3>
              <h3>{`Status: ${item?.watch_status}`}</h3>
              <div className="select_box text-center mt-20">
                <div className="select_box_inner">
                  <p>
                    <span>
                      <img
                        src={`assets/dist/images/icons/Urgent 1.png`}
                        alt="Urgent"
                      />
                    </span>
                    <span className="pending_status">Pending Action:</span>
                    <span>Select one of the below option</span>
                  </p>
                  <ul className="list-unstyled list-inline">
                    <li
                      id="confirmAndRequestSellingPrice"
                      name={item?.watch_details?.watch_id}
                      value={item?.user1_id}
                      className={
                        item?.staffWatchActivityDetails
                          ?.confirm_acceptance_return_flag === 0
                          ? ""
                          : "inactiveLink"
                      }
                    >
                      <a
                        href="javascript:void(0)"
                        className={`btn ${
                          item?.staffWatchActivityDetails
                            ?.confirm_acceptance_return_flag === 0
                            ? "dark_yellow"
                            : item?.staffWatchActivityDetails
                                ?.confirm_acceptance_return_flag === 1 &&
                              item?.staffWatchActivityDetails
                                ?.request_est_price_flag === 1
                            ? "dark_green"
                            : "light_grey"
                        }`}
                      >
                        Purchase Completed (Request Selling Price)
                      </a>
                    </li>
                    <li
                      id="confirmTheAcceptance"
                      name={item?.watch_details?.watch_id}
                      value={item?.user1_id}
                      className={
                        item?.staffWatchActivityDetails
                          ?.confirm_acceptance_return_flag === 0
                          ? ""
                          : "inactiveLink"
                      }
                    >
                      <a
                        href="javascript:void(0)"
                        className={`btn ${
                          item?.staffWatchActivityDetails
                            ?.confirm_acceptance_return_flag === 0
                            ? "dark_yellow"
                            : item?.staffWatchActivityDetails
                                ?.confirm_acceptance_return_flag === 1 &&
                              item?.staffWatchActivityDetails
                                ?.request_est_price_flag === 0
                            ? "dark_green"
                            : "light_grey"
                        }`}
                      >
                        Purchase Completed
                      </a>
                    </li>
                    <li
                      id="returnToSeller"
                      name={item?.watch_details?.watch_id}
                      value={item?.user1_id}
                      className={
                        item?.staffWatchActivityDetails
                          ?.confirm_acceptance_return_flag === 0
                          ? ""
                          : "inactiveLink"
                      }
                    >
                      <a
                        href="javascript:void(0)"
                        className={`btn ${
                          item?.staffWatchActivityDetails
                            ?.confirm_acceptance_return_flag === 0
                            ? "dark_yellow"
                            : item?.staffWatchActivityDetails
                                ?.confirm_acceptance_return_flag === 2
                            ? "dark_green"
                            : "light_grey"
                        }`}
                      >
                        Return to Seller
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
          {item?.staffWatchActivityDetails?.payment_tier === 2 && (
            <>
              <h3>{`Shipment of the watch has been confirmed by the Seller.`}</h3>
              <h3>{`Status: ${item?.watch_status}`}</h3>
              <div className="select_box text-center mt-20">
                <div className="select_box_inner">
                  <p>
                    <span>
                      <img
                        src={`assets/dist/images/icons/Urgent 1.png`}
                        alt="Urgent"
                      />
                    </span>
                    <span className="pending_status">Pending Action:</span>
                    <span>Select one of the below option</span>
                  </p>
                  <ul className="list-unstyled list-inline">
                    <li
                      id="confirmTheAcceptance"
                      name={item?.watch_details?.watch_id}
                      value={item?.user1_id}
                      className={
                        item?.staffWatchActivityDetails
                          ?.confirm_acceptance_return_flag === 0
                          ? ""
                          : "inactiveLink"
                      }
                    >
                      <a
                        href="javascript:void(0)"
                        className={`btn ${
                          item?.staffWatchActivityDetails
                            ?.confirm_acceptance_return_flag === 0
                            ? "dark_yellow"
                            : item?.staffWatchActivityDetails
                                ?.confirm_acceptance_return_flag === 1
                            ? "dark_green"
                            : "light_grey"
                        }`}
                      >
                        Confirm the payment and acceptance
                      </a>
                    </li>
                    <li
                      id="returnToSeller"
                      name={item?.watch_details?.watch_id}
                      value={item?.user1_id}
                      className={
                        item?.staffWatchActivityDetails
                          ?.confirm_acceptance_return_flag === 0
                          ? ""
                          : "inactiveLink"
                      }
                    >
                      <a
                        href="javascript:void(0)"
                        className={`btn ${
                          item?.staffWatchActivityDetails
                            ?.confirm_acceptance_return_flag === 0
                            ? "dark_yellow"
                            : item?.staffWatchActivityDetails
                                ?.confirm_acceptance_return_flag === 2
                            ? "dark_green"
                            : "light_grey"
                        }`}
                      >
                        Return to Seller
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      );

    case "confirm_the_acceptance":
      return (
        <div className="message_box_inner">
          <h3>
            {`Estipal Sold the watch (update to actual sale price) : `}
            <input
              type="text"
              style={{
                width: "130px",
                textAlign: "center",
                background: "rgba(var(---color-primary-seller-rgb), 0.1)",
                border: "2px solid rgba(var(---color-primary-seller-rgb), 1)",
                borderRadius: "5px",
              }}
              className={`text-center watch-desc-input ${
                item?.staffWatchActivityDetails?.admin_deal_done === 1
                  ? "inactiveLink"
                  : ""
              }`}
              name="confirmed_sold_price"
              id="confirmed_sold_price"
              value={input_sold_price ? sold_price : input_price_for_seller}
            />
          </h3>
          <h3>Status: {item?.watch_status}</h3>
          <div className="select_box text-center mt-20">
            <div className="select_box_inner">
              <p>
                <span>
                  <img
                    src={`assets/dist/images/icons/Urgent 1.png`}
                    alt="urgent"
                  />
                </span>
                <span className="pending_status">Pending Action:</span>
                <span>Confirmation is required</span>
              </p>
              <ul className="list-unstyled list-inline">
                <li
                  id="confirmSold"
                  name={item?.watch_details?.watch_id}
                  value={item?.user1_id}
                  className={
                    item?.staffWatchActivityDetails?.admin_deal_done === 1
                      ? "inactiveLink"
                      : ""
                  }
                >
                  <a
                    className={`btn ${
                      item?.staffWatchActivityDetails?.admin_deal_done === 1
                        ? "dark_green"
                        : "dark_yellow"
                    }`}
                    href="javascript:void(0)"
                    // onClick={handleConfirmSold}
                  >
                    Confirm Sold
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );

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
      return (
        <div className="message_box_inner">
          <h3>Estipal sold the watch. This deal has been completed.</h3>
          <h3>Status: {item?.watch_status}</h3>
          <div className="select_box text-center mt-20">
            <div className="select_box_inner">
              <p>
                <span>
                  <img
                    src={`assets/dist/images/icons/Urgent 1.png`}
                    alt="urgent"
                  />
                </span>
              </p>
              <ul className="list-unstyled list-inline">
                <li
                  id="confirmPaidEst"
                  name={item?.watch_details?.watch_id}
                  value={item?.user1_id}
                  className={item?.paid_estimator === 1 ? "inactiveLink" : ""}
                >
                  <a
                    className={`btn ${
                      item?.paid_estimator === 1 ? "dark_green" : "dark_yellow"
                    }`}
                    href="javascript:void(0)"
                    // onClick={handleConfirmPaidEstimator}
                  >
                    Confirm commission payment
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );

    case "confirm_paid_estimator":
      return (
        <div className="message_box_inner">
          <h3>
            {"Commissions to estimator has been paid ("}
            {item?.currency_unit} {item?.estimator_watch_revenue.toFixed(2)})
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
      return (
        <div className="inner_readactivity_table border_bottom table-responsive">
          <table className="nowrap dataTable row-border no-footer table_design">
            <thead>
              <tr>
                <th>Id</th>
                <th>Company</th>
                <th>First</th>
                <th>Last</th>
                <th className="text-center">Requires validation</th>
                <th>Received</th>
                <th>Estimate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{item?.watch_details?.est_id}</td>
                <td>{item?.watch_details?.est_cpmpany}</td>
                <td>{item?.watch_details?.first_name}</td>
                <td>{item?.watch_details?.last_name}</td>
                <td className="text-center">
                  <span>
                    {item?.watch_details?.est_req_valid === 1 ? (
                      <img src={`assets/dist/images/icons/y.png`} alt="valid" />
                    ) : (
                      <img
                        src={`assets/dist/images/icons/n.png`}
                        alt="not valid"
                      />
                    )}
                  </span>
                </td>
                <td>
                  <span
                    className="created_at_table"
                    id={new Date(
                      item?.watch_details?.est_estimate_date
                    ).toISOString()}
                  />
                </td>
                <td>
                  {item?.watch_status === "pass"
                    ? item?.watch_status
                    : accepted_price}
                </td>
                <td style={{ textAlign: "right" }}>
                  {item?.watch_status !== "pass" && (
                    <a
                      className={`btn btn-primary ${
                        !item?.pass_all_estimator && !item?.selected_estimator
                          ? ""
                          : "inactiveLink"
                      }`}
                      href={`/estimator_assignment/estimator_estimate_staff/${item?.watch_details?.est_id}/${item?.watch_details?.watch_unique_id}/${item?.watch_details?.estimated_price_admin}/${item?.watch_details?.est_pass_flag}`}
                      style={{ minWidth: "130px" }}
                    >
                      {item?.selected_estimator === item?.watch_details?.est_id
                        ? "Selected"
                        : "Select estimate"}
                    </a>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    default:
      return ""; // Handle unknown types if necessary
  }
};
