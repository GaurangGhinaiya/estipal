import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import PaginationComponent from "../../../../../components/common/PaginationComponent";
import { sortData } from "../../../../../components/common/Sort";
import axiosInstance from "../../../../../services";
import SelectStatusComponent from "./components/SelectStatusComponent";
import SummaryTable from "./components/SummaryTable";
import TransactionTable from "./components/TransactionTable";
import FilterComponent from "./components/FilterComponent";

const EstimatorPerformanceAnalysis = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [sortField, setSortField] = useState("estimation_assign_date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [groupBy, setGroupBy] = useState("all");
  const userRole = localStorage.getItem("userRole");

  const handleSort = (key) => {
    if (sortField !== key) {
      // first click on new field → asc
      setSortField(key);
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      // second click → desc
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      // third click → reset
      setSortField("estimation_assign_date");
      setSortOrder("desc");
    }
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
      searchObject.estimator_watch_status = selectedStatus;
    }

    // if (groupBy !== "all") {
    //   searchObject.group_by = groupBy;
    // }

    const searchValue = JSON.stringify(searchObject);

    try {
      const response = await axiosInstance.get(
        `/performanceAnalysis/estimator?page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}&sort_order=${sortOrder}&sort_by=${sortField}&group_by=${groupBy}`
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
    setLoadingSummary(true);
    setLoadingTransactions(true);
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    setLoadingTransactions(true);
    if (fromDate && toDate) {
      fetchData(fromDate, toDate);
    } else fetchData();
  }, [selectedStatus, sortOrder, sortField]);

  useEffect(() => {
    setLoadingSummary(true);
    fetchData(fromDate, toDate);
  }, [groupBy]);

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
    setGroupBy("all");
  };

  return (
    <div className="pb-[15px] min-h-[100vh]">
      <div className="px-0 sm:px-[20px] pt-4 flex flex-col justify-between flex-wrap">
        <h1 className="text-[26px] font-medium mb-4 mt-5 px-[15px] font-sans dark:text-white  text-black">
          Performance Analysis (Estimator)
        </h1>
        <FilterComponent
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          applyFilter={applyFilter}
          clearFilter={clearFilter}
          groupBy={groupBy}
          setGroupBy={setGroupBy}
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
          <SummaryTable data={summaryData} groupBy={groupBy} />
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
        {loadingTransactions && (
          <div className="py-[200px] absolute bg-[#ffffff00]  top-0 left-0 right-0 bottom-0 px-4 text-center">
            <CircularProgress />
          </div>
        )}
        <TransactionTable
          data={transactionData}
          sortField={sortField}
          sortOrder={sortOrder}
          handleSort={handleSort}
        />
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

export default EstimatorPerformanceAnalysis;
