import React from "react";
import { getCurrentYear } from "../../utils";

const Footer = () => {
  return (
    <footer className="bg-[#1d272e] text-white text-center p-[15px] w-full">
      <div>
        <span>© {getCurrentYear()} Estipal - All right reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
