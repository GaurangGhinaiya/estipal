import React from "react";
import Pagination from "@mui/material/Pagination";

const PaginationComponent = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="flex justify-end items-center gap-5 px-[20px] sm:px-[10px] py-[10px]">
      <div className="text-[#ffff] hidden sm:block">1 - 20 of 90</div>
      <div className="flex items-center pt-[5px]">
        <Pagination
          count={totalPages}
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
