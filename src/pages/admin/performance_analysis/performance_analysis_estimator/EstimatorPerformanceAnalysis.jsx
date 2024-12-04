import ReactSpeedometer from "react-d3-speedometer";
import React, { useState } from 'react';
import PaginationComponent from '../../../../components/common/PaginationComponent';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { sortData } from "../../../../components/common/Sort";

const estimatorPerformanceData = [
  {
    company: "ACME",
    email: "niels@hipten.com",
    totalReceived: 0,
    repliedWithQuotation: 0,
    repliedWithPass: 0,
    missedQuotation: 0,
    acceptedQuotation: 0,
    successRate: "0",
    responseTime: "0",
  },
  {
    company: "Est Corp",
    email: "niels@sfcloudwork.com",
    totalReceived: 49,
    repliedWithQuotation: 10,
    repliedWithPass: 1,
    missedQuotation: 39,
    acceptedQuotation: 5,
    successRate: "10.2",
    responseTime: "33.4",
  },
  {
    company: "Estimator",
    email: "nielsc59@gmail.com",
    totalReceived: 0,
    repliedWithQuotation: 0,
    repliedWithPass: 0,
    missedQuotation: 0,
    acceptedQuotation: 0,
    successRate: "0",
    responseTime: "0",
  },
  {
    company: "Karan Company",
    email: "ks6890551@gmail.com",
    totalReceived: 2,
    repliedWithQuotation: 2,
    repliedWithPass: 0,
    missedQuotation: 0,
    acceptedQuotation: 1,
    successRate: "50",
    responseTime: "2",
  },
  {
    company: "MLA",
    email: "robert@mlathai.com",
    totalReceived: 46,
    repliedWithQuotation: 12,
    repliedWithPass: 1,
    missedQuotation: 34,
    acceptedQuotation: 0,
    successRate: "0",
    responseTime: "6.5",
  },
  {
    company: "MLA Thai",
    email: "roberto.omini@gmail.com",
    totalReceived: 9,
    repliedWithQuotation: 5,
    repliedWithPass: 0,
    missedQuotation: 4,
    acceptedQuotation: 2,
    successRate: "22.2",
    responseTime: "45.8",
  },
];

const transactionData = [
  {
    date: "Nov 15, 2023",
    company: "Stein Diamonds",
    firstName: "Kia",
    lastName: "Zoghi",
    watchId: "W1421",
    model: "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request"
  },
  {
    date: "Nov 15, 2023",
    company: "Karan Company",
    firstName: "Bob",
    lastName: "Karan",
    watchId: "W1422",
    model: "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "USD 18,000 / -",
    status: "Estimated"
  },
  {
    date: "Nov 15, 2023",
    company: "MLA",
    firstName: "Robert",
    lastName: "MLA",
    watchId: "W1418",
    model: "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request"
  },
  {
    date: "Nov 15, 2023",
    company: "test est",
    firstName: "nopp",
    lastName: "w",
    watchId: "W1419",
    model: "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request"
  },
  {
    date: "Nov 15, 2023",
    company: "MLA Thai",
    firstName: "Robert",
    lastName: "MLA Thai",
    watchId: "W1420",
    model: "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request"
  },
  {
    date: "Nov 15, 2023",
    company: "My company",
    firstName: "Paolo",
    lastName: "Manzoli",
    watchId: "W1413",
    model: "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request"
  },
  {
    date: "Nov 15, 2023",
    company: "test",
    firstName: "nopp",
    lastName: "ice",
    watchId: "W1414",
    model: "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request"
  },
  {
    date: "Nov 15, 2023",
    company: "test1",
    firstName: "test1",
    lastName: "test1",
    watchId: "W1415",
    model: "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request"
  },
  {
    date: "Nov 15, 2023",
    company: "Quoter Inc",
    firstName: "Albert",
    lastName: "Quotes",
    watchId: "W1416",
    model: "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request"
  },
  {
    date: "Nov 15, 2023",
    company: "Est Corp",
    firstName: "Albert",
    lastName: "Einstein",
    watchId: "W1417",
    model: "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request"
  },
  {
    date: "Nov 11, 2023",
    company: "Stein Diamonds",
    firstName: "Kia",
    lastName: "Zoghi",
    watchId: "W1411",
    model: "Patek Philippe / Complications / World Time - 36mm, Green Dial, Green Leather Strap, Rose Gold 7130R-014",
    estimate: "- / -",
    status: "New Estimate Request"
  },
  {
    date: "Nov 11, 2023",
    company: "Karan Company",
    firstName: "Bob",
    lastName: "Karan",
    watchId: "W1412",
    model: "Patek Philippe / Complications / World Time - 36mm, Green Dial, Green Leather Strap, Rose Gold 7130R-014",
    estimate: "USD 20,000 / -",
    status: "Estimated"
  },
  {
    date: "Nov 11, 2023",
    company: "MLA",
    firstName: "Robert",
    lastName: "MLA",
    watchId: "W1408",
    model: "Patek Philippe / Complications / World Time - 36mm, Green Dial, Green Leather Strap, Rose Gold 7130R-014",
    estimate: "- / -",
    status: "New Estimate Request"
  },
  {
    date: "Nov 11, 2023",
    company: "test est",
    firstName: "nopp",
    lastName: "w",
    watchId: "W1409",
    model: "Patek Philippe / Complications / World Time - 36mm, Green Dial, Green Leather Strap, Rose Gold 7130R-014",
    estimate: "- / -",
    status: "New Estimate Request"
  },
  {
    date: "Nov 11, 2023",
    company: "MLA Thai",
    firstName: "Robert",
    lastName: "MLA Thai",
    watchId: "W1410",
    model: "Patek Philippe / Complications / World Time - 36mm, Green Dial, Green Leather Strap, Rose Gold 7130R-014",
    estimate: "- / -",
    status: "New Estimate Request"
  }
]

