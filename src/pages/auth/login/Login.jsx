import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import bgImage from "../../../assets/images/img-bg-login.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import logo from "../../../assets/images/icons/logo.png";
import { getCurrentYear } from "../../../utils";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  // Login handler
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PUBLIC_BASE_URL}/login`,
        data
      );
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        localStorage.setItem("authToken", response?.data?.payload?.token);
        localStorage.setItem("userRole", "admin");
        // localStorage.setItem("userRole", "staff");
        window.location.reload()
        navigate("/admin");
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
          <div className="title text-center">Sign in Estipal</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: "Username is required",
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="username"
                    className="form-control"
                    placeholder="Enter your username"
                  />
                )}
              />
              {errors?.username && (
                <p className="text-red-500 text-sm">
                  {errors?.username?.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                )}
              />
              {errors?.password && (
                <p className="text-red-500 text-sm">
                  {errors?.password?.message}
                </p>
              )}
            </div>

            <div>
              <button
                className="text-[#039be5]"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login/forgot_password");
                }}
              >
                Forgot password?
              </button>
            </div>
            <div className="w-100-p" style={{ marginTop: "15px" }}>
              <button
                type="submit"
                className="btn bg-[#3c8dbc] w-full"
                style={{ borderRadius: "20px" }}
              >
                <div className="flex items-center justify-center gap-4">
                  Sign In{" "}
                  {loading && (
                    <CircularProgress size={15} className="!text-white" />
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>
        <footer>© {getCurrentYear()} Estipal - All right reserved</footer>
      </div>
    </div>
  );
};

export default Login;
