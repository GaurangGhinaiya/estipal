import React from "react";

const SelectStatusComponent = ({ selectedStatus, setSelectedStatus }) => {
  return (
    <div className="flex items-center space-x-2 dark:text-white text-black px-14 max-md:px-[20px]">
      <span>Select Status:</span>
      <div className="relative inline-block text-left">
        <select
          className="block appearance-none w-full dark:bg-gray-700 bg-white border border-gray-600 dark:text-white text-black py-2 px-4 pr-8 rounded leading-tight focus:outline-none dark:focus:bg-gray-600 focus:bg-white focus:border-gray-500"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="All" selected>
            All
          </option>
          <option value="New Estimate Request">New Estimate Request</option>
          <option value="Estimated">Estimated</option>
          <option value="Pass">Pass</option>
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
  );
};

export default SelectStatusComponent;
