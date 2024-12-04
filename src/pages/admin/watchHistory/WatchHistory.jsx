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

const history = [
  {
    id: "W10090",
    brand: "Rolex",
    collection: "Daytona",
    model: "40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel",
    serial: "12356",
    addedBy: "MLA Thai - Bob",
    asking: "USD 20,000 / USD 18,000",
    addedOn: "Nov 15, 2023",
    status: "Rejected",
  },
  {
    id: "W10090",
    brand: "Rolex",
    collection: "Daytona",
    model: "40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel",
    serial: "12356",
    addedBy: "MLA Thai - Bob",
    asking: "USD 20,000 / USD 18,000",
    addedOn: "Nov 15, 2023",
    status: "Rejected",
  },
  {
    id: "W10089",
    brand: "Patek Philippe",
    collection: "Complications",
    model: "World Time - 36mm, Green Dial, Green Leather Strap, Rose Gold",
    serial: "123456",
    addedBy: "MLA Thai - Bob",
    asking: "USD 30,000 / USD 27,000",
    addedOn: "Nov 11, 2023",
    status: "Accepted - Deal in progress",
  },
  {
    id: "W10088",
    brand: "Rolex",
    collection: "Air-King",
    model: "40mm, Black Dial, Bracelet, Stainless Steel",
    serial: "12345678",
    addedBy: "MLA Thai - Robert",
    asking: "USD 10,000 / USD 9,500",
    addedOn: "Nov 09, 2023",
    status: "Pending first counter offer",
  },
  {
    id: "W10087",
    brand: "Rolex",
    collection: "Yacht-Master",
    model:
      "42 mm, Black Dial, Ceramic Bezel, Black Rubber Bracelet, White Gold",
    serial: "23456709",
    addedBy: "Estipal, LLC - Jack Dawson",
    asking: "USD 15,000 / USD 14,000",
    addedOn: "Jul 30, 2023",
    status: "Completed",
  },
  {
    id: "W10086",
    brand: "Rolex",
    collection: "Daytona",
    model: "40mm, Black Dial, Ceramic Bezel, Bracelet, Stainless Steel",
    serial: "xxx",
    addedBy: "maya - test_staff1",
    asking: "USD 20,000 / USD 18,000",
    addedOn: "May 03, 2023",
    status: "Expired",
  },
  {
    id: "W10085",
    brand: "A. Lange & Sohne",
    collection: "1815",
    model: "Honeygold",
    serial: "xxxp",
    addedBy: "maya - test_staff1",
    asking: "USD 18,000 / USD 16,000",
    addedOn: "May 03, 2023",
    status: "Expired",
  },
  {
    id: "W10084",
    brand: "Cartier",
    collection: "Baignoire",
    model: "Large - Pink Gold",
    serial: "yyyy",
    addedBy: "maya - test_staff1",
    asking: "USD 20,000 / USD 19,180",
    addedOn: "Apr 27, 2023",
    status: "Expired",
  },
  {
    id: "W10083",
    brand: "Audemars Piguet",
    collection: "Code 11.59 by Audemars Piguet",
    model: "Selfwinding - White Gold, Blue Dial",
    serial: "xxxx",
    addedBy: "maya - test_staff1",
    asking: "USD 20,000 / USD 19,250",
    addedOn: "Apr 27, 2023",
    status: "Expired",
  },
  {
    id: "W10082",
    brand: "A. Lange & Sohne",
    collection: "1815",
    model: "Honeygold",
    serial: "xxxx",
    addedBy: "maya - test_staff1",
    asking: "USD 20,000 / USD 18,900",
    addedOn: "Apr 27, 2023",
    status: "Completed",
  },
  {
    id: "W10081",
    brand: "Rolex",
    collection: "Daytona",
    model: "40mm, Black Dial, Ceramic Bezel, Bracelet, Stainless Steel",
    serial: "xxxxx",
    addedBy: "maya - test_staff1",
    asking: "USD 20,000 / USD 18,900",
    addedOn: "Apr 27, 2023",
    status: "Completed",
  },
  {
    id: "W10080",
    brand: "Rolex",
    collection: "Submariner",
    model:
      "41 mm, Black Dial, Ceramic Bezel, Bracelet, Stainless Steel and Yellow Gold",
    serial: "12345",
    addedBy: "maya - test_staff1",
    asking: "USD 18,000 / USD 16,300",
    addedOn: "Apr 27, 2023",
    status: "Completed",
  },
  {
    id: "W10079",
    brand: "Rolex",
    collection: "Yacht-Master",
    model:
      "42 mm, Black Dial, Ceramic Bezel, Black Rubber Bracelet, White Gold",
    serial: "2345678",
    addedBy: "Estipal, LLC - Jack Dawson",
    asking: "USD 18,000 / USD 17,400",
    addedOn: "Apr 24, 2023",
    status: "Completed",
  },
  {
    id: "W10078",
    brand: "Rolex",
    collection: "Yacht-Master",
    model:
      "42 mm, Black Dial, Ceramic Bezel, Black Rubber Bracelet, White Gold",
    serial: "123456789",
    addedBy: "Estipal, LLC - Jack Dawson",
    asking: "USD 20,000 / USD 18,000",
    addedOn: "Apr 19, 2023",
    status: "Completed",
  },
  {
    id: "W10077",
    brand: "Rolex",
    collection: "GMT-Master II",
    model:
      "40 mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel, 2022",
    serial: "1234567",
    addedBy: "Estipal, LLC - Jack Dawson",
    asking: "USD 20,000 / USD 18,500",
    addedOn: "Apr 19, 2023",
    status: "Sold",
  },
  {
    id: "W10076",
    brand: "A. Lange & Sohne",
    collection: "1815",
    model: "Honeygold",
    serial: "123456789",
    addedBy: "Estipal, LLC - Jack Dawson",
    asking: "USD 10,000 / USD 9,600",
    addedOn: "Mar 30, 2023",
    status: "Completed",
  },
  {
    id: "W10075",
    brand: "Rolex",
    collection: "Yacht-Master",
    model:
      "42 mm, Falcon's Eye Dial, Ceramic Bezel, Black Rubber Bracelet, White Gold",
    serial: "1234567",
    addedBy: "Estipal, LLC - Jack Dawson",
    asking: "USD 15,000 / ",
    addedOn: "Mar 24, 2023",
    status: "Cancel",
  },
  {
    id: "W10074",
    brand: "Rolex",
    collection: "Yacht-Master",
    model:
      "42 mm, Black Dial, Ceramic Bezel, Black Rubber Bracelet, White Gold",
    serial: "1234567",
    addedBy: "Estipal, LLC - Jack Dawson",
    asking: "USD 21,000 / ",
    addedOn: "Mar 08, 2023",
    status: "Cancel",
  },
  {
    id: "W10073",
    brand: "Bvlgari",
    collection: "Bulgari Aluminium",
    model: "40 mm - Aluminum And Titanium",
    serial: "2345678",
    addedBy: "Estipal, LLC - Jack Dawson",
    asking: "USD 19,000 / ",
    addedOn: "Mar 08, 2023",
    status: "Cancel",
  },
  {
    id: "W10072",
    brand: "Rolex",
    collection: "Daytona",
    model:
      "40mm, Black Diamonds Dial, Bracelet, Stainless Steel and Yellow Gold",
    serial: "dfjghjk",
    addedBy: "MLA Thai - Robert",
    asking: "USD 0 / USD",
    addedOn: "Feb 23, 2023",
    status: "Cancel",
  },
];

