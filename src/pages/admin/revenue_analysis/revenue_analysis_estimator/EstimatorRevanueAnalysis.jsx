import React from "react";

const estimaotrData = [
  {
    Company: "Est Corp",
    Email: "niels@sfcloudwork.com",
    Total_Completed_Deal: 3,
    Total_Bought: "USD 46,100.00",
    Total_Sold: "USD 47,600.00",
    Total_Profit: "USD 1,500.00",
    Total_Commission_Payable_Paid: "USD 150.00/ USD 0.00",
  },
  {
    Company: "MLA",
    Email: "robert@mlathai.com",
    Total_Completed_Deal: 0,
    Total_Bought: "USD 0.00",
    Total_Sold: "USD 0.00",
    Total_Profit: "USD 0.00",
    Total_Commission_Payable_Paid: "USD 0.00/USD 0.00",
  },
  {
    Company: "MLA Thai",
    Email: "roberto.omini@gmail.com",
    Total_Completed_Deal: 2,
    Total_Bought: "USD 32,900.00",
    Total_Sold: "USD 32,900.00",
    Total_Profit: "USD 0.00",
    Total_Commission_Payable_Paid: "USD 0.00 / USD 0.00",
  },
  {
    Company: "My company",
    Email: "paolo@mlathai.com",
    Total_Completed_Deal: 0,
    Total_Bought: "USD 0.00",
    Total_Sold: "USD 0.00",
    Total_Profit: "USD 0.00",
    Total_Commission_Payable_Paid: "USD 0.00/USD 0.00",
  },
  {
    Company: "Quoter Inc",
    Email: "niels@sfcloudwork.com",
    Total_Completed_Deal: 0,
    Total_Bought: "USD 0.00",
    Total_Sold: "USD 0.00",
    Total_Profit: "USD 0.00",
    Total_Commission_Payable_Paid: "USD 0.00/USD 0.00",
  },
];

const EstimatorRevanueAnalysis = () => {
  return (
    <div className="p-[15px]">
      <div className="px-0 sm:px-[15px] flex flex-col justify-between flex-wrap">
        <h1 className="text-[26px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans text-white">
          Revenue Analysis (Estimator)
        </h1>
        <div className="flex items-center sm:flex-row flex-col gap-4 space-x-4 mb-1 px-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="fromDate" className="text-md text-white">
              From
            </label>
            <input
              type="date"
              id="fromDate"
              placeholder="dd-mm-yyyy"
              className="p-2 border rounded-md text-black"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="toDate" className="text-md text-white">
              To
            </label>
            <input
              type="date"
              id="toDate"
              placeholder="dd-mm-yyyy"
              className="p-2 border rounded-md text-black"
            />
          </div>
          <button className="bg-[#0060aa] hover:bg-[#0060aa] text-white font-bold py-2 px-4 rounded">
            Apply Filter
          </button>
          <button className="bg-[#0060aa] hover:bg-[#0060aa] text-white font-bold py-2 px-4 rounded">
            Clear Filter
          </button>
        </div>
        <h1 className="text-[20px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans text-white">
          Summary
        </h1>
      </div>

      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px] h-[100vh]">
        <table className="table-auto w-full text-left">
          <thead style={{ borderBottom: "2px solid #111111" }}>
            <tr>
              <th class="p-2 text-[#ffff] text-center cursor-pointer">
                Comapny
              </th>
              <th class="p-2 text-[#ffff] text-center cursor-pointer">Email</th>
              <th class="p-2 text-[#ffff] text-center cursor-pointer">
                Total Completed deal
              </th>
              <th class="p-2 text-[#ffff] text-center cursor-pointer">
                Total Bought
              </th>
              <th class="p-2 text-[#ffff] text-center cursor-pointer">
                Total Sold
              </th>
              <th class="p-2 text-[#ffff] text-center cursor-pointer">
                Total Profit
              </th>
              <th class="p-2 text-[#ffff] text-center cursor-pointer">
                Total Commission Payable / Paid
              </th>
            </tr>
          </thead>
          <tbody>
            {estimaotrData?.map((item, index) => (
              <tr key={index} className="border-b border-[#202b34]">
                <td className="px-[18px] py-[12px] text-[#ffff] text-center">
                  {item.Company}
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] whitespace-nowrap text-center cursor-pointer">
                  {item.Email}
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                  {item.Total_Completed_Deal}
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                  {item.Total_Bought}
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                  {item.Total_Sold}
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                  {item.Total_Profit}
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                  {item.Total_Commission_Payable_Paid}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EstimatorRevanueAnalysis;
