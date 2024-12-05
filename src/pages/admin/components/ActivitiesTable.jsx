import GradeIcon from "@mui/icons-material/Grade";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useRef, useState } from "react";
import PaginationComponent from "../../../components/common/PaginationComponent";
import SearchBar from "../../../components/common/SearchBar";
import SelectDropdown from "../../../components/common/SelectDropdown";
import { CircularProgress, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { sortData } from "../../../components/common/Sort";
import axiosInstance from "../../../services/index";
import moment from "moment/moment";
import useDebounce from "../../../components/common/UseDebounce";


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

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ActivitiesTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [activitesData, setActivitiesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const handleSort = (key) => {
    const newOrder = sortField === key && sortOrder === "asc" ? "desc" : "asc";
    setSortField(key);
    setSortOrder(newOrder);

    // Sort data and update state
    const sortedData = sortData(activitesData, key, newOrder);
    setData(sortedData);
  };

  const getActivityData = async () => {
    try {
      const searchValue = debouncedSearchTerm || status ? JSON.stringify(debouncedSearchTerm ? { search: debouncedSearchTerm ? debouncedSearchTerm : "", watch_status: status } : { watch_status: status }) : '';

      setIsLoading(true);
      const response = await axiosInstance.get(`/adminActivity?page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}&sort_order=${sortOrder}`);
      setData(response.payload.data)
      setActivitiesData(response.payload.data)
      setTotalRecords(response?.pager?.total_records)
      setIsLoading(false)
    } catch (error) {
      console.log("error", error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getActivityData()
  }, [currentPage, sortOrder, debouncedSearchTerm, status]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-[15px] min-h-[100vh]">
      <div className="px-0 sm:px-[15px] flex justify-between flex-wrap">
        <h1 className="text-[30px] font-medium mb-4 px-0 sm:px-[15px] font-sans text-white">
          Activities
        </h1>

        <div className="flex justify-between items-center mb-4 gap-4 sm:gap-8 flex-wrap ">
          <SelectDropdown
            title=" Filter by Status :"
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
                { key: "who", label: "Who", isSortable: true },
                { key: "from", label: "From", isSortable: true },
                { key: "id", label: "ID", isSortable: true },
                { key: "message", label: "Message", isSortable: false },
                { key: "watchId", label: "Watch Id", isSortable: true },
                { key: "status", label: "Status", isSortable: true },
                { key: "received", label: "Received", isSortable: true },
              ].map((column) => (
                <th
                  key={column.key}
                  onClick={
                    column.isSortable ? () => handleSort(column.key) : undefined
                  }
                  className={`p-2 text-[#ffff] text-center ${column.isSortable ? "cursor-pointer" : ""
                    } ${column.isSortable && sortField === column.key
                      ? "active-sorting"
                      : ""
                    } ${column.isSortable && sortField !== column.key
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
            {isLoading && activitesData?.length === 0 ?
              <tr>
                <td colSpan={12} className="py-[200px] px-4  text-center">
                  <CircularProgress />
                </td>
              </tr>
              :
              (activitesData?.length > 0 ? activitesData?.map((activity, index) => (
                <tr
                  key={index}
                  className="border-b border-[#202b34]"
                  onClick={() => navigate(`/admin/home/readActivity/${activity?.watch_details?.serial_no}`)}
                >
                  <td className="px-[18px] py-[0px] text-[#ffff] text-center">
                    <div className="w-[35px]">
                      <a href="#" role="button">
                        <img
                          alt="img"
                          src="https://www.estipal.com/assets/dist/images/icons/Alarm_watch_light.png"
                          width="35px"
                        />
                      </a>
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
                        <GradeIcon sx={{ color: "#ff9300", fontSize: "21px" }} />
                      }
                    />
                  </td>
                  <td className="px-[18px] py-[10px] text-[#ffff] text-center">
                    {activity?.admin_group}
                  </td>
                  <td className="px-[18px] py-[10px] text-[#ffff] cursor-pointer">
                    <Tooltip title={activity.from ? activity.from : "-"} placement="top" arrow>
                      <div className="w-[77px] text-center">{activity.from ? activity.from : "-"}</div>
                    </Tooltip>
                  </td>
                  <td className="px-[18px] py-[10px] text-[#ffff] text-center">
                    {activity?.user1_id && `UCA${activity?.user1_id}`}
                  </td>
                  <td className="px-[18px] py-[10px] text-[#ffff] whitespace-nowrap cursor-pointer">
                    <Tooltip
                      title="Rolex Daytona Stainless Steel - Bracelet - Serial: 43141331 - Year: 2019 - Last requested/quoted price: USD "
                      placement="top"
                      arrow
                    >
                      {activity.message} {activity?.watch_details?.brand && "( "}{activity?.watch_details?.brand} {activity?.watch_details?.model_no} {activity?.watch_details?.model_no && "Serial -"} {activity?.watch_details?.serial_no}{activity?.watch_details?.model_no && "- Year :"} {activity?.watch_details?.year_of_production} {activity?.watch_details?.model_no && "- Last requested/quoted price: USD"} {activity?.watch_details?.price}{activity?.watch_details?.brand && ")"}
                    </Tooltip>
                  </td>
                  <td className="px-[18px] py-[10px] text-[#ffff] text-center">
                    {activity?.watch_id}
                  </td>
                  <td className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap">
                    {activity?.watch_status}
                  </td>
                  <td className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap">
                    {`${activity.quot_receive_date ? moment().unix(activity.quot_receive_date).format("DD-MM-YYYY") : "-"}  `}
                  </td>
                </tr>
              ))
                :
                <tr>
                  <td colSpan={12} className="py-[200px] px-4  text-center text-nowrap text-white font-bold">
                    No Data Found
                  </td>
                </tr>)
            }
          </tbody>
        </table>

      </div>
      <PaginationComponent currentPage={currentPage} totalPages={totalRecords} recordsPerPage={recordsPerPage} handlePageChange={handlePageChange} data={activitesData} />
    </div>
  );
};

export default ActivitiesTable;
