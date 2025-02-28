import React from "react";

const SelectDropdown = ({
  status,
  setStatus,
  options,
  title,
  setCurrentPage,
}) => {
  return (
    <div className="flex items-center flex-wrap w-full sm:w-auto">
      <label className="mr-2 text-black dark:text-[#ffff] text-center !font-normal">
        {title}
      </label>
      <select
        className="bg-white dark:bg-[#1e252b] dark:text-white text-black p-2 rounded w-full sm:w-[237px]"
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          setCurrentPage(1);
        }}
      >
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
