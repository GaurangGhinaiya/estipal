import { Button } from "@mui/material";
import React, { useState } from "react";
import ImageDialog from "./components/ImageDialog";

const watchHistory = [
  {
    time: "April 20, 2023 10:55 PM ",
    name: "mayawizard",
    text: "Pending Estipal Payment",
    val: "USD 20,720.00",
  },
  {
    time: "December 06, 2022 09:06 AM",
    name: "test - nopp ice",
    text: "Accepted - Deal in progress",
    val: "USD 18,500.00",
  },
  {
    time: "December 06, 2022 09:05 AM",
    name: "M - demo staff1",
    text: "Pending second counter offer",
    val: "USD 18,500.00",
  },
  {
    time: "December 06, 2022 08:59 AM",
    name: "test - nopp ice",
    text: "Re-estimate",
    val: "USD 18,000.00",
  },
  {
    time: "December 06, 2022 08:58 AM",
    name: "M - demo staff1",
    text: "Pending first counter offer",
    val: "USD 19,000.00",
  },
  {
    time: "December 06, 2022 08:47 AM",
    name: "test - nopp ice",
    text: "Estimated",
    val: "USD 17,500.00",
  },
  {
    time: "December 06, 2022 08:43 AM",
    name: "M - demo staff1",
    text: "Waiting for Quotation",
    val: "USD 20,000.00",
  },
];

const imageData = [
  {
    image:
      "https://cdn.estipal.com/production/2022/12/06/RYbhS159nO6DAhgQrA6O7TrmK49QZWIg767nDzEWggl0OTiL1Amd7l7Sj01S7n7Z.jpg",
  },
  {
    image:
      "https://cdn.estipal.com/production/2022/12/06/pOTO1gmWgUOTGEm90fPLc7eE2t4js960sH2DL4rN6dWnl6YaWDY1Cy6gCFwt0dxQ.jpg",
  },
  {
    image:
      "https://cdn.estipal.com/production/2022/12/06/rGs42n6j6IqhC8OBe2X86EB1ov6oCmqRJODN636rxm07fMWtE9kOq001CXRhdZ09.jpg",
  },
  {
    image:
      "https://cdn.estipal.com/production/2022/12/06/y5HwZcPMLSgaZbfFldp6zFIT929MU8Y1e4vdW6Qb7DjhSY6VVm2B4r8o08fkHoDH.jpg",
  },
  {
    image:
      "https://cdn.estipal.com/production/2022/12/06/Z8WpvHAW76Fa28mMwFlH9vv90G8IG7n17OMQFyJyXGCmt8F7Q2N2ltVlmAU4m7pa.jpg",
  },
  {
    image:
      "https://cdn.estipal.com/production/2022/12/06/clxEK3fP9dXEGAppybHGvBSJl0p7Z7o3Nn5DI6d7FgkYH8klu4HNv1A7HMlPg46L.jpg",
  },
  {
    image:
      "https://cdn.estipal.com/production/2022/12/06/ow7ICBarTYbzACeFFa6wC0XC4762tH5ImL2U8OYQx7jXA2CBSZSqZPy0p9x6T3BG.jpg",
  },
  {
    image:
      "https://cdn.estipal.com/production/2022/12/06/4D1D5KDbX0QOrLkZX19gFss2wZrBdyuWiK9s2zDhw5JYvZQ9H0QYUr0K7Ri6FG20.jpeg",
  },
];

const WatchStatus = () => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOpenDialog = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div className="mx-auto px-[20px] sm:px-[45px] py-[20px]">
      <div className="flex justify-between items-center mb-[30px] flex-wrap gap-5">
        <h3 className="text-white text-[21px]">
          Watch History - ID : W10015, Rolex, Daytona, Stainless Steel -
          Bracelet (116500)
        </h3>

        <Button
          variant="contained"
          className="!bg-[#1760a9] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
        >
          Messaging
        </Button>
      </div>

      <div className=" w-full flex-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">ID</p>
            <p className="text-white">W10015</p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Brand</p>
            <p className="text-white">Rolex</p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Collection</p>
            <p className="text-white">Daytona</p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Model</p>
            <p className="text-white">Stainless Steel - Bracelet (116500)</p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Serial Number</p>
            <p className="text-white">43141331</p>
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
            <p className="text-white">2019</p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Requested price</p>
            <p className="text-white">USD 20,000.00</p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Estimated price</p>
            <p className="text-white">USD 18,500.00</p>
          </div>
          <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
            <p className="text-white">Warranty date</p>
            <p className="text-white">9 March 2022</p>
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
        {imageData?.map((item, index) => (
          <div key={index} onClick={() => handleOpenDialog(index)}>
            <img
              style={{ border: "5px solid #1e252b" }}
              className="img-border rounded-[8px]"
              src={item.image}
              alt="img"
              className="w-[200px] h-[200px] mx-auto cursor-pointer"
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
              </th>{" "}
              <th className="p-2 text-[#ffff] cursor-pointer whitespace-nowrap">
                Estimated by
              </th>{" "}
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
                M - demo staff1
              </td>{" "}
              <td className="px-[14px] py-[10px] text-[#ffff] whitespace-nowrap">
                test - nopp ice
              </td>{" "}
              <td className="px-[14px] py-[10px] text-[#ffff] whitespace-nowrap">
                USD 17,500.00 (Selected)
              </td>{" "}
              <td className="px-[14px] py-[10px] text-[#ffff] whitespace-nowrap">
                December 06, 2022 08:43 AM
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
            {watchHistory.map((item, index) => (
              <tr>
                <td className="px-[14px] py-[10px] text-[#ffff] whitespace-nowrap">
                  {item.time}
                </td>{" "}
                <td className="px-[14px] py-[10px] text-[#ffff] whitespace-nowrap">
                  {item.name}
                </td>{" "}
                <td className="px-[14px] py-[10px] text-[#ffff] whitespace-nowrap">
                  {item.text}
                </td>{" "}
                <td className="px-[14px] py-[10px] text-[#ffff] whitespace-nowrap">
                  {item.val}
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
        imageData={imageData}
      />
    </div>
  );
};

export default WatchStatus;
