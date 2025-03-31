import React from "react";
import { getCurrentYear } from "../../utils";

const Footer = () => {
  const staffUser = JSON.parse(localStorage.getItem("staffUser"));
  return (
    <>
      {staffUser ?
        <footer className="bg-[#1d272e] flex justify-between text-white text-center py-[15px] w-full px-[40px]">
          <div className="flex justify-between gap-4">
          <div>
            <span>Terms & Conditions</span>
          </div>
          <div>
            <span>Privacy Policy</span>
          </div>
          </div>
          <div>
            <span>© {getCurrentYear()} Estipal - All right reserved</span>
          </div>
        </footer>
        :
        <footer className="bg-[#1d272e] text-white text-center p-[15px] w-full">
          <div>
            <span>© {getCurrentYear()} Estipal - All right reserved</span>
          </div>
        </footer>}
    </>

  );
};

export default Footer;
