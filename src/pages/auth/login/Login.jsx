import React from "react";
import bgImage from "../../../assets/images/img-bg-login.png";

const Login = () => {
  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="login-form-wrapper">
        <div className="login-form">
          <div class="logo text-center">
            <img
              src="https://www.estipal.com/assets/dist/images/img-logo-login.svg"
              alt="logo"
              className="mx-auto"
            />
          </div>
          <div class="title text-center">Sign in Estipal</div>
          <form>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                name="username"
                value=""
                id="username"
                class="form-control"
              />
            </div>{" "}
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                value=""
                id="password"
                class="form-control"
              />
            </div>{" "}
            <div>
              <a href="" className="text-[#039be5]">
                Forgot password?
              </a>
            </div>
            <div class="w-100-p" style={{ marginTop: "15px" }}>
              <button
                type="submit"
                class="btn bg-[#3c8dbc] w-full"
                style={{ borderRadius: "20px" }}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        <footer>© 2024 Estipal - All right reserved</footer>
      </div>
    </div>
  );
};

export default Login;
