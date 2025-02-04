import React, { useState } from "react";
import { sortData } from "../../../../components/common/Sort";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import PaginationComponent from "../../../../components/common/PaginationComponent";

const merchantData = [
  {
    Company: "M",
    Email: "nopparat_sat@maya-wizard.com",
    Total_sold_to_Estipal: "5 / USD 75,300.00",
    Total_partner_with_Estipal: "0 / USD 0.00",
  },
  {
    Company: "MLA Thai",
    Email: "admin@mlathai.com",
    Total_sold_to_Estipal: "0 / USD 0.00",
    Total_partner_with_Estipal: "0 / USD 0.00",
  },
  {
    Company: "Estipal, LLC",
    Email: "niels@estipal.com",
    Total_sold_to_Estipal: "7 / USD 143,000.00",
    Total_partner_with_Estipal: "0 / USD 0.00",
  },
  {
    Company: "Test",
    Email: "nopparat@scouse.tech",
    Total_sold_to_Estipal: "0 / USD 0.00",
    Total_partner_with_Estipal: "0 / USD 0.00",
  },
  {
    Company: "maya",
    Email: "nopparat.mayawizard2@gmail.com",
    Total_sold_to_Estipal: "0 / USD 0.00",
    Total_partner_with_Estipal: "0 / USD 0.00",
  },
  {
    Company: "maya",
    Email: "info.icenetwork@gmail.com",
    Total_sold_to_Estipal: "3 / USD 52,600.00",
    Total_partner_with_Estipal: "0 / USD 0.00",
  },
];

