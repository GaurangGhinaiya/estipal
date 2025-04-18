import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import GradeIcon from "@mui/icons-material/Grade";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { CircularProgress, Tooltip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gmailIcon from "../../../../assets/images/icons/icn-mai-light.svg";
import gmailYellowIcon from "../../../../assets/images/icons/icn-mail-yellow.svg";
import axiosInstance from "../../../../services";
import { formatNumberOrDefault } from "../../../../utils";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AdminUserWatchHistory = ({
  watchActivityData,
  loading,
  handleSort,
  sortField,
  sortOrder,
}) => {
  const [watchActivityDataUpdate, setWatchActivityDataUpdate] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setWatchActivityDataUpdate(watchActivityData);
  }, [watchActivityData]);

  const handleStarClick = async (id, select) => {
    try {
      const response = await axiosInstance.post(
        `staffWatchActivities/addSelectedFavorite?id=${id}`,
        {
          select,
        }
      );

      setWatchActivityDataUpdate((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, admin_star_selected_flag: select } : item
        )
      );
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <table className="table-auto w-full text-left">
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
            { key: "model", label: "Collection", isSortable: true },
            { key: "collection", label: "Model", isSortable: true },
            { key: "serial_no", label: "Serial", isSortable: true },
            { key: "company_name", label: "Added By", isSortable: true },
            {
              key: "watch_price",
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
              className={`p-2 dark:text-[#ffff] text-nowrap text-black text-center ${
                column.isSortable ? "cursor-pointer" : ""
              } ${
                column.isSortable && sortField === column.key
                  ? "active-sorting"
                  : ""
              } ${
                column.isSortable && sortField !== column.key
                  ? "pr-4 sorting"
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
        {loading && watchActivityDataUpdate?.length === 0 ? (
          <tr>
            <td colSpan={12} className="py-[200px] px-4  text-center">
              <CircularProgress />
            </td>
          </tr>
        ) : watchActivityDataUpdate?.length > 0 ? (
          watchActivityDataUpdate?.map((item, index) => (
            <tr key={index} className="border-b border-[#202b34]">
              <td className="px-[18px] py-[0px] dark:text-[#ffff] text-black text-center cursor-pointer">
                <div className="w-[35px]">
                  <div
                    role="button"
                    onClick={() =>
                      navigate(`/admin/home/readActivity/${item?.id}`)
                    }
                  >
                    {item?.emailIcon ? (
                      <img src={gmailIcon} width="25px" alt="img" />
                    ) : (
                      <img src={gmailYellowIcon} width="25px" alt="img" />
                    )}
                  </div>
                </div>
              </td>
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center">
                {" "}
                <Checkbox
                  {...label}
                  checked={item?.admin_star_selected_flag}
                  onChange={(e) => handleStarClick(item?.id, e.target.checked)}
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
                {item?.model}
              </td>
              <td
                className="px-[18px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap text-center cursor-pointer"
                onClick={() =>
                  navigate(`/admin/watch_details/watch_status/${item?.id}`)
                }
              >
                <Tooltip title={item?.collection} placement="top" arrow>
                  <div>{item?.collection}</div>
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
                {`${item?.addedByDetail?.company_name || ""}${
                  item?.addedByDetail?.company_name && 
                  item?.addedByDetail?.username
                    ? " - "
                    : "-"
                }${item?.addedByDetail?.username || ""}`}
              </td>
              <td
                className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap cursor-pointer"
                onClick={() =>
                  navigate(`/admin/watch_details/watch_status/${item?.id}`)
                }
              >
                {item?.currency} {formatNumberOrDefault(item?.watch_price)} /
                {item?.currency}{" "}
                {formatNumberOrDefault(item?.estimated_watch_price)}
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

export default AdminUserWatchHistory;
