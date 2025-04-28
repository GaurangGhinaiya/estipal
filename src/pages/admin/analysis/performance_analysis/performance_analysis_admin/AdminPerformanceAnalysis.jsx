import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PaginationComponent from "../../../../../components/common/PaginationComponent";
import { sortData } from "../../../../../components/common/Sort";
import axiosInstance from "../../../../../services";
import FilterComponent from "../../components/FilterComponent";
import SelectStatusComponent from "./components/SelectStatusComponent";
import SummaryTable from "./components/SummaryTable";
import TransactionTable from "./components/TransactionTable";

const AdminPerformanceAnalysis = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [sortField, setSortField] = useState("created_on");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
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

  const fetchData = async (fromDate, toDate) => {
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
      const response = await axiosInstance.get(
        `/performanceAnalysis/merchant?page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}&sort_order=${sortOrder}&sort_by=${sortField}`
      );

      setSummaryData(response?.payload?.data?.summary);
      setTransactionData(response?.payload?.data?.transactions);
      setTotalRecords(Number(response?.payload?.pager?.total_records));
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    } finally {
      setLoadingSummary(false);
      setLoadingTransactions(false);
    }
  };

  useEffect(() => {
    setLoadingTransactions(true);
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    setLoadingTransactions(true);

    if (fromDate && toDate) {
      fetchData(fromDate, toDate);
    } else fetchData();
  }, [selectedStatus, sortOrder, sortField]);

  const applyFilter = () => {
    setLoadingSummary(true);
    setLoadingTransactions(true);
    fetchData(fromDate, toDate);
  };

  const clearFilter = () => {
    setFromDate("");
    setToDate("");
    fetchData();
    setLoadingSummary(true);
    setLoadingTransactions(true);
  };
  return (
    <div className="pb-[15px] min-h-[100vh]">
      <div className="px-0 sm:px-[20px] pt-4 flex flex-col justify-between flex-wrap">
        <h1 className="text-[26px] font-medium mb-4 mt-5 px-[15px] font-sans dark:text-white  text-black">
          Performance Analysis (Merchant)
        </h1>
        <FilterComponent
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          applyFilter={applyFilter}
          clearFilter={clearFilter}
        />
        <h1 className="text-[20px] font-medium mb-4 mt-5 px-[15px] font-sans dark:text-white  text-black">
          Summary
        </h1>
      </div>

      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px]">
        {loadingSummary ? (
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

      <h1 className=" text-[20px] font-medium mb-4 mt-5 px-[20px] sm:px-[48px] font-sans dark:text-white text-black">
        Transactions
      </h1>
      <SelectStatusComponent
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        setCurrentPage={setCurrentPage}
      />
      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px] mt-8 relative">
        {loadingTransactions ? (
          <div className="py-[200px] px-4 text-center">
            <CircularProgress />
          </div>
        ) : (
          <TransactionTable
            data={transactionData}
            sortField={sortField}
            sortOrder={sortOrder}
            handleSort={handleSort}
          />
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

export default AdminPerformanceAnalysis;
