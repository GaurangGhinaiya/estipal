import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../services";
import { extractImageUrls, formattedNumber } from "../../../utils";
import CardData from "./components/CardData";

const ReadActivity = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [readActivityData, setReadActivityData] = useState();
  const staffUser = JSON.parse(localStorage.getItem("staffUser"));

  const getDetailById = async () => {
    try {
      const response = await axiosInstance.get(
        `/adminActivity/detail?id=${id}`
      );
      setReadActivityData(response?.payload?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getAdminGroupInfo = (adminGroup, userId) => {
    const groups = {
      staff: { label: "Staff", prefix: "UCA" },
      seller: { label: "Seller", prefix: "SCA" },
      estimator: { label: "Estimator", prefix: "ECA" },
    };

    const group = groups[adminGroup] || groups.estimator;
    return `${group.label} - ID: ${group.prefix}${userId}`;
  };

  const getImageSrc = (image, type) => {
    let imageArray;
    try {
      imageArray = extractImageUrls(image);
    } catch (e) {
      imageArray = [];
    }
    if (imageArray.length === 0) return "";
    const uriSegments = imageArray[0].split("/");
    if (uriSegments[2] && window.location.host === uriSegments[2]) {
      return imageArray[0];
    } else if (uriSegments[5] === "bg_remove_upload_images") {
      return imageArray[0];
    } else if (type === "rejected") {
      return imageArray[0].startsWith("http")
        ? imageArray[0]
        : `/bg_remove_upload_images/${imageArray[0]}`;
    } else {
      return imageArray[0].startsWith("http")
        ? imageArray[0]
        : `/upload_images/${imageArray[0]}`;
    }
  };

  useEffect(() => {
    getDetailById();
  }, []);

  return (
    <div className="mx-auto px-[20px] sm:px-[45px] py-[20px]">
      <div className="flex justify-between items-center mb-[30px] flex-wrap gap-5">
        <h3 className="dark:text-white text-black text-[21px]">
          Message History - ID W{readActivityData?.watch_id} :{" "}
          {readActivityData?.watch_details?.brand},{" "}
          {readActivityData?.watch_details?.collection},{" "}
          {readActivityData?.watch_details?.model_no} (
          {readActivityData?.watch_details?.model_desc})
        </h3>

        <Button
          variant="contained"
          className="!bg-[#1760a9] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
          onClick={() =>
            navigate(
              `/admin/watch_details/watch_status/${readActivityData?.watch_id}`
            )
          }
        >
          View Watch Details
        </Button>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="flex-[1] mb-4 md:mb-0">
          <img
            alt="img"
            className="max-w-[350px] w-full object-cover mx-auto rounded-[8px]"
            style={{ border: "5px solid #1e252b" }}
            src={getImageSrc(
              readActivityData?.adminActivities?.[0]?.watch_pic,
              readActivityData?.type
            )}
          />
        </div>
        <div className="md:ml-8 w-full flex-[2]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
              <p className="dark:text-white text-black">ID</p>
              <p className="dark:text-white text-black">
                W{readActivityData?.watch_id}
              </p>
            </div>
            <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
              <p className="dark:text-white text-black">Brand</p>
              <p className="dark:text-white text-black">
                {readActivityData?.watch_details?.brand}
              </p>
            </div>
            <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
              <p className="dark:text-white text-black">Collection</p>
              <p className="dark:text-white text-black">
                {readActivityData?.watch_details?.collection}
              </p>
            </div>
            <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between gap-[20px] border border-gray-300 dark:border-none">
              <p className="dark:text-white text-black">Model</p>
              <p className="dark:text-white text-black whitespace-nowrap overflow-x-auto hide-scrollbar">
                {readActivityData?.watch_details?.model_no} (
                {readActivityData?.watch_details?.model_desc})
              </p>
            </div>
            <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
              <p className="dark:text-white text-black">Serial Number</p>
              <p className="dark:text-white text-black">
                {readActivityData?.watch_details?.serial_no}
              </p>
            </div>
            <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
              <p className="dark:text-white text-black">Estimate</p>
              <p className="text-[#11c71e] font-bold">
                USD{" "}
                {formattedNumber.format(
                  readActivityData?.watch_details?.accepted_price
                )}
              </p>
            </div>
            <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
              <p className="dark:text-white text-black">
                Estimator suggested wholesale price
              </p>
              <p className="dark:text-white text-black">
                {readActivityData?.assignWatchDetails?.[0]?.suggest_retail_price
                  ? `${readActivityData?.adminUserDetail?.currency} ${Number(
                      readActivityData?.assignWatchDetails?.[0]
                        ?.suggest_retail_price
                    ).toFixed(2)}`
                  : "0.00"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className=" mt-[20px] rounded-lg p-[25px] pt-[25px] pb-[35px] dark:bg-[#1e252b] bg-[#F8F8F8] dark:text-white text-black border border-gray-300 dark:border-none">
        <div className="">
          <h3 className="mb-[5px]">
            <strong className="font-bold">Subject:</strong>{" "}
            {readActivityData?.message} (
            {readActivityData?.watch_details?.brand},{" "}
            {readActivityData?.watch_details?.collection},{" "}
            {readActivityData?.watch_details?.model_no} - USD -{" "}
            {formattedNumber.format(
              readActivityData?.watch_details?.accepted_usd_price
            )}
            )
          </h3>
          <div className="flex justify-between items-center flex-wrap mb-8">
            <h3 className="mb-[5px]">
              <strong className="font-bold">From: </strong>
              {readActivityData?.watch_details?.compnay_name}{" "}
              <b className="font-bold">
                (
                {readActivityData &&
                  getAdminGroupInfo(
                    readActivityData?.admin_group,
                    readActivityData?.user1_id
                  )}
                )
              </b>
            </h3>{" "}
            <h3 className="mb-[5px]">
              <strong className="font-bold">Received: </strong>
              <span className="created_at" id="2023-04-21T00:25:19+07:00">
                {moment
                  .unix(readActivityData?.created_on)
                  .format("MMMM DD , YYYY h:mm A")}
              </span>
            </h3>
          </div>
        </div>
        <hr
          className="my-[20px]"
          style={{
            borderTopColor: staffUser ? "#DFDFDF" : "#ffffff1a",
            borderTopWidth: "2px",
          }}
        />
        <div className="message_box_inner">
          <h3 className="mb-[5px]">
            {readActivityData?.message} (USD{" "}
            {formattedNumber.format(
              readActivityData?.watch_details?.accepted_price
            )}
            )
          </h3>
          <h3 className="mb-[5px]">Status: {readActivityData?.watch_status}</h3>
          <div className="select_box text-center mt-20" data-select-box="0">
            <div className="inline-block dark:bg-[#1d2b38] bg-[#E1E9F0] p-[30px] px-[60px] border-2 border-[#1760a9] rounded-lg">
              <p className="flex items-center gap-[10px] mb-[10px]">
                <span>
                  <img
                    alt="urgent"
                    src="https://www.estipal.com/assets/dist/images/icons/Urgent 1.png"
                    className="max-w-[40px]"
                  />
                </span>
                <span className="pending_status">Pending Action:</span>
                <span>Confirmation is required</span>
              </p>
              <ul className="list-unstyled list-inline">
                <li
                  id="confirmPaymentToSeller"
                  name="10015"
                  value="1000"
                  className=""
                >
                  <a href="javascript:void(0)" className="btn dark_yellow">
                    Confirm payment to Seller
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>{" "}
      </div> */}

      {[...(readActivityData?.adminActivities || [])]
        .reverse()
        ?.map((item, index) => {
          return <CardData item={item} index={index} staffUser={staffUser} />;
        })}
    </div>
  );
};

export default ReadActivity;
