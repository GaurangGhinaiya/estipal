import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchQuery, setSearchQuery, placeholder,setCurrentPage }) => {
  return (
    <form className="input-group estipal-input-group bg-white dark:bg-[#1e252b] rounded-[5px] w-full sm:w-auto">
      <span className="input-group-addon estipal-input-group-icon">
        <SearchIcon sx={{ fontSize: "20px" }} />
      </span>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          e.preventDefault();
          setSearchQuery(e.target.value)
          setCurrentPage(1)
        }}
        className="search-box dark:text-white text-black estipal-input-group-control !border-none !bg-transparent w-full sm:w-[240px]"
        placeholder={placeholder}
      />
    </form>
  );
};

export default SearchBar;
