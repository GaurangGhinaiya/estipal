import React from "react";
import { useNavigate } from "react-router-dom";

const SelectDropdown = ({
  status,
  setStatus,
  options,
  title,
  setCurrentPage,
  page,
  sellerId,
  estimatorId,
  staffId,
}) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setCurrentPage(1);

    let url = `?page=1`;
    if (newStatus !== "All") {
      url += `&status=${newStatus}`;
    }
    if (sellerId) {
      url += `&seller_id=${sellerId}`;
    }
    if (estimatorId) {
      url += `&estimator_id=${estimatorId}`;
    }
    if (staffId) {
      url += `&staff_id=${staffId}`;
    }
    navigate(url);
  };

  return (
    <div className="flex items-center flex-wrap w-full sm:w-auto">
      <label className="mr-2 text-black dark:text-[#ffff] text-center !font-normal">
        {title}
      </label>
      <select
        className="bg-white dark:bg-[#1e252b] dark:text-white text-black p-2 rounded w-full sm:w-[237px]"
        value={status}
        onChange={handleChange}
      >
        {options?.map((option, index) => (
          <option key={index} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
