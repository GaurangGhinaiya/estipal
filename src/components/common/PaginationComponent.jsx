import React from "react";
import Pagination from "@mui/material/Pagination";

const PaginationComponent = ({ data, totalPages, currentPage, handlePageChange, recordsPerPage }) => {
  const totalPagesData = Math.ceil(totalPages / recordsPerPage);
  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Number(currentPage) * Number(recordsPerPage);

  return (
    <div className="flex justify-end items-center gap-5 px-[20px] sm:px-[10px] py-[10px]">
      <div className="text-[#ffff] hidden sm:block">{data?.length > 0 ? startRecord : 0} - {data?.length > 0 ? endRecord : 0} of {totalPages}</div>
      <div className="flex items-center pt-[5px]">
        <Pagination
          count={totalPagesData}
          page={currentPage}
          onChange={(e, page) => handlePageChange(page)}
          variant="outlined"
          shape="rounded"
          sx={{
            "& .css-ptck8z-MuiButtonBase-root-MuiPaginationItem-root": {
              border: "none",
              color: "#ffff",
            },
            "& .css-ptck8z-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
            {
              backgroundColor: "#0060aa",
            },
            "& .css-btxnvc-MuiPaginationItem-root": {
              color: "#ffff",
            },
          }}
        />
      </div>
    </div>
  );
};

export default PaginationComponent;