const transactionData = [
  {
    date: "Nov 15, 2023",
    company: "Stein Diamonds",
    firstName: "Kia",
    lastName: "Zoghi",
    watchId: "W1421",
    model:
      "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request",
  },
  {
    date: "Nov 15, 2023",
    company: "Karan Company",
    firstName: "Bob",
    lastName: "Karan",
    watchId: "W1422",
    model:
      "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "USD 18,000 / -",
    status: "Estimated",
  },
  {
    date: "Nov 15, 2023",
    company: "MLA",
    firstName: "Robert",
    lastName: "MLA",
    watchId: "W1418",
    model:
      "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request",
  },
  {
    date: "Nov 15, 2023",
    company: "test est",
    firstName: "nopp",
    lastName: "w",
    watchId: "W1419",
    model:
      "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request",
  },
  {
    date: "Nov 15, 2023",
    company: "MLA Thai",
    firstName: "Robert",
    lastName: "MLA Thai",
    watchId: "W1420",
    model:
      "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request",
  },
  {
    date: "Nov 15, 2023",
    company: "My company",
    firstName: "Paolo",
    lastName: "Manzoli",
    watchId: "W1413",
    model:
      "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request",
  },
  {
    date: "Nov 15, 2023",
    company: "test",
    firstName: "nopp",
    lastName: "ice",
    watchId: "W1414",
    model:
      "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request",
  },
  {
    date: "Nov 15, 2023",
    company: "test1",
    firstName: "test1",
    lastName: "test1",
    watchId: "W1415",
    model:
      "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request",
  },
  {
    date: "Nov 15, 2023",
    company: "Quoter Inc",
    firstName: "Albert",
    lastName: "Quotes",
    watchId: "W1416",
    model:
      "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request",
  },
  {
    date: "Nov 15, 2023",
    company: "Est Corp",
    firstName: "Albert",
    lastName: "Einstein",
    watchId: "W1417",
    model:
      "Rolex / Daytona / 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel 116500LN",
    estimate: "- / -",
    status: "New Estimate Request",
  },
  {
    date: "Nov 11, 2023",
    company: "Stein Diamonds",
    firstName: "Kia",
    lastName: "Zoghi",
    watchId: "W1411",
    model:
      "Patek Philippe / Complications / World Time - 36mm, Green Dial, Green Leather Strap, Rose Gold 7130R-014",
    estimate: "- / -",
    status: "New Estimate Request",
  },
  {
    date: "Nov 11, 2023",
    company: "Karan Company",
    firstName: "Bob",
    lastName: "Karan",
    watchId: "W1412",
    model:
      "Patek Philippe / Complications / World Time - 36mm, Green Dial, Green Leather Strap, Rose Gold 7130R-014",
    estimate: "USD 20,000 / -",
    status: "Estimated",
  },
  {
    date: "Nov 11, 2023",
    company: "MLA",
    firstName: "Robert",
    lastName: "MLA",
    watchId: "W1408",
    model:
      "Patek Philippe / Complications / World Time - 36mm, Green Dial, Green Leather Strap, Rose Gold 7130R-014",
    estimate: "- / -",
    status: "New Estimate Request",
  },
  {
    date: "Nov 11, 2023",
    company: "test est",
    firstName: "nopp",
    lastName: "w",
    watchId: "W1409",
    model:
      "Patek Philippe / Complications / World Time - 36mm, Green Dial, Green Leather Strap, Rose Gold 7130R-014",
    estimate: "- / -",
    status: "New Estimate Request",
  },
  {
    date: "Nov 11, 2023",
    company: "MLA Thai",
    firstName: "Robert",
    lastName: "MLA Thai",
    watchId: "W1410",
    model:
      "Patek Philippe / Complications / World Time - 36mm, Green Dial, Green Leather Strap, Rose Gold 7130R-014",
    estimate: "- / -",
    status: "New Estimate Request",
  },
];
const SellerRevenueAnalysis = () => {
  const [data, setData] = useState(transactionData);

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const staffUser = true;

  const handleSort = (key) => {
    const newOrder = sortField === key && sortOrder === "asc" ? "desc" : "asc";
    setSortField(key);
    setSortOrder(newOrder);

    // Sort data and update state
    const sortedData = sortData(data, key, newOrder);
    setData(sortedData);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="pb-[15px] min-h-[100vh]">
      <div className="px-0 sm:px-[20px] pt-4 flex flex-col justify-between flex-wrap bg-gradient-to-b from-[rgba(0,96,169,0.36)] to-[rgba(255,255,255,0)]">
        <h1 className="text-[26px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans dark:text-white  text-black">
          Revenue Analysis
        </h1>
        <div className="flex items-center sm:flex-row flex-col gap-4 space-x-4 mb-1 px-4">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="fromDate"
              className="text-md dark:text-white  text-black"
            >
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
            <label
              htmlFor="toDate"
              className="text-md dark:text-white  text-black"
            >
              To
            </label>
            <input
              type="date"
              id="toDate"
              placeholder="dd-mm-yyyy"
              className="p-2 border rounded-md text-black"
            />
          </div>
          <button className="bg-[#0060aa] hover:bg-[#0060aa] text-white   font-bold py-2 px-4 rounded">
            Apply Filter
          </button>
          <button className="bg-[#0060aa] hover:bg-[#0060aa] text-white   font-bold py-2 px-4 rounded">
            Clear Filter
          </button>
        </div>
        <h1 className="text-[20px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans dark:text-white  text-black">
          Summary
        </h1>
      </div>

      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px]">
        <table className="table-auto w-full text-left">
          <thead style={{ borderBottom: "2px solid #111111" }}>
            <tr>
              <th className="p-2 dark:text-[#ffff] text-black text-center cursor-pointer">
                Comapny
              </th>
              <th className="p-2 dark:text-[#ffff]  text-black text-center cursor-pointer">
                Email
              </th>
              <th className="p-2 dark:text-[#ffff]  text-black text-center cursor-pointer">
                Total sold to Estipal / Amount
              </th>
              <th className="p-2 dark:text-[#ffff]  text-black text-center cursor-pointer">
                Total partner with Estipal / Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {merchantData?.map((item, index) => (
              <tr key={index} className="border-b border-[#202b34]">
                <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center">
                  {item.Company}
                </td>
                <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black whitespace-nowrap text-center cursor-pointer">
                  {item.Email}
                </td>
                <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                  {item.Total_sold_to_Estipal}
                </td>
                <td className="px-[18px] py-[12px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                  {item.Total_partner_with_Estipal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1 className=" text-[20px] font-medium mb-4 mt-5 px-0 sm:px-[48px] font-sans dark:text-white text-black">
        Transactions
      </h1>
      <div className="flex items-center space-x-2 dark:text-white text-black px-14">
        <span>Select Status:</span>
        <div className="relative inline-block text-left">
          <select className="block appearance-none w-full dark:bg-gray-700 bg-white border border-gray-600 dark:text-white text-black py-2 px-4 pr-8 rounded leading-tight focus:outline-none dark:focus:bg-gray-600 focus:bg-white focus:border-gray-500">
            <option>All</option>
            <option>New Estimated Request</option>
            <option>Estimated</option>
            <option>Pass</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 dark:text-white text-black">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
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
                  {item.date}
                </td>
                <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black whitespace-nowrap text-center">
                  {item.company}
                </td>
                <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center">
                  {item.firstName}
                </td>
                <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                  {item.lastName}
                </td>
                <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                  {item.watchId}
                </td>
                <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                  {item.model}
                </td>
                <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                  {item.estimate}
                </td>
                <td className="px-[18px] py-[10px] dark:text-[#ffff] text-black text-center whitespace-nowrap">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationComponent
        staffUser={staffUser}
        currentPage={currentPage}
        totalPages={data?.length}
        recordsPerPage={recordsPerPage}
        handlePageChange={handlePageChange}
        data={data}
      />
    </div>
  );
};

export default SellerRevenueAnalysis;
