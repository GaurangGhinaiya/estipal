import { Button, CircularProgress } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../../../components/common/PaginationComponent";
import SearchBar from "../../../components/common/SearchBar";
import useDebounce from "../../../components/common/UseDebounce";
import axiosInstance from "../../../services/index";

const StaffUser = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const getStaffUserData = async () => {
    try {
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

      setIsLoading(true);
      const response = await axiosInstance.get(
        `/sellers?page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}&sort_order=${sortOrder}`
      );
      setData(response.payload.data);
      setTotalRecords(response?.pager?.total_records);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStaffUserData();
  }, [currentPage, sortOrder, debouncedSearchTerm, status, searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-[15px] min-h-[100vh]">
      <div className="px-0 sm:px-[15px] flex justify-between flex-wrap">
        <h1 className="text-[30px] font-medium mb-4 px-0 sm:px-[15px] font-sans text-white">
          Merchants & Staff
        </h1>

        <div className="flex justify-between items-center mb-4 gap-4 sm:gap-8 flex-wrap ">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setCurrentPage={setCurrentPage}
            placeholder={"Search sellers/staffs"}
          />

          <Button
            variant="contained"
            className="b_btn !py-[10px] !px-[40px] !rounded-[50px]"
            onClick={() => navigate("/admin/seller/seller_user_create")}
          >
            Add Merchant
          </Button>
        </div>
      </div>

      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px] ">
        <table className="table-auto w-full text-left">
          <thead style={{ borderBottom: "2px solid #111111" }}>
            <tr>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Active
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Id
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Company
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Contact
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Email
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Username
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Added on
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Staff
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Sent/Accepted
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
              data.map((item, index) => (
                <tr
                  onClick={() =>
                    navigate(
                      `/admin/seller/seller_edit/${item?.admin_seller_id}`
                    )
                  }
                  key={index}
                  className="border-b border-[#202b34]"
                >
                  <td className="px-[18px] py-[0px] text-[#ffff] text-center">
                    <div className="require_vaild_list text-center">
                      <span
                        className={`${item?.active ? "dot-green" : "dot-red"}`}
                      ></span>
                    </div>
                  </td>

                  <td className="px-[18px] py-[12px] text-[#ffff] text-center cursor-pointer">
                    SCA{item?.admin_seller_id}
                  </td>
                  <td className="px-[18px] py-[12px] text-[#ffff] cursor-pointer">
                    <div className="whitespace-nowrap text-center">
                      {item?.cmp_name}
                    </div>
                  </td>
                  <td className="px-[18px] py-[12px] text-[#ffff] whitespace-nowrap text-center cursor-pointer">
                    {item?.first_name + " " + item?.last_name}
                  </td>
                  <td className="px-[18px] py-[12px] text-[#ffff] whitespace-nowrap text-center cursor-pointer">
                    {item?.email}
                  </td>
                  <td className="px-[18px] py-[12px] text-[#ffff] text-center cursor-pointer">
                    {item?.username}
                  </td>
                  <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap cursor-pointer">
                    {moment.unix(item?.created_on).format("MMM DD,YYYY")}
                  </td>
                  <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap cursor-pointer">
                    {item?.staff}
                  </td>
                  <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap cursor-pointer">
                    {item?.sent} / {item?.accepted}
                  </td>
                  <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                    <div className="flex gap-[10px]">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/admin/watch_details/watch_history/?seller_id=${item?.admin_seller_id}`
                          );
                        }}
                        className="cursor-pointer"
                      >
                        <img
                          alt="start"
                          id="star"
                          width="30px"
                          height="30px"
                          style={{ filter: "invert(1)" }}
                          src="https://www.estipal.com/assets/dist/images/icons/Watch history 2.png"
                        />
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin`);
                        }}
                        className="cursor-pointer"
                      >
                        <img
                          alt="revanue"
                          width="30px"
                          height="30px"
                          style={{ filter: "invert(1)" }}
                          src="https://www.estipal.com/assets/dist/images/icons/Revenue.png"
                        />
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/admin/analysis/performance_analysis/seller/${item?.admin_seller_id}`
                          );
                        }}
                        className="cursor-pointer"
                      >
                        <img
                          alt="performance"
                          width="30px"
                          height="30px"
                          style={{ filter: "invert(1)" }}
                          src="https://www.estipal.com/assets/dist/images/icons/performance.png"
                        />
                      </div>
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
        </table>{" "}
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

export default StaffUser;
