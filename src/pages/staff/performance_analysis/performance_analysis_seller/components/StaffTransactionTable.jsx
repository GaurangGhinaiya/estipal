import React from "react";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import moment from "moment";

const StaffTransactionTable = ({ data, sortField, sortOrder, handleSort }) => {
  return (
    <table className="table-auto w-full text-left">
      <thead style={{ borderBottom: "2px solid #111111" }}>
        <tr>
          {[
            { key: "created_on", label: "Date" },
            { key: "username", label: "Staff" },
            { key: "email", label: "Email" },
            { key: "id", label: "Watch ID" },
            { key: "model", label: "Brand / Collection / Model" },
            {
              key: "estimated_watch_price",
              label: "Current Estimate / Accepted",
            },
            { key: "watch_status", label: "Watch Status" },
          ].map((column) => (
            <th
              key={column.key}
              onClick={() => handleSort(column.key)}
              className={`py-2 px-[20px] dark:text-[#ffff] text-black text-center whitespace-nowrap cursor-pointer ${
                sortField === column.key ? "active-sorting" : "sorting"
              }`}
            >
              {column.label}{" "}
              {sortField === column.key &&
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
        {data?.length > 0 ? (
          data?.map((item, index) => (
            <tr key={index} className="border-b border-[#202b34]">
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center">
                {moment.unix(item?.created_on).format("MMM DD,YYYY")}
              </td>
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap text-center">
                {item?.username}
              </td>
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center">
                {item?.email}
              </td>
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                W{item?.id}
              </td>
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                {`${item?.brand} / ${item?.model} / ${item?.collection} ${item?.reference}`}
              </td>
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                {item?.estimated_watch_price
                  ? `${item?.currency} ${Number(
                      item?.estimated_watch_price
                    ).toLocaleString()}`
                  : "-"}{" "}
                /{" "}
                {item?.accepted_price
                  ? `${item?.currency} ${Number(
                      item?.accepted_price
                    ).toLocaleString()}`
                  : "-"}
              </td>
              <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                {item?.watch_status}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={12}
              className="px-[18px] py-[100px] text-center font-bold text-nowrap dark:text-[#ffff] text-black"
            >
              No Data Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StaffTransactionTable;
