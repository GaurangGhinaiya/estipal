import { useNavigate } from "react-router-dom";
import { getCurrentYear } from "../../utils";

const Footer = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  return (
    <>
      {userRole === "staff" ? (
        <footer className="bg-[#1d272e] flex justify-between flex-col sm:flex-row gap-1 text-white text-center py-[15px] w-full px-[40px]">
          <div className="flex justify-between gap-4">
            <div>
              <span>Terms & Conditions</span>
            </div>
            <div>
              <span
                onClick={() => {
                  navigate("/privacy");
                  window.scrollTo(0, 0);
                }}
                className="cursor-pointer"
              >
                Privacy Policy
              </span>
            </div>
          </div>
          <div>
            <span>© {getCurrentYear()} Estipal - All right reserved</span>
          </div>
        </footer>
      ) : (
        <footer className="bg-[#1d272e] text-white text-center p-[15px] w-full">
          <div>
            <span>© {getCurrentYear()} Estipal - All right reserved</span>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
