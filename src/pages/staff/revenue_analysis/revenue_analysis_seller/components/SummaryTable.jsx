import React from "react";

import { formattedNumber } from "../../../../../utils";
import { translate } from "../../../../../language";

const SummaryTable = ({ data }) => {
  return (
    <table className="table-auto w-full text-left">
      <thead style={{ borderBottom: "2px solid #111111" }}>
        <tr>
          <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer">
            {translate("STAFF")}
          </th>
          <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer">
            {translate("EMAIL")}
          </th>
          <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer">
            {translate("TOTALSOLDESTIPAL")}
          </th>
          <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer">
            {translate("TOTALPARTNERWITHESTIPAL")}
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={index} className="border-b border-[#202b34]">
            <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center">
              {item?.username}
            </td>
            <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black whitespace-nowrap text-center cursor-pointer">
              {item?.email}
            </td>
            <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
              {item?.total_sold_to_estipal} / USD{" "}
              {formattedNumber?.format(item?.total_sold_amount)}
            </td>
            <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
              {item?.total_partner_with_estipal} / USD{" "}
              {formattedNumber?.format(item?.total_partner_amount)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SummaryTable;
