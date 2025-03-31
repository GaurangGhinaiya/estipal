import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../../services";
import { CircularProgress } from "@mui/material";

const AdminRevanueAnalysis = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchData = async (fromDate, toDate) => {
    const searchObject = {};

    if (fromDate && toDate) {
      searchObject.from = fromDate;
      searchObject.to = toDate;
    }

    const searchValue = JSON.stringify(searchObject);

    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/revenueAnalysis/merchant?search=${searchValue}`
      );
      setData(response?.payload?.data);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const applyFilter = () => {
    fetchData(fromDate, toDate);
  };

  const clearFilter = () => {
    setFromDate("");
    setToDate("");
    fetchData();
  };

  return (
    <div className="p-[15px] h-[100vh]">
      <div className="px-0 sm:px-[15px] flex flex-col justify-between flex-wrap">
        <h1 className="text-[26px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans text-white">
          Revenue Analysis (Merchant)
        </h1>
        <div className="flex items-center sm:flex-row flex-col gap-4 space-x-4 mb-1 px-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="fromDate" className="text-md text-white">
              From
            </label>
            <input
              type="date"
              id="fromDate"
              placeholder="dd-mm-yyyy"
              className="p-2 border rounded-md text-black"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="toDate" className="text-md text-white">
              To
            </label>
            <input
              type="date"
              id="toDate"
              placeholder="dd-mm-yyyy"
              className="p-2 border rounded-md text-black"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <button
            className="bg-[#0060aa] hover:bg-[#0060aa] text-white font-bold py-2 px-4 rounded"
            onClick={applyFilter}
          >
            Apply Filter
          </button>
          <button
            className="bg-[#0060aa] hover:bg-[#0060aa] text-white font-bold py-2 px-4 rounded"
            onClick={clearFilter}
          >
            Clear Filter
          </button>
        </div>
        <h1 className="text-[20px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans text-white">
          Summary
        </h1>
      </div>

      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px]">
        {isLoading ? (
          <div className="py-[200px] px-4 text-center">
            <CircularProgress />
          </div>
        ) : data?.length > 0 ? (
          <table className="table-auto w-full text-left">
            <thead style={{ borderBottom: "2px solid #111111" }}>
              <tr>
                <th className="p-2 text-[#ffff] text-center cursor-pointer">
                  Company
                </th>
                <th className="p-2 text-[#ffff] text-center cursor-pointer">
                  Email
                </th>
                <th className="p-2 text-[#ffff] text-center cursor-pointer">
                  Total sold to Estipal / Amount
                </th>
                <th className="p-2 text-[#ffff] text-center cursor-pointer">
                  Total partner with Estipal / Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index} className="border-b border-[#202b34]">
                  <td className="px-[18px] py-[12px] text-[#ffff] text-center">
                    {item?.cmp_name}
                  </td>
                  <td className="px-[18px] py-[12px] text-[#ffff] whitespace-nowrap text-center cursor-pointer">
                    {item?.email}
                  </td>
                  <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                    {item?.total_sold_to_estipal} / USD{" "}
                    {item?.total_sold_amount.toLocaleString()}
                  </td>
                  <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                    {item?.total_partner_with_estipal} / USD{" "}
                    {item?.total_partner_amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-[200px] px-4 text-center text-nowrap text-white font-bold">
            No Data Found
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRevanueAnalysis;
