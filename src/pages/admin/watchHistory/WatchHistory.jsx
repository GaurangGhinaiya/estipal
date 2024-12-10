import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import GradeIcon from "@mui/icons-material/Grade";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useState } from "react";
import PaginationComponent from "../../../components/common/PaginationComponent";
import SearchBar from "../../../components/common/SearchBar";
import SelectDropdown from "../../../components/common/SelectDropdown";
import { CircularProgress, Tooltip } from "@mui/material";
import { statusOptions } from "../components/ActivitiesTable";
import { useNavigate } from "react-router-dom";
import { sortData } from "../../../components/common/Sort";
import axiosInstance from "../../../services";
import moment from "moment/moment";
import useDebounce from "../../../components/common/UseDebounce";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const WatchHistory = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [watchActivityData, setWatchActivityData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [totalRecords, setTotalRecords] = useState(0);
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (key) => {
    const newOrder = sortField === key && sortOrder === "asc" ? "desc" : "asc";
    setSortField(key);
    setSortOrder(newOrder);

    // Sort data and update state
    const sortedData = sortData(watchActivityData, key, newOrder);
    setWatchActivityData(sortedData);
  };

  const getWatchActivityList = async () => {
    setLoading(true);
    const searchValue =
      debouncedSearchTerm || status
        ? JSON.stringify(
            debouncedSearchTerm
              ? {
                  search: debouncedSearchTerm ? debouncedSearchTerm : "",
                  watch_status: status,
                }
              : { watch_status: status }
          )
        : "";

    try {
      const response = await axiosInstance.get(
        `/staffWatchActivities?page=${currentPage}&search=${searchValue}`
      );
      if (response?.status === 200) {
        setTotalRecords(response?.pager?.total_records);
        setRecordsPerPage(response?.pager?.records_per_page);
        setWatchActivityData(response?.payload?.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWatchActivityList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, debouncedSearchTerm, status]);

  return (
    <div className="p-[15px] min-h-[100vh]">
      <div className="px-0 sm:px-[15px] flex justify-between flex-wrap">
        <h1 className="text-[30px] font-medium mb-4 px-0 sm:px-[15px] font-sans text-white">
          Watches History
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
        <table className="table-auto w-full text-left">
          <thead style={{ borderBottom: "2px solid #111111" }}>
            <tr>
              {[
                { key: "", label: "" },
                {
                  key: "checkbox",
                  label: (
                    <StarOutlineIcon
                      sx={{ color: "#9b9b9b", fontSize: "21px" }}
                    />
                  ),
                  render: () => (
                    <Checkbox
                      icon={
                        <StarOutlineIcon
                          sx={{ color: "#9b9b9b", fontSize: "21px" }}
                        />
                      }
                      checkedIcon={
                        <GradeIcon
                          sx={{ color: "#ff9300", fontSize: "21px" }}
                        />
                      }
                    />
                  ),
                },
                { key: "id", label: "ID", isSortable: true },
                { key: "brand", label: "Brand", isSortable: true },
                { key: "collection", label: "Collection", isSortable: true },
                { key: "model", label: "Model", isSortable: true },
                { key: "serial_no", label: "Serial", isSortable: true },
                { key: "compnay_name", label: "Added By", isSortable: true },
                {
                  key: "counter_offer_price",
                  label: "Asking / Estimate",
                  isSortable: true,
                },
                { key: "created_on", label: "Added On", isSortable: true },
                { key: "watch_status", label: "Status", isSortable: true },
              ]?.map((column) => (
                <th
                  key={column.key}
                  onClick={
                    column.isSortable ? () => handleSort(column.key) : undefined
                  }
                  className={`p-2 text-[#ffff] text-center ${
                    column.isSortable ? "cursor-pointer" : ""
                  } ${
                    column.isSortable && sortField === column.key
                      ? "active-sorting"
                      : ""
                  } ${
                    column.isSortable && sortField !== column.key
                      ? "sorting"
                      : ""
                  }`}
                >
                  {column.label}{" "}
                  {column.isSortable &&
                    sortField === column.key &&
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
            {loading && watchActivityData?.length === 0 ? (
              <tr>
                <td colSpan={12} className="py-[200px] px-4  text-center">
                  <CircularProgress />
                </td>
              </tr>
            ) : watchActivityData?.length > 0 ? (
              watchActivityData?.map((item, index) => (
                <tr key={index} className="border-b border-[#202b34]">
                  <td className="px-[18px] py-[0px] text-[#ffff] text-center cursor-pointer">
                    <div className="w-[35px]">
                      <div
                        role="button"
                        onClick={() =>
                          navigate(`/admin/home/readActivity/${item?.id}`)
                        }
                      >
                        <img
                          src="https://www.estipal.com/assets/dist/images/icons/icn-mai-light.svg"
                          width="25px"
                          alt="img"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-[18px] py-[10px] text-[#ffff] text-center">
                    {" "}
                    <Checkbox
                      {...label}
                      icon={
                        <StarOutlineIcon
                          sx={{ color: "#494a4b", fontSize: "21px" }}
                        />
                      }
                      checkedIcon={
                        <GradeIcon
                          sx={{ color: "#ff9300", fontSize: "21px" }}
                        />
                      }
                    />
                  </td>
                  <td
                    className="px-[18px] py-[10px] text-[#ffff] text-center cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/watch_details/watch_status/${item?.id}`)
                    }
                  >
                    W{item?.id}
                  </td>
                  <td
                    className="px-[18px] py-[10px] text-[#ffff] cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/watch_details/watch_status/${item?.id}`)
                    }
                  >
                    <Tooltip title={item?.brand} placement="top" arrow>
                      <div className="whitespace-nowrap text-center">
                        {item?.brand}
                      </div>
                    </Tooltip>
                  </td>
                  <td
                    className="px-[18px] py-[10px] text-[#ffff] whitespace-nowrap text-center cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/watch_details/watch_status/${item?.id}`)
                    }
                  >
                    {item?.collection}
                  </td>
                  <td
                    className="px-[18px] py-[10px] text-[#ffff] whitespace-nowrap text-center cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/watch_details/watch_status/${item?.id}`)
                    }
                  >
                    <Tooltip title={item?.model} placement="top" arrow>
                      <div>{item?.model}</div>
                    </Tooltip>
                  </td>
                  <td
                    className="px-[18px] py-[10px] text-[#ffff] text-center cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/watch_details/watch_status/${item?.id}`)
                    }
                  >
                    {item?.serial_no}
                  </td>
                  <td
                    className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/watch_details/watch_status/${item?.id}`)
                    }
                  >
                    {item?.compnay_name}
                  </td>
                  <td
                    className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/watch_details/watch_status/${item?.id}`)
                    }
                  >
                    USD {item?.counter_offer_price} / USD
                    {item?.estimated_watch_price}
                  </td>
                  <td
                    className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/watch_details/watch_status/${item?.id}`)
                    }
                  >
                    {moment.unix(item?.created_on).format("MMM DD,YYYY")}
                  </td>
                  <td
                    className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/watch_details/watch_status/${item?.id}`)
                    }
                  >
                    {item?.watch_status}
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
        data={watchActivityData}
      />
    </div>
  );
};

export default WatchHistory;
