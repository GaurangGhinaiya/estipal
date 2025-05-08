import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const SummaryTable = ({ data, groupBy }) => {
  const formatGroupedBy = (groupedBy) => {
    const [year, month] = groupedBy?.split("-");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
  };

  const processedData = data
    ?.sort((a, b) => {
      const [yearA, monthA] = a.grouped_by?.split("-").map(Number) || [];
      const [yearB, monthB] = b.grouped_by?.split("-").map(Number) || [];
      if (groupBy !== "all") {
        return groupBy !== "year"
          ? yearA - yearB || monthB - monthA
          : yearB - yearA || monthB - monthA;
      }
      return 0;
    })
    ?.map((item, index, arr) => ({
      ...item,
      showYear: index === 0 || item.grouped_by !== arr[index - 1]?.grouped_by,
      formattedGroupedBy: item.grouped_by
        ? formatGroupedBy(item.grouped_by)
        : "",
    }));

  return (
    <table className="table-auto w-full text-left">
      <thead style={{ borderBottom: "2px solid #111111" }}>
        <tr>
          {groupBy !== "all" && (
            <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer capitalize">
              {groupBy}
            </th>
          )}
          <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer">
            Staff
          </th>
          <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer">
            Email
          </th>
          <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer">
            Company
          </th>
          <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer">
            Total Quotation Requested
          </th>
          <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer">
            Total Quotation Accepted
          </th>
          <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer">
            Success Rate (%)
          </th>
        </tr>
      </thead>
      <tbody>
        {(groupBy !== "all" ? processedData : data)?.map((item, index) => (
          <tr
            key={index}
            style={{
              borderTop:
                groupBy !== "all" && item?.showYear
                  ? "2px solid #000000"
                  : "1px solid #202b34",
            }}
          >
            {groupBy !== "all" && (
              <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center">
                {item?.showYear
                  ? groupBy !== "year"
                    ? item?.formattedGroupedBy
                    : item?.grouped_by
                  : ""}
              </td>
            )}
            <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center">
              {item?.username}
            </td>
            <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black whitespace-nowrap text-center cursor-pointer">
              {item?.email}
            </td>
            <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
              {item?.company_name}
            </td>
            <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
              {item?.total_quotation_requested}
            </td>
            <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
              {item?.total_quotation_accepted}
            </td>
            <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
              {Number(item?.success_rate)?.toFixed(1)}%
            </td>
            <td className="py-[12px] text-[#ffff] flex justify-center text-center items-center whitespace-nowrap">
              <ReactSpeedometer
                maxValue={100}
                value={Number(item?.success_rate)?.toFixed(1)}
                valueFormat={"d"}
                customSegmentStops={[0, 25, 50, 75, 100]}
                segmentColors={["#B13338", "#E87A31", "#FFFF00", "#4FE000"]}
                textColor={"white"}
                width={130}
                height={80}
                ringWidth={12}
                needleHeightRatio={0.8}
                showPercentage={false}
                currentValueText={""}
                labelFontSize={"10px"}
                valueTextFontSize="0px"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SummaryTable;
