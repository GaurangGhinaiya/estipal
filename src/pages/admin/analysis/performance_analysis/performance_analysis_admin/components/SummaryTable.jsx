import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const SummaryTable = ({ data }) => {
  return (
    <table className="table-auto w-full text-left">
      <thead style={{ borderBottom: "2px solid #111111" }}>
        <tr>
          <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer whitespace-nowrap">
            Company
          </th>
          <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer whitespace-nowrap">
            Email
          </th>

          <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer whitespace-nowrap">
            Total Quotation Requested
          </th>
          <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer whitespace-nowrap">
            Total Quotation Accepted
          </th>
          <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer whitespace-nowrap">
            Success Rate (%)
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={index} className="border-b border-[#202b34]">
            <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center">
              {item?.cmp_name}
            </td>
            <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black whitespace-nowrap text-center cursor-pointer">
              {item?.email}
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
