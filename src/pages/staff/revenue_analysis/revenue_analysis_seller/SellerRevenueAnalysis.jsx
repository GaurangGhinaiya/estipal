/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import PaginationComponent from "../../../../components/common/PaginationComponent";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../../../services";
import FilterComponent from "../../../admin/analysis/components/FilterComponent";
import SelectStatusComponent from "./components/SelectStatusComponent";
import StaffTransactionTable from "./components/StaffTransactionTable";
import SummaryTable from "./components/SummaryTable";

const SellerRevenueAnalysis = () => {
  const { t } = useTranslation();
  const [summaryData, setSummaryData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const userRole = localStorage.getItem("userRole");

  const handleSort = (key) => {
    const newOrder = sortField === key && sortOrder === "asc" ? "desc" : "asc";
    setSortField(key);
    setSortOrder(newOrder);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchSummaryData = async (fromDate, toDate) => {
    const searchObject = {};

    if (fromDate && toDate) {
      searchObject.from = fromDate;
      searchObject.to = toDate;
    }

    const searchValue = JSON.stringify(searchObject);
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/revenueAnalysis/seller?search=${searchValue}`
      );
      setSummaryData(response?.payload?.data);
    } catch (error) {
      console.error("Error fetching summary data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTransactionData = async (fromDate, toDate) => {
    const searchObject = {};

    if (fromDate && toDate) {
      searchObject.from = fromDate;
      searchObject.to = toDate;
    }

    if (selectedStatus !== "All") {
      searchObject.watch_status = selectedStatus;
    }

    const searchValue = JSON.stringify(searchObject);

    try {
      setTransactionLoading(true);
      const response = await axiosInstance.get(
        `/staffWatchActivities?page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}&sort_order=${sortOrder}&sort_field=${sortField}`
      );
      const transactions = response?.payload?.data?.map((item) => ({
        ...item,
        username: item?.addedByDetail?.username,
        company_name: item?.addedByDetail?.company_name,
      }));
      setTransactionData(transactions);
      setTotalRecords(response?.pager?.total_records);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    } finally {
      setTransactionLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, [currentPage, sortField, sortOrder]);

  useEffect(() => {
    fetchSummaryData();
  }, [currentPage]);

  useEffect(() => {
    if (fromDate && toDate) {
      fetchTransactionData(fromDate, toDate);
      fetchSummaryData(fromDate, toDate);
    } else fetchTransactionData();
  }, [selectedStatus]);

  const applyFilter = () => {
    fetchTransactionData(fromDate, toDate);
    fetchSummaryData(fromDate, toDate);
  };

  const clearFilter = () => {
    setFromDate("");
    setToDate("");
    fetchTransactionData();
    fetchSummaryData();
  };

  return (
    <div className="pb-[15px] min-h-[100vh]">
      <div className="px-0 sm:px-[20px] pt-4 flex flex-col justify-between flex-wrap bg-gradient-to-b from-[rgba(0,96,169,0.36)] to-[rgba(255,255,255,0)]">
        <h1 className="text-[26px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans dark:text-white  text-black">
          {t("REVANUEANALYSIS")}
        </h1>
        <FilterComponent
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          applyFilter={applyFilter}
          clearFilter={clearFilter}
        />
        <h1 className="text-[20px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans dark:text-white  text-black">
          Summary
        </h1>
      </div>

      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px]">
        {isLoading ? (
          <div className="py-[200px] px-4 text-center">
            <CircularProgress />
          </div>
        ) : summaryData?.length > 0 ? (
          <SummaryTable data={summaryData} />
        ) : (
          <div className="py-[200px] px-4 text-center text-nowrap dark:text-[#ffff] text-black font-bold">
            No Data Found
          </div>
        )}
      </div>

      <h1 className=" text-[20px] font-medium mb-4 mt-5 px-0 sm:px-[48px] font-sans dark:text-white text-black">
        Transactions
      </h1>
      <SelectStatusComponent
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px] mt-8">
        {transactionLoading ? (
          <div className="py-[200px] px-4 text-center">
            <CircularProgress />
          </div>
        ) : transactionData?.length > 0 ? (
          <StaffTransactionTable
            data={transactionData}
            sortField={sortField}
            sortOrder={sortOrder}
            handleSort={handleSort}
          />
        ) : (
          <div className="py-[200px] px-4 text-center text-nowrap dark:text-[#ffff] text-black font-bold">
            No Data Found
          </div>
        )}
      </div>
      <PaginationComponent
        userRole={userRole}
        currentPage={currentPage}
        totalPages={totalRecords}
        recordsPerPage={recordsPerPage}
        handlePageChange={handlePageChange}
        data={transactionData}
      />
    </div>
  );
};

export default SellerRevenueAnalysis;

// import React, { useEffect, useState } from "react";

// import { useParams } from "react-router-dom";
// import { CircularProgress } from "@mui/material";
// import { sortData } from "../../../../components/common/Sort";

// const SellerRevenueAnalysis = () => {
//   const [summaryData, setSummaryData] = useState([]);
//   const [transactionData, setTransactionData] = useState([]);
//   const [sortField, setSortField] = useState(null);
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [recordsPerPage, setRecordsPerPage] = useState(20);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [transactionLoading, setTransactionLoading] = useState(false);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("All");
//   const userRole = localStorage.getItem("userRole");

//   const handleSort = (key) => {
//     const newOrder = sortField === key && sortOrder === "asc" ? "desc" : "asc";
//     setSortField(key);
//     setSortOrder(newOrder);

//     // Sort data and update state
//     const sortedData = sortData(transactionData, key, newOrder);
//     setTransactionData(sortedData);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const fetchSummaryData = async (fromDate, toDate) => {
//     const searchObject = {
//       admin_id: seller_id,
//     };

//     if (fromDate && toDate) {
//       searchObject.from = fromDate;
//       searchObject.to = toDate;
//     }

//     const searchValue = JSON.stringify(searchObject);
//     try {
//       setIsLoading(true);
//       const response = await axiosInstance.get(
//         `/revenueAnalysis/seller?search=${searchValue}`
//       );
//       setSummaryData(response?.payload?.data);
//     } catch (error) {
//       console.error("Error fetching summary data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchTransactionData = async (fromDate, toDate) => {
//     const searchObject = {
//       seller_id: seller_id,
//     };

//     if (fromDate && toDate) {
//       searchObject.from = fromDate;
//       searchObject.to = toDate;
//     }

//     if (selectedStatus !== "All") {
//       searchObject.watch_status = selectedStatus;
//     }

//     const searchValue = JSON.stringify(searchObject);

//     try {
//       setTransactionLoading(true);
//       const response = await axiosInstance.get(
//         `/staffWatchActivities?page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}`
//       );
//       const transactions = response?.payload?.data?.map((item) => ({
//         ...item,
//         username: item?.addedByDetail?.username,
//         company_name: item?.addedByDetail?.company_name,
//       }));
//       setTransactionData(transactions);
//       setTotalRecords(response?.pager?.total_records);
//     } catch (error) {
//       console.error("Error fetching transaction data:", error);
//     } finally {
//       setTransactionLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSummaryData();
//     fetchTransactionData();
//   }, [currentPage, seller_id]);

//   useEffect(() => {
//     if (fromDate && toDate) {
//       fetchTransactionData(fromDate, toDate);
//       fetchSummaryData(fromDate, toDate);
//     } else fetchTransactionData();
//   }, [selectedStatus]);

//   const applyFilter = () => {
//     fetchTransactionData(fromDate, toDate);
//     fetchSummaryData(fromDate, toDate);
//   };

//   const clearFilter = () => {
//     setFromDate("");
//     setToDate("");
//     fetchTransactionData();
//     fetchSummaryData();
//   };
//   return (
//     <div className="pb-[15px] min-h-[100vh]">
//       <div className="px-0 sm:px-[20px] pt-4 flex flex-col justify-between flex-wrap bg-gradient-to-b from-[rgba(0,96,169,0.36)] to-[rgba(255,255,255,0)]">
//         <h1 className="text-[26px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans dark:text-white  text-black">
//           Revenue Analysis
//         </h1>
//         <div className="flex items-center sm:flex-row flex-col gap-4 space-x-4 mb-1 px-4">
//           <div className="flex items-center space-x-2">
//             <label
//               htmlFor="fromDate"
//               className="text-md dark:text-white  text-black"
//             >
//               From
//             </label>
//             <input
//               type="date"
//               id="fromDate"
//               placeholder="dd-mm-yyyy"
//               className="p-2 border rounded-md text-black"
//             />
//           </div>
//           <div className="flex items-center space-x-2">
//             <label
//               htmlFor="toDate"
//               className="text-md dark:text-white  text-black"
//             >
//               To
//             </label>
//             <input
//               type="date"
//               id="toDate"
//               placeholder="dd-mm-yyyy"
//               className="p-2 border rounded-md text-black"
//             />
//           </div>
//           <button className="bg-[#0060aa] hover:bg-[#0060aa] text-white   font-bold py-2 px-4 rounded">
//             Apply Filter
//           </button>
//           <button className="bg-[#0060aa] hover:bg-[#0060aa] text-white   font-bold py-2 px-4 rounded">
//             Clear Filter
//           </button>
//         </div>
//         <h1 className="text-[20px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans dark:text-white  text-black">
//           Summary
//         </h1>
//       </div>

//       <div className="w-[95.5%] overflow-auto mx-auto pt-[10px]">
//         <table className="table-auto w-full text-left">
//           <thead style={{ borderBottom: "2px solid #111111" }}>
//             <tr>
//               <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer">
//                 Comapny
//               </th>
//               <th className="p-2 dark:text-[#ffff]  text-black text-center cursor-pointer">
//                 Email
//               </th>
//               <th className="p-2 dark:text-[#ffff]  text-black text-center cursor-pointer">
//                 Total sold to Estipal / Amount
//               </th>
//               <th className="p-2 dark:text-[#ffff]  text-black text-center cursor-pointer">
//                 Total partner with Estipal / Amount
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {merchantData?.map((item, index) => (
//               <tr key={index} className="border-b border-[#202b34]">
//                 <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center">
//                   {item?.Company}
//                 </td>
//                 <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black whitespace-nowrap text-center cursor-pointer">
//                   {item?.Email}
//                 </td>
//                 <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
//                   {item?.Total_sold_to_Estipal}
//                 </td>
//                 <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
//                   {item?.Total_partner_with_Estipal}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <h1 className=" text-[20px] font-medium mb-4 mt-5 px-0 sm:px-[48px] font-sans dark:text-white text-black">
//         Transactions
//       </h1>
//       <div className="flex items-center space-x-2 dark:text-white text-black px-14">
//         <span>Select Status:</span>
//         <div className="relative inline-block text-left">
//           <select className="block appearance-none w-full dark:bg-gray-700 bg-white border border-gray-600 dark:text-white text-black py-2 px-4 pr-8 rounded leading-tight focus:outline-none dark:focus:bg-gray-600 focus:bg-white focus:border-gray-500">
//             <option>All</option>
//             <option>New Estimated Request</option>
//             <option>Estimated</option>
//             <option>Pass</option>
//           </select>
//           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 dark:text-white text-black">
//             <svg
//               className="fill-current h-4 w-4"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 20 20"
//             >
//               <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//             </svg>
//           </div>
//         </div>
//       </div>
//       <div className="w-[95.5%] overflow-auto mx-auto pt-[10px] mt-8">
//         <table className="table-auto w-full text-left">
//           <thead style={{ borderBottom: "2px solid #111111" }}>
//             <tr>
//               {[
//                 { key: "date", label: "Date" },
//                 { key: "company", label: "Company" },
//                 { key: "firstName", label: "First Name" },
//                 { key: "lastName", label: "Last Name" },
//                 { key: "watchId", label: "Watch ID" },
//                 { key: "model", label: "Brand / Collection / Model" },
//                 { key: "estimate", label: "Current Estimate / Accepted" },
//                 { key: "status", label: "Watch Status" },
//               ].map((column) => (
//                 <th
//                   key={column.key}
//                   onClick={() => handleSort(column.key)}
//                   className={`p-2 dark:text-[#ffff] text-black text-center cursor-pointer ${
//                     sortField === column.key ? "active-sorting" : "sorting"
//                   }`}
//                 >
//                   {column.label}{" "}
//                   {sortField === column.key &&
//                     (sortOrder === "asc" ? (
//                       <ArrowDropUpRoundedIcon />
//                     ) : (
//                       <ArrowDropDownRoundedIcon />
//                     ))}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data?.map((item, index) => (
//               <tr key={index} className="border-b border-[#202b34]">
//                 <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center">
//                   {item?.date}
//                 </td>
//                 <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap text-center">
//                   {item?.company}
//                 </td>
//                 <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center">
//                   {item?.firstName}
//                 </td>
//                 <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
//                   {item?.lastName}
//                 </td>
//                 <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
//                   {item?.watchId}
//                 </td>
//                 <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
//                   {item?.model}
//                 </td>
//                 <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
//                   {item?.estimate}
//                 </td>
//                 <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
//                   {item?.status}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <PaginationComponent
//         userRole={userRole}
//         currentPage={currentPage}
//         totalPages={data?.length}
//         recordsPerPage={recordsPerPage}
//         handlePageChange={handlePageChange}
//         data={data}
//       />
//     </div>
//   );
// };

// export default SellerRevenueAnalysis;
