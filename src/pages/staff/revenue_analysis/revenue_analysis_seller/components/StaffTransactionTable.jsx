import React from "react";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import moment from "moment";
import { useTranslation } from "react-i18next";

const StaffTransactionTable = ({ data, sortField, sortOrder, handleSort }) => {
  const { t } = useTranslation();
  return (
    <table className="table-auto w-full text-left">
      <thead style={{ borderBottom: "2px solid #111111" }}>
        <tr>
          {[
            { key: "created_on", label: `${t("DATE")}` },
            { key: "username", label: `${t("STAFF")}` },
            { key: "id", label:  `${t("WATCHID")}` },
            { key: "model", label:  `${t("BRANDCOLLECTIONMODEL")}` },
            { key: "watch_status", label: `${t("WATCHSTATUS")}` },
          ].map((column) => (
            <th
              key={column.key}
              onClick={() => handleSort(column.key)}
              className={`p-2 dark:text-[#ffff] text-black text-center cursor-pointer ${
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
        {data?.map((item, index) => (
          <tr key={index} className="border-b border-[#202b34]">
            <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center">
              {moment.unix(item?.created_on).format("MMM DD,YYYY")}
            </td>
            <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap text-center">
              {item?.username}
            </td>

            <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
              W{item?.id}
            </td>
            <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
              {`${item?.brand} / ${item?.collection} / ${item?.model} ${item?.reference}`}
            </td>

            <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
              {item?.watch_status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StaffTransactionTable;
