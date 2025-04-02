import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/images/icons/logo.png";
import bgImage from "../../assets/images/img-bg-login.png";
import axiosInstance from "../../services";
import { getCurrentYear } from "../../utils";

const UpdatePassword = () => {
  const { token, id, email } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `sellers/resetPassword?token=${token}&email=${email}&user_id=${id}`,
        {
          password: data.password,
          confirm_password: data.confirm_password,
        }
      );
      console.log("response: ", response);
      localStorage.clear();
      toast.success("Password updated successfully");
      navigate("/login");
      setLoading(false);
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
          <div className="title text-center">Reset Password</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group !mb-4">
              <label htmlFor="password">* Password</label>
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

            <div className="form-group !mb-4">
              <label htmlFor="confirm_password">* Confirm Password</label>
              <Controller
                name="confirm_password"
                control={control}
                rules={{
                  required: "Confirm Password is required",
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="confirm_password"
                    type="password"
                    className="form-control"
                    placeholder="Enter your confirm password"
                  />
                )}
              />
              {errors?.password && (
                <p className="text-red-500 text-sm">
                  {errors?.confirm_password?.message}
                </p>
              )}
            </div>

            <div className="w-100-p pt-2 pb-5" style={{ marginTop: "15px" }}>
              <button
                type="submit"
                className="btn bg-[#3c8dbc] w-full !py-[7px]"
                style={{ borderRadius: "20px" }}
              >
                <div className="flex items-center justify-center gap-4">
                  Submit{" "}
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

export default UpdatePassword;