const EstimatorPerformanceAnalysis = () => {
  const [data, setData] = useState(transactionData);

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (key) => {
    const newOrder = sortField === key && sortOrder === "asc" ? "desc" : "asc";
    setSortField(key);
    setSortOrder(newOrder);

    // Sort data and update state
    const sortedData = sortData(data, key, newOrder);
    setData(sortedData);
  };

  return (
    <div className="p-[15px]">
      <div className="px-0 sm:px-[15px] flex flex-col justify-between flex-wrap">
        <h1 className="text-[26px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans text-white">
          Performance Analysis (Estimator)
        </h1>
        <div className="flex items-center sm:flex-row flex-col gap-4 space-x-4 mb-1 px-10">
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
          <div class="flex items-center space-x-2 text-white">
            <span>Group By:</span>
            <div class="relative inline-block text-left">
              <select class="block appearance-none w-full bg-gray-700 border border-gray-600 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500">
                <option>All</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
          <button className="bg-[#0060aa] hover:bg-[#0060aa] text-white font-bold py-2 px-4 rounded">
            Apply Filter
          </button>
          <button className="bg-[#0060aa] hover:bg-[#0060aa] text-white font-bold py-2 px-4 rounded">
            Clear Filter
          </button>
        </div>
        <h1 className="text-[20px] font-medium mb-4 mt-5 px-0 sm:px-[40px] font-sans text-white">
          Summary
        </h1>
      </div>
      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px] ">
        <table className="table-auto w-full text-left">
          <thead style={{ borderBottom: "2px solid #111111", color: "white" }}>
            <tr>
              <th className="py-2 px-4 border-b border-gray-600">Company</th>
              <th className="py-2 px-4 border-b border-gray-600">Email</th>
              <th className="py-2 px-4 border-b border-gray-600">
                Total Quotation Received
              </th>
              <th className="py-2 px-4 border-b border-gray-600">
                Total Replied with Quotation
              </th>
              <th className="py-2 px-4 border-b border-gray-600">
                Total Replied with Pass
              </th>
              <th className="py-2 px-4 border-b border-gray-600">
                Total Missed Quotation
              </th>
              <th className="py-2 px-4 border-b border-gray-600">
                Total Accepted Quotation
              </th>
              <th className="py-2 px-4 border-b border-gray-600">
                Success Rate (%)
              </th>
              <th className="py-2 px-4 border-b border-gray-600"></th>
              <th className="py-2 px-4 border-b border-gray-600">
                Average Response time (Min)
              </th>
              <th className="py-2 px-4 border-b border-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {estimatorPerformanceData?.map((item, index) => {
              const segmentStops = [0, 15, 30, 45, 60];
              const maxTime = segmentStops[segmentStops.length - 1];
              return (
                <tr
                  key={index}
                  className="border-b border-[#202b34] text-white"
                >
                  <td className="py-2 px-4">{item.company}</td>
                  <td className="py-2 px-4">{item.email}</td>
                  <td className="py-2 px-4">{item.totalReceived}</td>
                  <td className="py-2 px-4">{item.repliedWithQuotation}</td>
                  <td className="py-2 px-4">{item.repliedWithPass}</td>
                  <td className="py-2 px-4">{item.missedQuotation}</td>
                  <td className="py-2 px-4">{item.acceptedQuotation}</td>
                  <td className="py-2 px-4 ">
                    <span className="ml-2">{item.successRate}%</span>
                  </td>
                  <td className="py-2 px-4 w-[120px]">
                    <ReactSpeedometer
                      maxValue={100}
                      value={item.successRate}
                      valueFormat={"d"}
                      customSegmentStops={[0, 25, 50, 75, 100]}
                      segmentColors={[
                        "#B13338",
                        "#E87A31",
                        "#FFFF00",
                        "#4FE000",
                      ]}
                      textColor={"black"}
                      width={160}
                      height={110}
                      ringWidth={10}
                      needleHeightRatio={0.8}
                      showPercentage={false}
                      currentValueText={""}
                    />
                  </td>
                  <td className="py-2 px-4 ">
                    <span className="ml-2">{item.responseTime}Min</span>
                  </td>
                  <td className="py-[12px] text-[#ffff] flex justify-center text-center items-center whitespace-nowrap">
                    <ReactSpeedometer
                      maxValue={maxTime}
                      value={item.responseTime}
                      valueFormat={"d"}
                      customSegmentStops={segmentStops}
                      segmentColors={[
                        "#B13338",
                        "#E87A31",
                        "#FFFF00",
                        "#4FE000",
                      ]}
                      textColor={"black"}
                      width={160}
                      height={110}
                      ringWidth={10}
                      needleHeightRatio={0.8}
                      showPercentage={false}
                      currentValueText={""}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h1 className=" text-[20px] font-medium mb-4 mt-5 px-0 sm:px-[48px] font-sans text-white">
        Transactions
      </h1>
      <div class="flex items-center space-x-2 text-white px-14">
        <span>Select Status:</span>
        <div class="relative inline-block text-left">
          <select class="block appearance-none w-full bg-gray-700 border border-gray-600 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500">
            <option>All</option>
            <option>New Estimated Request</option>
            <option>Estimated</option>
            <option>Pass</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
          </div>
        </div>
      </div>
      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px] mt-8">
        <table className="table-auto w-full text-left">
          <thead style={{ borderBottom: "2px solid #111111" }}>
            <tr>
              {[
                { key: "date", label: "Date" },
                { key: "company", label: "Company" },
                { key: "firstName", label: "First Name" },
                { key: "lastName", label: "Last Name" },
                { key: "watchId", label: "Watch ID" },
                { key: "model", label: "Brand / Collection / Model" },
                { key: "estimate", label: "Current Estimate / Accepted" },
                { key: "status", label: "Watch Status" },
              ].map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className={`p-2 text-[#ffff] text-center cursor-pointer ${sortField === column.key ? "active-sorting" : "sorting"
                    }`}
                >
                  {column.label}{" "}
                  {sortField === column.key && (
                    sortOrder === "asc" ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} className="border-b border-[#202b34]">

                <td className="px-[18px] py-[10px] text-[#ffff] text-center">
                  {item.date}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] whitespace-nowrap text-center">
                  {item.company}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center">
                  {item.firstName}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap">
                  {item.lastName}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap">
                  {item.watchId}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap">
                  {item.model}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap">
                  {item.estimate}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationComponent totalPages={5} />
    </div>
  );
};

export default EstimatorPerformanceAnalysis;
