import React from "react";
import { Button } from "@mui/material";

const FilterComponent = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  applyFilter,
  clearFilter,
  groupBy,
  setGroupBy,
}) => {
  return (
    <div className="flex items-center sm:flex-row flex-col gap-4 space-x-4 mb-1 px-4">
      <div className="flex items-center space-x-2">
        <label
          htmlFor="fromDate"
          className="text-md dark:text-white text-black"
        >
          From
        </label>
        <input
          type="date"
          id="fromDate"
          placeholder="dd-mm-yyyy"
          className="p-2 border rounded-md text-black"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="toDate" className="text-md dark:text-white text-black">
          To
        </label>
        <input
          type="date"
          id="toDate"
          placeholder="dd-mm-yyyy"
          className="p-2 border rounded-md text-black"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2 text-white">
        <span>Group By:</span>
        <div className="relative inline-block text-left">
          <select
            className="block appearance-none w-full bg-gray-700 border border-gray-600 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
          >
            <option value={"all"}>All</option>
            <option value={"year"}>Year</option>
            <option value={"month"}>Month</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
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
      <Button
        className="b_btn font-bold py-2 px-4 rounded"
        onClick={applyFilter}
      >
        Apply Filter
      </Button>
      <Button
        className="b_btn font-bold py-2 px-4 rounded"
        sx={{
          color: "white",
          backgroundImage: "linear-gradient(to bottom, #0088cc, #0055cc)",
        }}
        onClick={clearFilter}
      >
        Clear Filter
      </Button>
    </div>
  );
};

export default FilterComponent;
