import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchQuery, setSearchQuery, placeholder }) => {
  return (
    <form className="input-group estipal-input-group bg-[#1e252b] rounded-[5px] w-full sm:w-auto">
      <span className="input-group-addon estipal-input-group-icon">
        <SearchIcon sx={{ fontSize: "20px" }} />
      </span>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-box text-white estipal-input-group-control !border-none !bg-transparent w-full sm:w-[240px]"
        placeholder={placeholder}
      />
    </form>
  );
};

export default SearchBar;
