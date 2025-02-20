import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import GradeIcon from "@mui/icons-material/Grade";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { CircularProgress, Tooltip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment/moment";
import { useState } from "react";
import { sortData } from "../../../../components/common/Sort";
import { useNavigate } from "react-router-dom";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StaffUserWatchHistory = ({
  watchActivityData,
  setWatchActivityData,
  loading,
}) => {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  const handleSort = (key) => {
    const newOrder = sortField === key && sortOrder === "asc" ? "desc" : "asc";
    setSortField(key);
    setSortOrder(newOrder);

    // Sort data and update state
    const sortedData = sortData(watchActivityData, key, newOrder);
    setWatchActivityData(sortedData);
  };
  return (
    <table className="table-auto w-full text-left ">
      <thead style={{ borderBottom: "2px solid #111111" }}>
        <tr>
          {[
            { key: "", label: "" },
            {
              key: "checkbox",
              label: (
                <StarOutlineIcon sx={{ color: "#9b9b9b", fontSize: "21px" }} />
              ),
              render: () => (
                <Checkbox
                  icon={
                    <StarOutlineIcon
                      sx={{ color: "#9b9b9b", fontSize: "21px" }}
                    />
                  }
                  checkedIcon={
                    <GradeIcon sx={{ color: "#ff9300", fontSize: "21px" }} />
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
            { key: "addedOn", label: "Added On", isSortable: true },
            { key: "watch_status", label: "Status", isSortable: true },
          ]?.map((column) => (
            <th
              key={column.key}
              onClick={
                column.isSortable ? () => handleSort(column.key) : undefined
              }
              className={`p-2 dark:text-[#ffff] text-nowrap  text-black text-center ${
                column.isSortable ? "cursor-pointer" : ""
              } ${
                column.isSortable && sortField === column.key
                  ? "active-sorting"
                  : ""
              } ${
                column.isSortable && sortField !== column.key ? "sorting" : ""
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
              <td className="px-[18px] py-[0px] dark:text-[#ffff] text-black text-center cursor-pointer">
                <div className="w-[35px]">
                  <div
                    role="button"
                    onClick={() =>
                      navigate(`/admin/watch_details/watch_status/${item?.id}`)
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
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center">
                {" "}
                <Checkbox
                  {...label}
                  checked={item?.admin_star_selected_flag}
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
              <td
                className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center cursor-pointer"
                onClick={() =>
                  navigate(`/admin/watch_details/watch_status/${item?.id}`)
                }
              >
                W{item?.id}
              </td>
              <td
                className="px-[18px] py-[10px] dark:text-[#ffff] text-black cursor-pointer"
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
                className="px-[18px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap text-center cursor-pointer"
                onClick={() =>
                  navigate(`/admin/watch_details/watch_status/${item?.id}`)
                }
              >
                {item?.collection}
              </td>
              <td
                className="px-[18px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap text-center cursor-pointer"
                onClick={() =>
                  navigate(`/admin/watch_details/watch_status/${item?.id}`)
                }
              >
                <Tooltip title={item?.model} placement="top" arrow>
                  <div>{item?.model}</div>
                </Tooltip>
              </td>
              <td
                className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center cursor-pointer"
                onClick={() =>
                  navigate(`/admin/watch_details/watch_status/${item?.id}`)
                }
              >
                {item?.serial_no}
              </td>
              <td
                className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap cursor-pointer"
                onClick={() =>
                  navigate(`/admin/watch_details/watch_status/${item?.id}`)
                }
              >
                {item?.compnay_name}
              </td>
              <td
                className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap cursor-pointer"
                onClick={() =>
                  navigate(`/admin/watch_details/watch_status/${item?.id}`)
                }
              >
                {moment.unix(item?.created_on).format("MMM DD,YYYY")}
              </td>
              <td
                className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap cursor-pointer"
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
              className="py-[200px] px-4  text-center text-nowrap dark:text-[#ffff] text-black font-bold"
            >
              No Data Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StaffUserWatchHistory;
