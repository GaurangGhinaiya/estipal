import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaginationComponent from "../../../components/common/PaginationComponent";
import SearchBar from "../../../components/common/SearchBar";
import SelectDropdown from "../../../components/common/SelectDropdown";
import useDebounce from "../../../components/common/UseDebounce";
import AdminTable from "./components/AdminTable";
import StaffTable from "./components/StaffTable";
import useActivityData from "./hooks/useActivityData";

import alarmWatchImage from "../../../assets/images/icons/Alarm_watch_light.png";
import { translate } from "../../../language";

export const statusOptions = [
  { label: "All", value: "All" },
  { label: "Active Only", value: "Active Only" },
  { label: "Not Active Only", value: "Not Active Only" },
  { label: "Waiting for Quotation", value: "Waiting for Quotation" },
  { label: "Quotation Received", value: "Quotation Received" },
  { label: "Accepted", value: "Accepted" },
  { label: "Rejected by Staff", value: "Rejected" },
  { label: "Pass by Estimator", value: "Pass" },
  { label: "Cancel", value: "Cancel" },
  { label: "Expired", value: "Expired" },
  { label: "Pending Estipal Payment", value: "Pending Estipal Payment" },
  { label: "Paid / Pending Shipping", value: "Paid / Pending Shipping" },
  { label: "Shipped", value: "Shipped" },
  { label: "Sold", value: "Sold" },
  { label: "Completed", value: "Completed" },
];

const ActivitiesTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(null);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sellerId, setSellerId] = useState(null);
  const [estimatorId, setEstimatorId] = useState(null);
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const userRole = localStorage.getItem("userRole");

  const { activitesData, totalRecords, isLoading, getActivityData, currency } =
    useActivityData({
      currentPage,
      recordsPerPage,
      debouncedSearchTerm,
      sortOrder,
      sortField,
      status,
    });

  const handleSort = (key) => {
    const newOrder = sortField === key && sortOrder === "asc" ? "desc" : "asc";
    setSortField(key);
    setSortOrder(newOrder);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page") || 1;
    const statusQuery = queryParams.get("status") || "All";
    const seller = queryParams.get("seller_id") || null;
    const estimator = queryParams.get("estimator_id") || null;
    setEstimatorId(estimator);
    setSellerId(seller);
    setCurrentPage(Number(page));
    setStatus(statusQuery);
  }, [location.search]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    let url = `?page=${page}`;
    if (status !== "All") {
      url += `&status=${status}`;
    }
    navigate(url);
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
      return alarmWatchImage;
    }
    return "";
  };

  return (
    <div className="pb-[15px] min-h-[100vh]">
      <div
        className={`px-0 ${
          userRole === "staff" ? "pt-8" : "pt-6"
        } sm:px-[20px] flex justify-between flex-wrap dark:bg-none bg-gradient-to-b from-[rgba(0,96,169,0.36)] to-[rgba(255,255,255,0)]`}
      >
        <h1 className="text-[30px] font-medium mb-4 px-0 sm:px-[15px] font-sans dark:text-white text-black">
          {translate("ACTIVITIES")}
        </h1>
        <div className="flex justify-between items-center mb-4 gap-4 sm:gap-8 flex-wrap">
          <SelectDropdown
            title={`${translate("FILTERBYSTATUS")} :`}
            status={status}
            setStatus={setStatus}
            options={statusOptions}
            setCurrentPage={setCurrentPage}
            page={currentPage}
          />
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder={`${translate("SEARCH")}`}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px]">
        {userRole === "staff" ? (
          <StaffTable
            activitesData={activitesData}
            isLoading={isLoading}
            handleSort={handleSort}
            sortField={sortField}
            sortOrder={sortOrder}
            navigate={navigate}
            getImageSrc={getImageSrc}
            currency={currency}
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
        userRole={userRole}
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
