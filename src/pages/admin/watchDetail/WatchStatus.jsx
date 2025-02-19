import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageDialog from "./components/ImageDialog";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../services";
import { extractImageUrls, formattedNumber } from "../../../utils";
import moment from "moment";

const WatchStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [watchDetailData, setWatchDetailData] = useState({});
  const [loading, setLoading] = useState(false);
  const staffUser = JSON.parse(localStorage.getItem("staffUser"));
  const imageUrls =
    watchDetailData?.watch_pic && extractImageUrls(watchDetailData?.watch_pic);

  const handleOpenDialog = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  // Close dialog
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
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getWatchDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="mx-auto px-[20px] sm:px-[45px] py-[20px]">
      <div className="flex justify-between items-center mb-[30px] flex-wrap gap-5">
        <h3 className="dark:text-white text-black text-[21px]">
          Watch History - ID : W{watchDetailData?.id}, {watchDetailData?.brand},{" "}
          {watchDetailData?.model}, {watchDetailData?.collection} (
          {watchDetailData?.reference})
        </h3>

        <Button
          variant="contained"
          className="!bg-[#1760a9] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
          onClick={() =>
            navigate(`/admin/home/readActivity/${watchDetailData?.id}`)
          }
        >
          Messaging
        </Button>
      </div>

      <div className="w-full flex-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
            <p className="dark:text-white text-black">ID</p>
            <p className="dark:text-white text-black">W{watchDetailData?.id}</p>
          </div>
          <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
            <p className="dark:text-white text-black">Brand</p>
            <p className="dark:text-white text-black">
              {watchDetailData?.brand}
            </p>
          </div>
          <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between gap-[25px] border border-gray-300 dark:border-none">
            <p className="dark:text-white text-black">Collection</p>
            <p className="dark:text-white text-black line-clamp-1">
              {watchDetailData?.model}
            </p>
          </div>
          <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
            <p className="dark:text-white text-black">Model</p>
            <p className="dark:text-white text-black">
              {`${watchDetailData?.collection} (${watchDetailData?.reference})`}
            </p>
          </div>
          <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
            <p className="dark:text-white text-black">Serial Number</p>
            <p className="dark:text-white text-black">
              {watchDetailData?.serial_no}
            </p>
          </div>
          <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
            <p className="dark:text-white text-black">Condition</p>
            <p className="dark:text-white text-black">
              {watchDetailData?.imageUploadDetails?.[0]?.condition}
            </p>
          </div>
          <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
            <p className="dark:text-white text-black">Bracelet info</p>
            <p className="dark:text-white text-black">
              {watchDetailData?.imageUploadDetails?.[0]?.bracelet_link}
            </p>
          </div>
          <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
            <p className="dark:text-white text-black">Year of production</p>
            <p className="dark:text-white text-black">
              {watchDetailData?.year_of_prod}
            </p>
          </div>
          <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
            <p className="dark:text-white text-black">Requested price</p>
            <p className="dark:text-white text-black">
              USD {formattedNumber.format(watchDetailData?.watch_price)}
            </p>
          </div>
          <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
            <p className="dark:text-white text-black">Estimated price</p>
            <p className="dark:text-white text-black">
              USD{" "}
              {formattedNumber.format(watchDetailData?.estimated_watch_price)}
            </p>
          </div>
          <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
            <p className="dark:text-white text-black">Warranty date</p>
            <p className="dark:text-white text-black">
              {watchDetailData?.imageUploadDetails?.[0]?.warentee_card_year
                ? moment
                    .unix(
                      watchDetailData?.imageUploadDetails?.[0]
                        ?.warentee_card_year
                    )
                    .utc()
                    .format("DD MMMM YYYY")
                : "-"}
            </p>
          </div>
          <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
            <p className="dark:text-white text-black">Box</p>
            <p className="dark:text-white text-black">
              {watchDetailData?.imageUploadDetails?.[0]?.box_image
                ? "Yes"
                : "No"}
            </p>
          </div>
          <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
            <p className="dark:text-white text-black">
              Estimator suggested wholesale price
            </p>
            <p className="dark:text-white text-black">
              {watchDetailData?.estimatorEssignwatchDetails?.[0]
                ?.suggest_retail_price
                ? `${watchDetailData?.sellerDetail?.currency} ${Number(
                    watchDetailData?.estimatorEssignwatchDetails?.[0]
                      ?.suggest_retail_price
                  ).toFixed(2)}`
                : "0.00"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-4 my-[25px] ">
        {imageUrls?.map((item, index) => (
          <div key={index} onClick={() => handleOpenDialog(index)}>
            <img
              style={{ border: "5px solid #1e252b" }}
              src={item}
              alt="img"
              className="img-border rounded-[8px] w-[200px] h-[200px] mx-auto cursor-pointer"
            />
          </div>
        ))}
      </div>

      <div
        className="w-[100%] overflow-auto mx-auto p-[25px] rounded-[8px] dark:bg-[#1e252b] bg-white mb-[25px]"
        style={{ border: "1px solid #ccc" }}
      >
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
            {watchDetailData?.allEstimatorsAssignDetails?.map((item, index) => (
              <tr key={index}>
                <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                  {item?.allEstimatorAddedByDetail?.company_name +
                    " - " +
                    item?.allEstimatorAddedByDetail?.username}
                </td>
                <td
                  className={`px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap ${
                    watchDetailData?.is_selected ? "font-bold" : "font-normal"
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
                    watchDetailData?.is_selected ? "font-bold" : "font-normal"
                  }`}
                >
                  {item?.estimator_watch_status == "Pass"
                    ? item?.estimator_watch_status
                    : item?.estimatorDetail.currency +
                      " " +
                      item?.estimated_watch_price}{" "}
                  {watchDetailData?.is_selected && "(Selected)"}
                </td>
                <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                  {moment
                    .unix(item?.estimation_assign_date)
                    .format("MMM DD ,YYYY h:mm A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="dark:text-white text-black font-bold text-[30px] mb-2">
        Watch history
      </h2>

      <div
        className="w-[100%] overflow-auto mx-auto p-[25px] dark:bg-[#1e252b] bg-[#F8F8F8] rounded-[8px]"
        style={{ border: "1px solid #ccc" }}
      >
        <table className="table-auto w-full text-left">
          <tbody>
            {watchDetailData?.adminActivities?.map((item, index) => (
              <tr key={index}>
                <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                  {moment.unix(item?.created_on).format("MMMM DD ,YYYY h:mm A")}
                </td>
                <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                  {item?.company_name + " - " + item?.from_name}
                </td>
                <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                  {item?.status_description}
                </td>
                <td className="px-[14px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap">
                  {item?.adminUserDetail.currency + " " + item?.formatted_price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ImageDialog
        open={open}
        handleCloseDialog={handleCloseDialog}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        imageData={imageUrls}
      />
    </div>
  );
};

export default WatchStatus;
