import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../../services";
import FilterComponent from "../../components/FilterComponent";

const EstimatorRevanueAnalysis = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (fromDate, toDate) => {
    const searchObject = {};

    if (fromDate && toDate) {
      searchObject.from = fromDate;
      searchObject.to = toDate;
    }

    const searchValue = JSON.stringify(searchObject);

    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/revenueAnalysis/estimator?search=${searchValue}`
      );
      setData(response?.payload?.data);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    } finally {
      setLoading(false);
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
    <div className="p-[15px]">
      <div className="px-0 sm:px-[15px] flex flex-col justify-between flex-wrap">
        <h1 className="text-[26px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans text-white">
          Revenue Analysis (Estimator)
        </h1>
        <FilterComponent
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          applyFilter={applyFilter}
          clearFilter={clearFilter}
        />
        <h1 className="text-[20px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans text-white">
          Summary
        </h1>
      </div>

      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px] h-[100vh]">
        {loading ? (
          <div className="py-[200px] px-4 text-center">
            <CircularProgress />
          </div>
        ) : data?.length > 0 ? (
          <table className="table-auto w-full text-left">
            <thead style={{ borderBottom: "2px solid #111111" }}>
              <tr>
                <th className="p-2 text-[#ffff] text-center cursor-pointer whitespace-nowrap">
                  Comapny
                </th>
                <th className="p-2 text-[#ffff] text-center cursor-pointer whitespace-nowrap">
                  Email
                </th>
                <th className="p-2 text-[#ffff] text-center cursor-pointer whitespace-nowrap">
                  Total Completed deal
                </th>
                <th className="p-2 text-[#ffff] text-center cursor-pointer whitespace-nowrap">
                  Total Bought
                </th>
                <th className="p-2 text-[#ffff] text-center cursor-pointer whitespace-nowrap">
                  Total Sold
                </th>
                <th className="p-2 text-[#ffff] text-center cursor-pointer whitespace-nowrap">
                  Total Profit
                </th>
                <th className="p-2 text-[#ffff] text-center cursor-pointer whitespace-nowrap">
                  Total Commission Payable / Paid
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index} className="border-b border-[#202b34]">
                  <td className="px-[18px] py-[12px] text-[#ffff] text-center">
                    {item?.company_name}
                  </td>
                  <td className="px-[18px] py-[12px] text-[#ffff] whitespace-nowrap text-center cursor-pointer">
                    {item?.email}
                  </td>
                  <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                    {item?.total_completed_deal}
                  </td>
                  <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                    USD {item?.total_bought}
                  </td>
                  <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                    USD {item?.total_sold}
                  </td>
                  <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                    USD {item?.total_profit}
                  </td>
                  <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                    {item?.total_commission_payable} / {item?.paid}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-[200px] px-4 text-center text-nowrap dark:text-[#ffff] text-black font-bold">
            No Data Found
          </div>
        )}
      </div>
    </div>
  );
};

export default EstimatorRevanueAnalysis;
