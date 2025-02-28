import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PaginationComponent from "../../../components/common/PaginationComponent";
import SearchBar from "../../../components/common/SearchBar";
import SelectDropdown from "../../../components/common/SelectDropdown";
import { sortData } from "../../../components/common/Sort";
import useDebounce from "../../../components/common/UseDebounce";
import axiosInstance from "../../../services/index";
import AdminTable from "./AdminTable";
import StaffTable from "./StaffTable";

export const statusOptions = [
  "All",
  "Active Only",
  "Not Active Only",
  "Waiting for Quotation",
  "Quotation Received",
  "Accepted",
  "Rejected by Staff",
  "Pass by Estimator",
  "Cancel",
  "Expired",
  "Pending Estipal Payment",
  "Paid / Pending Shipping",
  "Shipped",
  "Sold",
  "Completed",
];

const ActivitiesTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [activitesData, setActivitiesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const staffUser = JSON.parse(localStorage.getItem("staffUser"));
  console.log("staffUser: ", staffUser);

  const handleSort = (key) => {
    const newOrder = sortField === key && sortOrder === "asc" ? "desc" : "asc";
    setSortField(key);
    setSortOrder(newOrder);

    // Sort data and update state
    const sortedData = sortData(activitesData, key, newOrder);
    setActivitiesData(sortedData);
  };

  const getActivityData = async () => {
    try {
      setIsLoading(true);

      const searchObject = {
        search: debouncedSearchTerm || "",
      };

      if (status && status !== "All") {
        searchObject.watch_status = status;
      }

      const searchValue = JSON.stringify(searchObject);

      const response = await axiosInstance.get(
        `/adminActivity?page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}&sort_order=${sortOrder}&sort_field=${sortField}`
      );

      setActivitiesData(response.payload.data);
      setTotalRecords(response?.pager?.total_records);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page") || 1;
    setCurrentPage(Number(page));
  }, [location.search]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  useEffect(() => {
    if (currentPage) {
      getActivityData();
    }
  }, [currentPage, sortOrder, debouncedSearchTerm, status]);

  const getImageSrc = (activity) => {
    if (
      activity?.staffWatchActivityDetails?.progress === 2 ||
      activity?.staffWatchActivityDetails?.progress === 4 ||
      activity?.staffWatchActivityDetails?.progress === 5
    ) {
      return "https://www.estipal.com/assets/dist/images/icons/Alarm_watch_light.png";
    }
    return "";
  };

  return (
    <div className=" pb-[15px] min-h-[100vh]">
      <div className="px-0 pt-6 sm:px-[20px] flex justify-between flex-wrap dark:bg-none bg-gradient-to-b from-[rgba(0,96,169,0.36)] to-[rgba(255,255,255,0)]">
        <h1 className="text-[30px] font-medium mb-4 px-0 sm:px-[15px] font-sans dark:text-white text-black">
          Activities
        </h1>

        <div className="flex justify-between items-center mb-4 gap-4 sm:gap-8 flex-wrap ">
          <SelectDropdown
            title="Filter by Status :"
            status={status}
            setStatus={setStatus}
            options={statusOptions}
          />

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder={"Search"}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px]">
        {staffUser ? (
          <StaffTable
            activitesData={activitesData}
            isLoading={isLoading}
            handleSort={handleSort}
            sortField={sortField}
            sortOrder={sortOrder}
            navigate={navigate}
            getImageSrc={getImageSrc}
          />
        ) : (
          <AdminTable
            activitesData={activitesData}
            isLoading={isLoading}
            handleSort={handleSort}
            sortField={sortField}
            sortOrder={sortOrder}
            navigate={navigate}
            getImageSrc={getImageSrc}
          />
        )}
      </div>
      <PaginationComponent
        staffUser={staffUser}
        currentPage={currentPage}
        totalPages={totalRecords}
        recordsPerPage={recordsPerPage}
        handlePageChange={handlePageChange}
        data={activitesData}
      />
    </div>
  );
};

export default ActivitiesTable;
