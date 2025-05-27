import { Button, Skeleton } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../services";
import { convertUnixToDate, formatNumberOrDefault } from "../../../utils";
import ImageDialog from "./components/ImageDialog";
import {useTranslate } from "../../../language";

const WatchStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [watchDetailData, setWatchDetailData] = useState({});
  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem("userRole");
  const { translate } = useTranslate();

  const handleOpenDialog = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const getWatchDetail = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `/staffWatchActivities/detail?id=${id}`
      );
      if (response?.status === 200) {
        setWatchDetailData(response?.payload?.data);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getWatchDetail();
    }
  }, [id]);

  const getSafeValue = (value, type) => {
    if (type === "string") {
      return value ?? "-";
    }
    if (type === "number") {
      return isNaN(value) || value == null ? 0 : value;
    }
    return value;
  };

  return (
    <div className="pb-[15px] min-h-[100vh]">
      <div
        className={`${
          userRole === "staff" ? "pt-8" : "pt-6"
        } px-[20px] flex justify-between items-center mb-[30px] flex-wrap gap-5 dark:bg-none bg-gradient-to-b from-[rgba(0,96,169,0.36)] to-[rgba(255,255,255,0)]`}
      >
        {loading ? (
          <Skeleton variant="text" width={300} height={40} />
        ) : (
          <h3 className="dark:text-white text-black text-[21px]">
            Watch History - ID : W{watchDetailData?.id},{" "}
            {watchDetailData?.brand}, {watchDetailData?.model},{" "}
            {watchDetailData?.collection}{" "}
            {watchDetailData?.reference?.trim(" ") &&
              `(${watchDetailData?.reference})`}
          </h3>
        )}

        {loading ? (
          <Skeleton variant="rectangular" width={200} height={40} />
        ) : (
          <Button
            variant="contained"
            className="!bg-[#1760a9] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
            onClick={() =>
              navigate(`/admin/home/readActivity/${watchDetailData?.id}`)
            }
          >
            Messaging
          </Button>
        )}
      </div>

      <div className="w-full flex-[2] px-[20px]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {loading ? (
            <>
              <Skeleton variant="rectangular" width="100%" height={60} />
              <Skeleton variant="rectangular" width="100%" height={60} />
              <Skeleton variant="rectangular" width="100%" height={60} />
              <Skeleton variant="rectangular" width="100%" height={60} />
              <Skeleton variant="rectangular" width="100%" height={60} />
              <Skeleton variant="rectangular" width="100%" height={60} />
              <Skeleton variant="rectangular" width="100%" height={60} />
              <Skeleton variant="rectangular" width="100%" height={60} />
              <Skeleton variant="rectangular" width="100%" height={60} />
              <Skeleton variant="rectangular" width="100%" height={60} />
              <Skeleton variant="rectangular" width="100%" height={60} />
              <Skeleton variant="rectangular" width="100%" height={60} />
            </>
          ) : (
            <>
              <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
                <p className="dark:text-white text-black">ID</p>
                <p className="dark:text-white text-black">
                  W{getSafeValue(watchDetailData?.id, "string")}
                </p>
              </div>
              <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
                <p className="dark:text-white text-black">{translate("BRAND")}</p>
                <p className="dark:text-white text-black">
                  {getSafeValue(watchDetailData?.brand, "string")}
                </p>
              </div>
              <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between gap-[25px] border border-gray-300 dark:border-none">
                <p className="dark:text-white text-black">{translate("COLLECTION")}</p>
                <p className="dark:text-white text-black line-clamp-1">
                  {`${getSafeValue(watchDetailData?.collection, "string")} `}
                </p>
              </div>
              <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center gap-[20px] flex justify-between border border-gray-300 dark:border-none">
                <p className="dark:text-white text-black">{translate("MODEL")}</p>
                <p className="dark:text-white text-black whitespace-nowrap overflow-auto hide-scrollbar">
                  {`${getSafeValue(watchDetailData?.model, "string")} ${
                    watchDetailData?.reference?.trim(" ") &&
                    `(${getSafeValue(watchDetailData?.reference, "string")})`
                  }`}
                </p>
              </div>
              <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
                <p className="dark:text-white text-black">{translate("SERIALNUMBER")}</p>
                <p className="dark:text-white text-black">
                  {getSafeValue(watchDetailData?.serial_no, "string")}
                </p>
              </div>
              <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
                <p className="dark:text-white text-black">{translate("CONDITION")}</p>
                <p className="dark:text-white text-black">
                  {getSafeValue(
                    watchDetailData?.imageUploadDetails?.[0]?.condition,
                    "string"
                  )}
                </p>
              </div>
              <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
                <p className="dark:text-white text-black">{translate("BRACLETINFO")}</p>
                <p className="dark:text-white text-black">
                  {getSafeValue(
                    watchDetailData?.imageUploadDetails?.[0]?.bracelet_link,
                    "string"
                  )}
                </p>
              </div>
              <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
                <p className="dark:text-white text-black">{translate("YEARSOFPRODUCTION")}</p>
                <p className="dark:text-white text-black">
                  {getSafeValue(watchDetailData?.year_of_prod, "number")}
                </p>
              </div>
              <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
                <p className="dark:text-white text-black">{translate("REQUESTEDPRICE")}</p>
                <p className="dark:text-white text-black">
                  {watchDetailData?.adminDetail?.currency}{" "}
                  {formatNumberOrDefault(
                    getSafeValue(watchDetailData?.watch_price, "number")
                  )}
                </p>
              </div>
              <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
                <p className="dark:text-white text-black">Estimated price</p>
                <p className="dark:text-white text-black">
                  {watchDetailData?.adminDetail?.currency}{" "}
                  {formatNumberOrDefault(
                    getSafeValue(
                      watchDetailData?.estimated_watch_price,
                      "number"
                    )
                  )}
                </p>
              </div>
              <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
                <p className="dark:text-white text-black">{translate("WARRANTYDATE")}</p>
                <p className="dark:text-white text-black">
                  {watchDetailData?.imageUploadDetails?.[0]?.warentee_card_year
                    ? convertUnixToDate(
                        watchDetailData?.imageUploadDetails?.[0]
                          ?.warentee_card_year
                      )
                    : "-"}
                </p>
              </div>
              <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
                <p className="dark:text-white text-black">{translate("BOX")}</p>
                <p className="dark:text-white text-black">
                  {watchDetailData?.imageUploadDetails?.[0]?.box_image
                    ? "Yes"
                    : "No"}
                </p>
              </div>
              {userRole !== "staff" && (
                <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
                  <p className="dark:text-white text-black">
                    Estimator suggested wholesale price
                  </p>
                  {/* <p className="dark:text-white text-black">
                    {watchDetailData?.estimatorEssignwatchDetails?.[0]
                      ?.suggest_retail_price
                      ?  userRole === "staff" ? `${watchDetailData?.sellerDetail?.currency}` : `${watchDetailData?.adminDetail?.currency}` `${Number(
                        watchDetailData?.estimatorEssignwatchDetails?.[0]
                          ?.suggest_retail_price
                      ).toFixed(2)}`
                        : "0.00"}
                  </p> */}
                  <p className="dark:text-white text-black">
                    {watchDetailData?.estimatorEssignwatchDetails?.[0]
                      ?.suggest_retail_price
                      ? `${
                          userRole === "staff"
                            ? watchDetailData?.sellerDetail?.currency
                            : watchDetailData?.adminDetail?.currency
                        } ${Number(
                          watchDetailData.estimatorEssignwatchDetails[0]
                            .suggest_retail_price
                        ).toFixed(2)}`
                      : "0.00"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-4 my-[25px] px-[20px]">
        {loading ? (
          <>
            <Skeleton variant="rectangular" width={200} height={200} />
            <Skeleton variant="rectangular" width={200} height={200} />
            <Skeleton variant="rectangular" width={200} height={200} />
            <Skeleton variant="rectangular" width={200} height={200} />
            <Skeleton variant="rectangular" width={200} height={200} />
            <Skeleton variant="rectangular" width={200} height={200} />
          </>
        ) : (
          watchDetailData?.watch_pic?.map(
            (item, index) =>
              item && (
                <div key={index} onClick={() => handleOpenDialog(index)}>
                  <img
                    style={{
                      border: "5px solid #1e252b",
                      display: item ? "block" : "none",
                    }}
                    src={item}
                    alt="img"
                    className="img-border rounded-[8px] w-[200px] h-[200px] mx-auto cursor-pointer"
                  />
                </div>
              )
          )
        )}
      </div>

      {userRole !== "staff" && (
        <div className="px-[20px]">
          <div
            className="w-[100%] overflow-auto mx-auto p-[25px] rounded-[8px] dark:bg-[#1e252b] bg-white mb-[25px]"
            style={{ border: "1px solid #ccc" }}
          >
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={200} />
            ) : (
              <table className="table-auto w-full text-left">
                <thead style={{ borderBottom: "1px solid #ccc" }}>
                  <tr>
                    <th className="p-2 dark:text-[#ffff] text-black cursor-pointer whitespace-nowrap">
                      Added by
                    </th>
                    <th className="p-2 dark:text-[#ffff] text-black cursor-pointer whitespace-nowrap">
                      Estimated by
                    </th>
                    <th className="p-2 dark:text-[#ffff] text-black cursor-pointer whitespace-nowrap">
                      Estimate
                    </th>
                    <th className="p-2 dark:text-[#ffff] text-black cursor-pointer whitespace-nowrap">
                      Added on
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {watchDetailData?.allEstimatorsAssignDetails?.map(
                    (item, index) => (
                      <tr
                        key={index}
                        onClick={() => navigate(`/admin`)}
                        className="cursor-pointer"
                      >
                        <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                          {item?.allEstimatorAddedByDetail?.company_name +
                            " - " +
                            item?.allEstimatorAddedByDetail?.username}
                        </td>
                        <td
                          className={`px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap ${
                            item?.is_selected ? "font-bold" : "font-normal"
                          }`}
                        >
                          {" "}
                          {item?.estimatorDetail.company_name +
                            " - " +
                            item?.estimatorDetail.first_name +
                            " " +
                            item?.estimatorDetail.last_name}
                        </td>
                        <td
                          className={`px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap ${
                            item?.is_selected ? "font-bold" : "font-normal"
                          }`}
                        >
                          {item?.estimator_watch_status == "Pass"
                            ? item?.estimator_watch_status
                            : item?.estimatorDetail?.currency +
                              " " +
                              formatNumberOrDefault(
                                item?.estimated_watch_price
                              )}{" "}
                          {item?.is_selected && "(Selected)"}
                        </td>
                        <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                          {moment
                            .unix(item?.estimation_assign_date)
                            .format("MMMM DD ,YYYY h:mm A")}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      <h2 className="dark:text-white text-black font-bold text-[30px] mb-2 px-[20px]">
        {translate("WATCHHISTORY")}
      </h2>

      <div className="px-[20px]">
        <div
          className="w-[100%] overflow-auto mx-auto p-[25px] dark:bg-[#1e252b] bg-[#F8F8F8] rounded-[8px]"
          style={{ border: "1px solid #ccc" }}
        >
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={200} />
          ) : (
            <table className="table-auto w-full text-left">
              <tbody
                onClick={() => navigate(`/admin/home/readActivity/${id}`)}
                className="cursor-pointer"
              >
                {watchDetailData?.adminActivities
                  ?.slice()
                  .reverse()
                  .map((item, index) => {
                    const currency =
                      userRole === "staff"
                        ? watchDetailData?.sellerDetail?.currency
                        : watchDetailData?.adminDetail?.currency;
                    if (userRole) {
                      if (item?.type === "Quotation for Watch") {
                        return (
                          <tr key={index}>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] t</tr>ext-black whitespace-nowrap">
                              {moment
                                .unix(item?.created_on)
                                .format("MMMM DD ,YYYY h:mm A")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {item?.company_name || item?.from_name
                                ? (item?.company_name ?? "") +
                                  (item?.company_name == "" ||
                                  !item?.company_name ||
                                  item?.from_name == ""
                                    ? ""
                                    : " - ") +
                                  (item?.from_name ?? "")
                                : "-"}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {translate("WAITINGFORQUOTATION")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {currency +
                                " " +
                                formatNumberOrDefault(
                                  item?.watch_details?.price
                                )}
                            </td>
                          </tr>
                        );
                      } else if (item?.type === "estimator_quotation") {
                        return (
                          <tr key={index}>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {moment
                                .unix(item?.created_on)
                                .format("MMMM DD ,YYYY h:mm A")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {item?.company_name || item?.from_name
                                ? (item?.company_name ?? "") +
                                  (item?.company_name == "" ||
                                  !item?.company_name ||
                                  item?.from_name == ""
                                    ? ""
                                    : " - ") +
                                  (item?.from_name ?? "")
                                : "-"}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {translate("ESTIMATEDTEXT")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {currency +
                                " " +
                                formatNumberOrDefault(
                                  item?.watch_details?.estimated_price_seller
                                )}
                            </td>
                          </tr>
                        );
                      } else if (item?.type === "counter_offer_1") {
                        return (
                          <tr key={index}>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {moment
                                .unix(item?.created_on)
                                .format("MMMM DD ,YYYY h:mm A")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {item?.company_name || item?.from_name
                                ? (item?.company_name ?? "") +
                                  (item?.company_name == "" ||
                                  !item?.company_name ||
                                  item?.from_name == ""
                                    ? ""
                                    : " - ") +
                                  (item?.from_name ?? "")
                                : "-"}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {translate("PENDINGFIRSTCOUNTEROFFER")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {currency +
                                " " +
                                formatNumberOrDefault(
                                  item?.watch_details?.seller_display_counter
                                )}
                            </td>
                          </tr>
                        );
                      } else if (item?.type === "counter_offer_2") {
                        return (
                          <tr key={index}>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {moment
                                .unix(item?.created_on)
                                .format("MMMM DD ,YYYY h:mm A")}
                            </td>
                            <td className="px-[14px] py-[10px</tr>] dark:text-[#ffff] text-black whitespace-nowrap">
                              {item?.company_name || item?.from_name
                                ? (item?.company_name ?? "") +
                                  (item?.company_name == "" ||
                                  !item?.company_name ||
                                  item?.from_name == ""
                                    ? ""
                                    : " - ") +
                                  (item?.from_name ?? "")
                                : "-"}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {translate("PENDINGSECONDCOUNTEROFFER")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {currency +
                                " " +
                                formatNumberOrDefault(
                                  item?.watch_details?.seller_display_counter
                                )}
                            </td>
                          </tr>
                        );
                      } else if (item?.type === "est_re-estimate") {
                        return (
                          <tr key={index}>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {moment
                                .unix(item?.created_on)
                                .format("MMMM DD ,YYYY h:mm A")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {item?.company_name || item?.from_name
                                ? (item?.company_name ?? "") +
                                  (item?.company_name == "" ||
                                  !item?.company_name ||
                                  item?.from_name == ""
                                    ? ""
                                    : " - ") +
                                  (item?.from_name ?? "")
                                : "-"}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {translate("REESTIMATE")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {currency +
                                " " +
                                formatNumberOrDefault(
                                  item?.watch_details?.estimated_price_seller
                                )}
                            </td>
                          </tr>
                        );
                      } else if (item?.type === "accept_estimation") {
                        return (
                          <tr key={index}>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {moment
                                .unix(item?.created_on)
                                .format("MMMM DD ,YYYY h:mm A")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {item?.company_name || item?.from_name
                                ? (item?.company_name ?? "") +
                                  (item?.company_name == "" ||
                                  !item?.company_name ||
                                  item?.from_name == ""
                                    ? ""
                                    : " - ") +
                                  (item?.from_name ?? "")
                                : "-"}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {translate("ACCEPTEDDEALINPROGRESS")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {currency +
                                " " +
                                formatNumberOrDefault(
                                  item?.watch_details?.accepted_price
                                )}
                            </td>
                          </tr>
                        );
                      } else if (item?.type === "rejected") {
                        return (
                          <tr key={index}>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {moment
                                .unix(item?.created_on)
                                .format("MMMM DD ,YYYY h:mm A")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {item?.company_name || item?.from_name
                                ? (item?.company_name ?? "") +
                                  (item?.company_name == "" ||
                                  !item?.company_name ||
                                  item?.from_name == ""
                                    ? ""
                                    : " - ") +
                                  (item?.from_name ?? "")
                                : "-"}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {translate("REJECTEDTEXT")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {currency +
                                " " +
                                formatNumberOrDefault(
                                  item?.watch_details?.seller_display_price
                                )}
                            </td>
                          </tr>
                        );
                      } else if (item?.type === "estimation_rejected") {
                        return (
                          <tr key={index}>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {moment
                                .unix(item?.created_on)
                                .format("MMMM DD ,YYYY h:mm A")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {item?.company_name || item?.from_name
                                ? (item?.company_name ?? "") +
                                  (item?.company_name == "" ||
                                  !item?.company_name ||
                                  item?.from_name == ""
                                    ? ""
                                    : " - ") +
                                  (item?.from_name ?? "")
                                : "-"}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {translate("PASSTEXT")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {currency +
                                " " +
                                formatNumberOrDefault(
                                  item?.watch_details?.seller_request_price
                                )}
                            </td>
                          </tr>
                        );
                      } else if (item?.type === "estimation_expired") {
                        return (
                          <tr key={index}>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {moment
                                .unix(item?.created_on)
                                .format("MMMM DD ,YYYY h:mm A")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              Estipal response time limit rule
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {translate("CANCEL")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {currency +
                                " " +
                                formatNumberOrDefault(
                                  item?.watch_details?.seller_display_counter
                                )}
                            </td>
                          </tr>
                        );
                      } else if (item?.type === "staff_response_time_expired") {
                        return (
                          <tr key={index}>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {moment
                                .unix(item?.created_on)
                                .format("MMMM DD ,YYYY h:mm A")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              Estipal response time limit rule
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              Expired
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {currency +
                                " " +
                                formatNumberOrDefault(
                                  item?.watch_details?.estimated_price_seller
                                )}
                            </td>
                          </tr>
                        );
                      } else if (item?.type === "est_counter_offer_accept") {
                        return (
                          <tr key={index}>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {moment
                                .unix(item?.created_on)
                                .format("MMMM DD ,YYYY h:mm A")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {item?.company_name || item?.from_name
                                ? (item?.company_name ?? "") +
                                  (item?.company_name == "" ||
                                  !item?.company_name ||
                                  item?.from_name == ""
                                    ? ""
                                    : " - ") +
                                  (item?.from_name ?? "")
                                : "-"}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {translate("ACCEPTEDDEALINPROGRESS")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {currency +
                                " " +
                                formatNumberOrDefault(
                                  item?.watch_details?.estimated_price_seller
                                )}
                            </td>
                          </tr>
                        );
                      } else if (
                        [
                          "Be-Partner",
                          "confirm_selling_price",
                          "confirm_the_sale",
                          "confirm_the_issuing_of_invoice",
                          "no_sale_has_been_made",
                        ].includes(item?.type)
                      ) {
                        return (
                          <tr key={index}>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {moment
                                .unix(item?.created_on)
                                .format("MMMM DD ,YYYY h:mm A")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {item?.company_name || item?.from_name
                                ? (item?.company_name ?? "") +
                                  (item?.company_name == "" ||
                                  !item?.company_name ||
                                  item?.from_name == ""
                                    ? ""
                                    : " - ") +
                                  (item?.from_name ?? "")
                                : "-"}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {item?.watch_status}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {currency +
                                " " +
                                formatNumberOrDefault(
                                  item?.type === "Be-Partner"
                                    ? item?.watch_details?.accepted_price
                                    : item?.type === "confirm_selling_price"
                                    ? item?.watch_details?.confirmed_price
                                    : item?.watch_details?.commission_price
                                )}
                            </td>
                          </tr>
                        );
                      } else if (
                        [
                          "seller_invoice",
                          "confirm_payment_seller",
                          "confirm_shipment_estipal",
                          "confirm_the_acceptance",
                          "seller_invoice_new",
                          "return_to_seller",
                        ].includes(item?.type)
                      ) {
                        return (
                          <tr key={index}>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {moment
                                .unix(item?.created_on)
                                .format("MMMM DD ,YYYY h:mm A")}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {item?.from_name ?? "-"}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {item?.watch_status}
                            </td>
                            <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                              {currency +
                                " " +
                                formatNumberOrDefault(
                                  item?.watch_details
                                    ?.accepted_price_with_commission
                                )}
                            </td>
                          </tr>
                        );
                      }
                    }
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ImageDialog
        open={open}
        handleCloseDialog={handleCloseDialog}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        imageData={watchDetailData?.watch_pic?.concat(
          [
            watchDetailData?.imageUploadDetails?.[0]?.box_image,
            watchDetailData?.imageUploadDetails?.[0]?.paper_image,
          ] || []
        )}
      />
    </div>
  );
};

export default WatchStatus;