const WatchHistory = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(history);
  const [status, setStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [watchActivityData, setWatchActivityData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
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
    const sortedData = sortData(data, key, newOrder);
    setData(sortedData);
  };

  const getWatchActivityList = async () => {
    setLoading(true);
    const searchValue =
      debouncedSearchTerm || status
        ? JSON.stringify(
            debouncedSearchTerm
              ? {
                  watch_id: debouncedSearchTerm ? debouncedSearchTerm : "",
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
  }, [currentPage, debouncedSearchTerm ,status]);

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
                { key: "model", label: "Model", isSortable: false },
                { key: "serial_no", label: "Serial", isSortable: true },
                { key: "compnay_name", label: "Added By", isSortable: true },
                { key: "asking", label: "Asking / Estimate", isSortable: true },
                { key: "addedOn", label: "Added On", isSortable: true },
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
                        onClick={() => navigate("/admin/home/readActivity")}
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
                      navigate("/admin/watch_details/watch_status")
                    }
                  >
                    W{item?.id}
                  </td>
                  <td
                    className="px-[18px] py-[10px] text-[#ffff] cursor-pointer"
                    onClick={() =>
                      navigate("/admin/watch_details/watch_status")
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
                      navigate("/admin/watch_details/watch_status")
                    }
                  >
                    {item?.collection}
                  </td>
                  <td
                    className="px-[18px] py-[10px] text-[#ffff] whitespace-nowrap text-center cursor-pointer"
                    onClick={() =>
                      navigate("/admin/watch_details/watch_status")
                    }
                  >
                    <Tooltip title={item?.model} placement="top" arrow>
                      <div>{item?.model}</div>
                    </Tooltip>
                  </td>
                  <td
                    className="px-[18px] py-[10px] text-[#ffff] text-center cursor-pointer"
                    onClick={() =>
                      navigate("/admin/watch_details/watch_status")
                    }
                  >
                    {item?.serial_no}
                  </td>
                  <td
                    className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap cursor-pointer"
                    onClick={() =>
                      navigate("/admin/watch_details/watch_status")
                    }
                  >
                    {item?.compnay_name}
                  </td>
                  <td
                    className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap cursor-pointer"
                    onClick={() =>
                      navigate("/admin/watch_details/watch_status")
                    }
                  >
                    USD {item?.counter_offer_price} / USD
                    {item?.estimated_watch_price}
                  </td>
                  <td
                    className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap cursor-pointer"
                    onClick={() =>
                      navigate("/admin/watch_details/watch_status")
                    }
                  >
                    {moment.unix(item?.created_on).format("MMM DD,YYYY")}
                  </td>
                  <td
                    className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap cursor-pointer"
                    onClick={() =>
                      navigate("/admin/watch_details/watch_status")
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
