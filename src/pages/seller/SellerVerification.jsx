import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/images/icons/logo.png";
import verifiedIcon from "../../assets/images/icons/verified-icon.png";
import bgImage from "../../assets/images/img-bg-login.png";
import axiosInstance from "../../services";
import { getCurrentYear } from "../../utils";

const SellerVerification = () => {
  const { code, type } = useParams();
  const navigate = useNavigate();
  const [sellerData, setSellerData] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (code && type) {
      axiosInstance
        .get(`/sellers/verifyEmail?${"authcode"}=${code}&${"type"}=${type}`)
        .then((response) => {
          setSellerData(response?.payload?.verifyData);
          if (response?.status === 200 && response?.payload?.verifyData) {
            setApiSuccess(true);
          }
        })
        .catch((error) => {
          toast.error("Failed to Verify Email");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [code, type]);

  return (
    <div
      className="login-container "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="login-form-wrapper">
        <div className="login-form !max-w-[600px] !p-[20px]">
          <div className="logo text-center !w-full">
            <img src={logo} alt="logo" className="block mx-auto" />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-full">
              <CircularProgress />
            </div>
          ) : apiSuccess ? (
            <>
              <h3 className="pt-[32px] pb-[15px] flex items-center gap-5 font-semibold text-[18px]">
                <img src={verifiedIcon} alt="" className="w-[60px]" />
                You have successfully verified your account
              </h3>

              <h3 className="py-[18px] flex items-center gap-5 font-semibold text-[18px]">
                To log in to Estipal please create your password here:{" "}
              </h3>

              <button
                className="text-[#2e00d3] mx-auto block text-[16px] py-[10px] px-[10px]"
                onClick={() =>
                  navigate(
                    `/admin_forgot_password/update_password/${sellerData?.token}/${sellerData?.admin_seller_id}/${sellerData?.email}/${sellerData?.type}`
                  )
                }
              >
                Create New Password
              </button>
            </>
          ) : (
            <h3 className="pt-[32px] pb-[15px] flex items-center gap-5 font-semibold text-[18px]">
              Verification was not successful. Please try again.
            </h3>
          )}
        </div>
        <footer>© {getCurrentYear()} Estipal - All right reserved</footer>
      </div>
    </div>
  );
};

export default SellerVerification;
