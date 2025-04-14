import React from "react";
import Pagination from "@mui/material/Pagination";

import { translate } from "../../language";

const PaginationComponent = ({
  userRole,
  data,
  totalPages,
  currentPage,
  handlePageChange,
  recordsPerPage,
}) => {
  const totalPagesData = Math.ceil(totalPages / recordsPerPage);
  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Number(currentPage) * Number(recordsPerPage);

  return (
    <div className="flex justify-end items-center gap-5   sm:px-[10px] py-[10px]">
      <div className="dark:text-[#ffff] text-black hidden sm:block">
        {data?.length > 0 ? startRecord : 0} -{" "}
        {data?.length > 0 ? endRecord : 0} {translate("OF")} {totalPages}
      </div>
      <div className="flex items-center pt-[5px]">
        <Pagination
          count={totalPagesData}
          page={currentPage}
          onChange={(e, page) => handlePageChange(page)}
          variant="outlined"
          shape="rounded"
          Name={`pagination ${userRole === "staff" ? "staff" : "non-staff"}`}
          sx={{
            "& .MuiButtonBase-root": {
              border: "none !important",
              color:
                userRole === "staff"
                  ? "#000000 !important"
                  : "#ffffff !important",
            },
            "& .Mui-selected": {
              backgroundColor: "#0060aa !important",
              color:
                userRole === "staff" ? "#ffff !important" : "#ffff !important",
            },
            "& .MuiPaginationItem-root": {
              color: userRole === "staff" ? "#000000 " : "#ffffff ",
            },
          }}
        />{" "}
      </div>{" "}
    </div>
  );
};
export default PaginationComponent;
