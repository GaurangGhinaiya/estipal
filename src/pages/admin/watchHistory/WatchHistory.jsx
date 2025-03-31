import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import PaginationComponent from "../../../components/common/PaginationComponent";
import SearchBar from "../../../components/common/SearchBar";
import SelectDropdown from "../../../components/common/SelectDropdown";
import useDebounce from "../../../components/common/UseDebounce";
import axiosInstance from "../../../services";
import { statusOptions } from "../activities/ActivitiesTable";
import AdminUserWatchHistory from "./component/AdminUserWatchHistory";
import StaffUserWatchHistory from "./component/StaffUserWatchHistory";

const WatchHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [watchActivityData, setWatchActivityData] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sellerId, setSellerId] = useState(null);
  const [estimatorId, setEstimatorId] = useState(null);
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const staffUser = JSON.parse(localStorage.getItem("staffUser"));

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
    if (sellerId) {
      url += `&seller_id=${sellerId}`;
    }
    if (estimatorId) {
      url += `&estimator_id=${estimatorId}`;
    }
    navigate(url);
  };

  const getWatchActivityList = async () => {
    setLoading(true);

    const searchValue =
      debouncedSearchTerm || status !== "All" || sellerId || estimatorId
        ? JSON.stringify({
            ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
            ...(status !== "All" && { watch_status: status }),
            ...(sellerId && { seller_id: sellerId }),
            ...(estimatorId && { estimator_id: estimatorId }),
          })
        : "";

    try {
      const response = await axiosInstance.get(
        `/staffWatchActivities?page=${currentPage}&records_per_page=${10}&search=${searchValue}`
      );
      if (response?.status === 200) {
        setTotalRecords(response?.pager?.total_records);
        setRecordsPerPage(response?.pager?.records_per_page);
        setWatchActivityData(response?.payload?.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage) {
      getWatchActivityList();
    }
  }, [currentPage, debouncedSearchTerm, status]);

  return (
    <div className="pb-[15px] min-h-[100vh]">
      <div className="px-0 sm:px-[20px] pt-8 flex justify-between flex-wrap dark:bg-none bg-gradient-to-b from-[rgba(0,96,169,0.36)] to-[rgba(255,255,255,0)]">
        <h1 className="text-[30px] font-medium mb-4 px-0 sm:px-[15px] font-sans dark:text-[#ffff] text-black ">
          Watches History
        </h1>

        <div className="flex justify-between items-center mb-4 gap-4 sm:gap-8 flex-wrap">
          <SelectDropdown
            title="Filter by Status :"
            status={status}
            setStatus={setStatus}
            options={statusOptions}
            setCurrentPage={setCurrentPage}
            page={currentPage}
            sellerId={sellerId}
            estimatorId={estimatorId}
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
          <StaffUserWatchHistory
            watchActivityData={watchActivityData}
            setWatchActivityData={setWatchActivityData}
            loading={loading}
          />
        ) : (
          <AdminUserWatchHistory
            watchActivityData={watchActivityData}
            setWatchActivityData={setWatchActivityData}
            loading={loading}
          />
        )}
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalRecords}
        recordsPerPage={recordsPerPage}
        handlePageChange={handlePageChange}
        data={watchActivityData}
        staffUser={staffUser}
      />
    </div>
  );
};

export default WatchHistory;
