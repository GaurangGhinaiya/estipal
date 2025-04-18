/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import PaginationComponent from "../../../../components/common/PaginationComponent";
import { translate } from "../../../../language";
import axiosInstance from "../../../../services";
import FilterComponent from "../../../admin/analysis/performance_analysis/performance_analysis_estimator/components/FilterComponent";
import SelectStatusComponent from "./components/SelectStatusComponent";
import StaffTransactionTable from "./components/StaffTransactionTable";
import SummaryTable from "./components/SummaryTable";

const SellerPerformanceAnalysis = () => {
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
  const [groupBy, setGroupBy] = useState("all");
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
      const url =
        groupBy === "all"
          ? `/staffUser?search=${searchValue}`
          : `/staffUser?search=${searchValue}&group_by=${groupBy}`;
      const response = await axiosInstance.get(url);
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
        `/performanceAnalysis/seller?page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}&sort_order=${sortOrder}&sort_by=${sortField}`
      );
      const transactions = response?.payload?.data?.transactions.map(
        (item) => ({
          ...item,
          username: item?.addedByDetail?.username,
          email: item?.addedByDetail?.email,
          company: item?.addedByDetail?.company,
        })
      );
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
  }, [currentPage, sortOrder, sortField]);

  useEffect(() => {
    fetchSummaryData();
  }, []);

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

  useEffect(() => {
    fetchSummaryData(fromDate, toDate);
  }, [groupBy]);

  const clearFilter = () => {
    setFromDate("");
    setToDate("");
    fetchTransactionData();
    fetchSummaryData();
  };

  return (
    <div className="pb-[15px] min-h-[100vh]">
      <div className="px-[20px] pt-4 flex flex-col justify-between flex-wrap bg-gradient-to-b from-[rgba(0,96,169,0.36)] to-[rgba(255,255,255,0)]">
        <h1 className="text-[30px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans dark:text-white  text-black">
          {translate("PERFORMANCEANALYSIS")}
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
          <SummaryTable data={summaryData} groupBy={groupBy} />
        ) : (
          <div className="py-[200px] px-4 text-center text-nowrap dark:text-[#ffff] text-black font-bold">
            No Data Found
          </div>
        )}
      </div>
      <h1 className=" text-[20px] font-medium mb-4 mt-5 px-0 sm:px-[48px] font-sans dark:text-white text-black">
        {translate("TRANSACTIONS")}
      </h1>
      <SelectStatusComponent
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        setCurrentPage={setCurrentPage}
      />
      <div className="w-[95.5%] overflow-auto mx-auto relative pt-[10px] mt-8">
        {transactionLoading && (
          <div className="absolute bg-[#ffffff00] top-[40%] left-0 right-0 bottom-0 px-4 text-center">
            <CircularProgress />
          </div>
        )}
        <StaffTransactionTable
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

export default SellerPerformanceAnalysis;
