import React, { useEffect, useState } from "react";
import { sortData } from "../../../../components/common/Sort";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import PaginationComponent from "../../../../components/common/PaginationComponent";
import axiosInstance from "../../../../services";
import { useParams } from "react-router-dom";
import ReactSpeedometer from "react-d3-speedometer";
import { CircularProgress } from "@mui/material";
import moment from "moment";

const SellerPerformanceAnalysis = () => {
  const { seller_id } = useParams();
  const [data, setData] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  console.log("fromDate: ", fromDate, toDate);
  const staffUser = JSON.parse(localStorage.getItem("staffUser"));

  const handleSort = (key) => {
    const newOrder = sortField === key && sortOrder === "asc" ? "desc" : "asc";
    setSortField(key);
    setSortOrder(newOrder);

    // Sort data and update state
    const sortedData = sortData(data, key, newOrder);
    setData(sortedData);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/performanceAnalysis/merchant?id=${seller_id}&page=${currentPage}&records_per_page=${recordsPerPage}`
      );
      setData(response?.payload?.data);
      setTotalRecords(response?.pager?.total_records);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, sortOrder]);

  return (
    <div className="pb-[15px] min-h-[100vh]">
      <div className="px-0 sm:px-[20px] pt-4 flex flex-col justify-between flex-wrap bg-gradient-to-b from-[rgba(0,96,169,0.36)] to-[rgba(255,255,255,0)]">
        <h1 className="text-[26px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans dark:text-white  text-black">
          Performance Analysis
        </h1>
        <div className="flex items-center sm:flex-row flex-col gap-4 space-x-4 mb-1 px-4">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="fromDate"
              className="text-md dark:text-white  text-black"
            >
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
            <label
              htmlFor="toDate"
              className="text-md dark:text-white  text-black"
            >
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
          <button className="bg-[#0060aa] hover:bg-[#0060aa] text-white   font-bold py-2 px-4 rounded">
            Apply Filter
          </button>
          <button
            className="bg-[#0060aa] hover:bg-[#0060aa] text-white   font-bold py-2 px-4 rounded"
            onClick={() => {
              setFromDate("");
              setToDate("");
            }}
          >
            Clear Filter
          </button>
        </div>
        <h1 className="text-[20px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans dark:text-white  text-black">
          Summary
        </h1>
      </div>

      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px]">
        {isLoading ? (
          <div className="py-[200px] px-4 text-center">
            <CircularProgress />
          </div>
        ) : data?.summary?.length > 0 ? (
          <table className="table-auto w-full text-left">
            <thead style={{ borderBottom: "2px solid #111111" }}>
              <tr>
                <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer">
                  Staff
                </th>
                <th className="p-2 dark:text-[#ffff]  text-black text-center cursor-pointer">
                  Email
                </th>
                <th className="p-2 dark:text-[#ffff]  text-black text-center cursor-pointer">
                  Company{" "}
                </th>
                <th className="p-2 dark:text-[#ffff]  text-black text-center cursor-pointer">
                  Total Quotation Requested{" "}
                </th>
                <th className="p-2 dark:text-[#ffff]  text-black text-center cursor-pointer">
                  Total Quotation Accepted{" "}
                </th>
                <th className="p-2 dark:text-[#ffff]  text-black text-center cursor-pointer">
                  Success Rate (%){" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.summary?.map((item, index) => (
                <tr key={index} className="border-b border-[#202b34]">
                  <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center">
                    {item?.username}
                  </td>
                  <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black whitespace-nowrap text-center cursor-pointer">
                    {item?.email}
                  </td>
                  <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                    {item?.company_name}
                  </td>
                  <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                    {item?.total_quotation_requested}
                  </td>
                  <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                    {item?.total_quotation_accepted}
                  </td>
                  <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                    {Number(item?.success_rate)?.toFixed(1)}%
                  </td>
                  <td className="py-[12px] text-[#ffff] flex justify-center text-center items-center whitespace-nowrap">
                    <ReactSpeedometer
                      maxValue={100}
                      value={Number(item?.success_rate)?.toFixed(1)}
                      valueFormat={"d"}
                      customSegmentStops={[0, 25, 50, 75, 100]}
                      segmentColors={[
                        "#B13338",
                        "#E87A31",
                        "#FFFF00",
                        "#4FE000",
                      ]}
                      textColor={"white"}
                      width={130}
                      height={80}
                      ringWidth={12}
                      needleHeightRatio={0.8}
                      showPercentage={false}
                      currentValueText={""}
                      labelFontSize={"10px"}
                      valueTextFontSize="0px"
                    />
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

      <h1 className=" text-[20px] font-medium mb-4 mt-5 px-0 sm:px-[48px] font-sans dark:text-white text-black">
        Transactions
      </h1>
      <div className="flex items-center space-x-2 dark:text-white text-black px-14">
        <span>Select Status:</span>
        <div className="relative inline-block text-left">
          <select className="block appearance-none w-full dark:bg-gray-700 bg-white border border-gray-600 dark:text-white text-black py-2 px-4 pr-8 rounded leading-tight focus:outline-none dark:focus:bg-gray-600 focus:bg-white focus:border-gray-500">
            <option value="All" selected>
              All
            </option>
            <option value="Quotation Received">Quotation Received</option>
            <option value="Accepted - Deal in progress">Accepted</option>
            <option value="Rejected">Rejected by Staff</option>
            <option value="Pass">Pass by Estimator</option>
            <option value="Cancel">Cancel</option>
            <option value="Expired">Expired</option>
            <option value="Pending Estipal Payment">
              Pending Estipal Payment
            </option>
            <option value="Paid / Pending Shipping">
              Paid / Pending Shipping
            </option>
            <option value="Shipped">Shipped</option>
            <option value="Sold">Sold</option>
            <option value="Completed">Completed</option>
            <option value="Other">Other</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 dark:text-white text-black">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px] mt-8">
        {isLoading ? (
          <div className="py-[200px] px-4 text-center">
            <CircularProgress />
          </div>
        ) : data?.transactions?.length > 0 ? (
          <table className="table-auto w-full text-left">
            <thead style={{ borderBottom: "2px solid #111111" }}>
              <tr>
                {[
                  { key: "created_on", label: "Date" },
                  { key: "username", label: "Company" },
                  { key: "email", label: "Email" },
                  { key: "watchId", label: "Watch ID" },
                  { key: "model", label: "Brand / Collection / Model" },
                  { key: "estimate", label: "Current Estimate / Accepted" },
                  { key: "status", label: "Watch Status" },
                ].map((column) => (
                  <th
                    key={column.key}
                    onClick={() => handleSort(column.key)}
                    className={`p-2 dark:text-[#ffff] text-black text-center cursor-pointer ${
                      sortField === column.key ? "active-sorting" : "sorting"
                    }`}
                  >
                    {column.label}{" "}
                    {sortField === column.key &&
                      (sortOrder === "asc" ? (
                        <ArrowDropUpRoundedIcon />
                      ) : (
                        <ArrowDropDownRoundedIcon />
                      ))}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.transactions?.map((item, index) => (
                <tr key={index} className="border-b border-[#202b34]">
                  <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center">
                    {moment.unix(item?.created_on).format("MMM DD,YYYY")}
                  </td>
                  <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap text-center">
                    {item?.addedByDetail?.username}
                  </td>
                  <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center">
                    {item?.addedByDetail?.email}
                  </td>
                  <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                    W{item?.id}
                  </td>
                  <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                    {`${item?.brand} / ${item?.collection} / ${item?.model} ${item?.reference}`}
                  </td>
                  <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                    {item?.estimated_watch_price
                      ? `${item?.currency} ${Number(
                          item?.estimated_watch_price
                        ).toLocaleString()}`
                      : "-"}{" "}
                    /{" "}
                    {item?.accepted_price
                      ? `${item?.currency} ${Number(
                          item?.accepted_price
                        ).toLocaleString()}`
                      : "-"}
                  </td>

                  <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                    {item?.watch_status}
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
      <PaginationComponent
        staffUser={staffUser}
        currentPage={currentPage}
        totalPages={totalRecords}
        recordsPerPage={recordsPerPage}
        handlePageChange={handlePageChange}
        data={data}
      />
    </div>
  );
};

export default SellerPerformanceAnalysis;
