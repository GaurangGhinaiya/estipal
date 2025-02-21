import React, { useEffect, useState } from "react";
import { sortData } from "../../../../components/common/Sort";
import PaginationComponent from "../../../../components/common/PaginationComponent";
import axiosInstance from "../../../../services";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import FilterComponent from "./components/FilterComponent";
import SummaryTable from "./components/SummaryTable";
import TransactionTable from "./components/TransactionTable";
import SelectStatusComponent from "./components/SelectStatusComponent";

const SellerPerformanceAnalysis = () => {
  const { seller_id } = useParams();
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
  const staffUser = JSON.parse(localStorage.getItem("staffUser"));

  const handleSort = (key) => {
    const newOrder = sortField === key && sortOrder === "asc" ? "desc" : "asc";
    setSortField(key);
    setSortOrder(newOrder);

    // Sort data and update state
    const sortedData = sortData(transactionData, key, newOrder);
    setTransactionData(sortedData);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchSummaryData = async (fromDate, toDate) => {
    const searchObject = {
      admin_id: seller_id,
    };

    if (fromDate && toDate) {
      searchObject.from = fromDate;
      searchObject.to = toDate;
    }

    const searchValue = JSON.stringify(searchObject);
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/staffUserRoute?search=${searchValue}`
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
        `/performanceAnalysis/merchant?id=${seller_id}&page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}`
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
    fetchSummaryData();
    fetchTransactionData();
  }, [currentPage, seller_id]);

  useEffect(() => {
    fetchTransactionData();
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
      <div className="px-0 sm:px-[20px] pt-4 flex flex-col justify-between flex-wrap">
        <h1 className="text-[26px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans dark:text-white  text-black">
          Performance Analysis
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
          <TransactionTable
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
        staffUser={staffUser}
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
