import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ReadActivity = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto px-[20px] sm:px-[45px] py-[20px]">
      <div className="flex justify-between items-center mb-[30px] flex-wrap gap-5">
        <h3 className="text-white text-[21px]">
          Message History - ID W10015 : Rolex, Daytona, Stainless Steel -
          Bracelet (116500)
        </h3>

        <Button
          variant="contained"
          className="!bg-[#1760a9] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
          onClick={() => navigate("/admin/watch_details/watch_status")}
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
            src="https://cdn.estipal.com/production/2022/12/06/RYbhS159nO6DAhgQrA6O7TrmK49QZWIg767nDzEWggl0OTiL1Amd7l7Sj01S7n7Z.jpg"
          />
        </div>
        <div className="md:ml-8 w-full flex-[2]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
              <p className="text-white">Estimate</p>
              <p className="text-[#11c71e] font-bold">USD 18,500.00</p>
            </div>
            <div className="bg-[#1e252b] py-[12px] px-[24px] rounded items-center flex justify-between">
              <p className="text-white">Estimator suggested wholesale price</p>
            </div>
          </div>
        </div>
      </div>

      <div className="message_box mt-[20px]">
        <div className="border_bottom">
          <h3 className="mb-[5px]  ">
            <strong className="font-bold">Subject:</strong> Action Required!!
            Seller has sent invoice for watch (Rolex Daytona Stainless Steel -
            Bracelet 43141331 - USD 18,500.00)
          </h3>
          <div className="flex justify-between items-center flex-wrap">
            <h3 className="mb-[5px]">
              <strong className="font-bold">From: </strong>M - Mayawizard{" "}
              <b className="font-bold">( Seller - ID: SCA1000 )</b>
            </h3>{" "}
            <h3 className="mb-[5px]">
              <strong className="font-bold">Received: </strong>
              <span className="created_at" id="2023-04-21T00:25:19+07:00">
                April 20, 2023 10:55 PM
              </span>
            </h3>
          </div>
        </div>
        <hr
          className="my-[20px]"
          style={{ borderTopColor: "#ffffff1a", borderTopWidth: "2px" }}
        />
        <div className="message_box_inner">
          <h3 className="mb-[5px]">
            Seller has selected 'Sell to Estipal'. The payment of USD 20,720.00
            is required before receiving the watch.
          </h3>
          <h3 className="mb-[5px]">Status: Pending Estipal Payment</h3>
          <div className="select_box text-center mt-20" data-select-box="0">
            <div className="select_box_inner">
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
      </div>

      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="message_box mt-5 bg-gray-900 text-white p-6 rounded-lg shadow-lg"
        >
          <div className="border_bottom pb-4">
            <h3 className="mb-3">
              <strong className="font-bold">Subject:</strong> Action Required!!
              Seller has sent invoice for watch (Rolex Daytona Stainless Steel -
              Bracelet 43141331 - USD 18,500.00)
            </h3>
            <div className="flex justify-between items-center flex-wrap">
              <h3 className="mb-3">
                <strong className="font-bold">From: </strong>M - Mayawizard{" "}
                <b className="font-bold">(Seller - ID: SCA1000)</b>
              </h3>
              <h3 className="mb-3">
                <strong className="font-bold">Received: </strong>
                <span className="created_at">April 20, 2023 10:55 PM</span>
              </h3>
            </div>
          </div>
          <hr
            className="my-5"
            style={{ borderTopColor: "#ffffff1a", borderTopWidth: "2px" }}
          />
          <div className="message_box_inner">
            <h3 className="mb-3">
              Seller has selected 'Sell to Estipal'. The payment of USD
              20,720.00 is required before receiving the watch.
            </h3>
            <h3 className="mb-3">Status: Pending Estipal Payment</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadActivity;
