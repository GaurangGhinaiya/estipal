import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageDialog from "./components/ImageDialog";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../services";
import { extractImageUrls } from "../../../utils";
import moment from "moment";

const WatchStatus = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [watchDetailData, setWatchDetailData] = useState({});
  const [loading, setLoading] = useState(false);
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
        <h3 className="text-white text-[21px]">
          Watch History - ID : W{watchDetailData?.id}, {watchDetailData?.brand},{" "}
          {watchDetailData?.model}, Stainless Steel - Bracelet (116500)
        </h3>

        <Button
          variant="contained"
          className="!bg-[#1760a9] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
        >
          Messaging
        </Button>
      </div>

      <div className="w-full flex-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">ID</p>
            <p className="text-white">W{watchDetailData?.id}</p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Brand</p>
            <p className="text-white">{watchDetailData?.brand}</p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between gap-[25px]">
            <p className="text-white">Collection</p>
            <p className="text-white line-clamp-1">
              {watchDetailData?.collection}
            </p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Model</p>
            <p className="text-white">{watchDetailData?.model}</p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Serial Number</p>
            <p className="text-white">{watchDetailData?.serial_no}</p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Condition</p>
            <p className="text-white">Mint</p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Bracelet info</p>
            <p className="text-white">Full</p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Year of production</p>
            <p className="text-white">{watchDetailData?.year_of_prod}</p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Requested price</p>
            <p className="text-white">USD {watchDetailData?.watch_price}</p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Estimated price</p>
            <p className="text-white">
              USD {watchDetailData?.estimated_watch_price}
            </p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Warranty date</p>
            <p className="text-white">
              {" "}
              {moment.unix(watchDetailData?.updated_on).format("MMM DD,YYYY")}
            </p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Box</p>
            <p className="text-white font-bold">Yes</p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Estimator suggested wholesale price</p>
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
        className="w-[100%] overflow-auto mx-auto p-[25px] rounded-[8px] bg-[#1e252b] mb-[25px]"
        style={{ border: "1px solid #ccc" }}
      >
        <table className="table-auto w-full text-left">
          <thead style={{ borderBottom: "1px solid #ccc" }}>
            <tr>
              <th className="p-2 text-[#ffff] cursor-pointer whitespace-nowrap">
                Added by
              </th>
              <th className="p-2 text-[#ffff] cursor-pointer whitespace-nowrap">
                Estimated by
              </th>
              <th className="p-2 text-[#ffff] cursor-pointer whitespace-nowrap">
                Estimate
              </th>
              <th className="p-2 text-[#ffff] cursor-pointer whitespace-nowrap">
                Added on
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-[14px] py-[10px] text-[#ffff] whitespace-nowrap">
                {watchDetailData?.addedByDetail?.company_name} -{" "}
                {watchDetailData?.addedByDetail?.username}
              </td>
              <td className="px-[14px] py-[10px] text-[#ffff] whitespace-nowrap">
                test - nopp ice
              </td>
              <td className="px-[14px] py-[10px] text-[#ffff] whitespace-nowrap">
                USD {watchDetailData?.estimated_watch_price} (Selected)
              </td>
              <td className="px-[14px] py-[10px] text-[#ffff] whitespace-nowrap">
                {moment
                  .unix(watchDetailData?.created_on)
                  .format("MMM DD ,YYYY HH:mm:ss")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-white font-bold text-[30px] mb-2">Watch history</h2>

      <div
        className="w-[100%] overflow-auto mx-auto p-[25px] bg-[#1e252b] rounded-[8px]"
        style={{ border: "1px solid #ccc" }}
      >
        <table className="table-auto w-full text-left">
          <tbody>
            {watchDetailData?.adminActivities?.map((item, index) => (
              <tr key={index}>
                <td className="px-[14px] py-[10px] text-[#ffff] whitespace-nowrap">
                  {moment
                    .unix(item?.created_on)
                    .format("MMM DD ,YYYY HH:mm:ss")}
                </td>
                <td className="px-[14px] py-[10px] text-[#ffff] whitespace-nowrap">
                  {item?.admin_group}
                </td>
                <td className="px-[14px] py-[10px] text-[#ffff] whitespace-nowrap">
                  {item?.watch_status}
                </td>
                <td className="px-[14px] py-[10px] text-[#ffff] whitespace-nowrap">
                  USD {watchDetailData?.accepted_usd_price}
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
