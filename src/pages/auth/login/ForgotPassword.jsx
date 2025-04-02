import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import bgImage from "../../../assets/images/img-bg-login.png";
import axiosInstance from "../../../services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import logo from "../../../assets/images/icons/logo.png";
import { getCurrentYear } from "../../../utils";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/sellers/forgetPassword`,
        {
          email: data?.email,
        }
      );
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="login-form-wrapper">
        <div className="login-form">
          <div className="logo text-center">
            <img src={logo} alt="logo" className="mx-auto" />
          </div>
          <div className="title text-center">Forgot Password</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group !mb-4">
              <label htmlFor="email">* Email</label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                )}
              />
              {errors?.email && (
                <p className="text-red-500 text-sm">{errors?.email?.message}</p>
              )}
            </div>

            <div className="w-100-p pt-2 pb-5" style={{ marginTop: "15px" }}>
              <button
                type="submit"
                className="btn bg-[#3c8dbc] w-full !py-[7px]"
                style={{ borderRadius: "20px" }}
              >
                <div className="flex items-center justify-center gap-4">
                  Send{" "}
                  {loading && (
                    <CircularProgress size={15} className="!text-white" />
                  )}
                </div>
              </button>
            </div>
          </form>
          <button
            className="text-[#039be5] mx-auto block text-[16px] py-[10px] px-[10px]"
            onClick={() => navigate("/login")}
          >
            Go back to login
          </button>
        </div>
        <footer>© {getCurrentYear()} Estipal - All right reserved</footer>
      </div>
    </div>
  );
};

export default ForgotPassword;
