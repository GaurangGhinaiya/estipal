import { Button, CircularProgress, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaginationComponent from "../../../components/common/PaginationComponent";
import SearchBar from "../../../components/common/SearchBar";
import useDebounce from "../../../components/common/UseDebounce";
import axiosInstance from "../../../services/index";
import moment from "moment";
import WatchHistoryImage from "../../../assets/images/icons/Watch history 2.png";
import revenueImage from "../../../assets/images/icons/Revenue.png";
import performanceImage from "../../../assets/images/icons/performance.png";

const Estimators = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(null);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const userRole = localStorage.getItem("userRole");

  const getEstimatorData = async (page) => {
    setIsLoading(true);

    try {
      const searchValue = debouncedSearchTerm
        ? JSON.stringify({
            search: debouncedSearchTerm ? debouncedSearchTerm : "",
          })
        : "";

      const response = await axiosInstance.get(
        `/estimator?page=${page}&records_per_page=${recordsPerPage}&search=${searchValue}`
      );
      setData(response.payload.data);
      setTotalRecords(response?.pager?.total_records);
    } catch (error) {
      console.log("Error fetching Estimator user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page") || 1;
    setCurrentPage(Number(page));
  }, [location.search]);

  useEffect(() => {
    if (currentPage) {
      getEstimatorData(currentPage);
    }
  }, [currentPage, sortOrder, debouncedSearchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    let url = `?page=${page}`;
    navigate(url);
  };

  return (
    <div className="p-[15px] min-h-[90vh]">
      <div
        className={`px-0 sm:px-[15px]  ${
          userRole === "staff" ? "pt-8" : "pt-2"
        } flex justify-between flex-wrap`}
      >
        <h1 className="text-[30px] font-medium mb-4 px-0 sm:px-[15px] font-sans text-white">
          Estimators
        </h1>

        <div className="flex justify-between items-center mb-4 gap-4 sm:gap-8 flex-wrap">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setCurrentPage={setCurrentPage}
            placeholder={"Search estimators"}
          />

          <Button
            variant="contained"
            className="!bg-[#1760a9] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
            onClick={() =>
              navigate(`/admin/estimator/estimator_user_create`, {
                state: { type: "add" },
              })
            }
          >
            Add Estimator
          </Button>
        </div>
      </div>

      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px] ">
        <table className="table-auto w-full text-left">
          <thead style={{ borderBottom: "2px solid #111111" }}>
            <tr>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Online
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Active
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Requires Validation
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Id
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                First
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Last
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Email
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Added on
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Sent/Accepted
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Paid/Outstanding
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && data?.length === 0 ? (
              <tr>
                <td colSpan={12} className="py-[200px] px-4  text-center">
                  <CircularProgress />
                </td>
              </tr>
            ) : data?.length > 0 ? (
              data?.map((item, index) => (
                <tr key={index} className="border-b border-[#202b34]">
                  <td className="px-[18px] py-[0px] text-[#ffff] text-center">
                    <div className="require_vaild_list text-center">
                      {item?.is_user_login ? (
                        <span className="dot-green"></span>
                      ) : (
                        <span className="dot-red"></span>
                      )}
                    </div>
                  </td>
                  <td className="px-[18px] py-[0px] text-[#ffff] text-center">
                    <div className="require_vaild_list text-center">
                      {item?.active ? (
                        <span className="dot-green"></span>
                      ) : (
                        <span className="dot-red"></span>
                      )}
                    </div>
                  </td>
                  <td className="px-[18px] py-[0px] text-[#ffff] text-center">
                    <div className="require_vaild_list text-center">
                      {item?.req_validate ? (
                        <span className="dot-green"></span>
                      ) : (
                        <span className="dot-red"></span>
                      )}
                    </div>
                  </td>

                  <td
                    className="px-[18px] py-[12px] text-[#ffff] text-center cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/estimator/estimator_edit/${item?.id}`, {
                        state: { type: "edit" },
                      })
                    }
                  >
                    ECA{item?.id}
                  </td>
                  <td
                    className="px-[18px] py-[12px] text-[#ffff] cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/estimator/estimator_edit/${item?.id}`, {
                        state: { type: "edit" },
                      })
                    }
                  >
                    <div className="whitespace-nowrap text-center">
                      {item?.first_name}
                    </div>
                  </td>
                  <td
                    className="px-[18px] py-[12px] text-[#ffff] cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/estimator/estimator_edit/${item?.id}`, {
                        state: { type: "edit" },
                      })
                    }
                  >
                    <div className="whitespace-nowrap text-center">
                      {item?.last_name}
                    </div>
                  </td>
                  <td
                    className="px-[18px] py-[12px] text-[#ffff] whitespace-nowrap text-center cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/estimator/estimator_edit/${item?.id}`, {
                        state: { type: "edit" },
                      })
                    }
                  >
                    {item?.email}
                  </td>
                  <td
                    className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/estimator/estimator_edit/${item?.id}`, {
                        state: { type: "edit" },
                      })
                    }
                  >
                    {moment.unix(item?.created_on).format("DD MMM YYYY")}
                  </td>
                  <td
                    className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/estimator/estimator_edit/${item?.id}`, {
                        state: { type: "edit" },
                      })
                    }
                  >
                    {item?.total_estimator_assign_details} /{" "}
                    {item?.accepted_count}
                  </td>
                  <td
                    className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/estimator/estimator_edit/${item?.id}`, {
                        state: { type: "edit" },
                      })
                    }
                  >
                    0/0
                  </td>

                  <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                  
                        <div className="flex gap-[10px]">
                            <Tooltip title="Watches History" placement="top-start">
                      <img
                        alt="star"
                        id="star"
                        width="30px"
                        height="30px"
                        style={{ filter: "invert(1)" }}
                        className="cursor-pointer"
                        src={WatchHistoryImage}
                        onClick={() =>
                          navigate(
                            `/admin/watch_details/watch_history?estimator_id=${item?.id}`
                          )
                        }
                      /></Tooltip>
                       <Tooltip title="Activities" placement="top-start">
                      <img
                        alt="revanue"
                        width="30px"
                        height="30px"
                        style={{ filter: "invert(1)" }}
                        className="cursor-pointer"
                        src={revenueImage}
                        onClick={() => navigate(`/admin`)}
                      /></Tooltip>
                      <Tooltip
                                              title="Performance Analysis (Merchant)"
                                              placement="top-start"
                                            >
                      <img
                        alt="performance"
                        width="30px"
                        height="30px"
                        style={{ filter: "invert(1)" }}
                        className="cursor-pointer"
                        src={performanceImage}
                        onClick={() =>
                          navigate(
                            `/admin/analysis/performance_analysis/estimator`
                          )
                        }
                      /></Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={12}
                  className="py-[200px] px-4  text-center text-nowrap text-white font-bold"
                >
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalRecords}
        recordsPerPage={recordsPerPage}
        handlePageChange={handlePageChange}
        data={data}
      />
    </div>
  );
};

export default Estimators;
