import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Style/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((response) => {
        console.log(response);
        if (response?.data.message === "Success") {
          localStorage.setItem("username", response?.data.username);
          alert(`Welcome ${response?.data.username}`);
          navigate("/shop");
        }
        else
        {
          alert("incorrect username or password")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-body3">
      <div class="login-main_div">
        <div class="title">Login Form</div>
        <form onSubmit={handleSubmit} action="#">
          <div class="login-input_box">
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div class="login-input_box">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div class="option_div">
            <div class="check_box">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <div class="forget_div"></div>
          </div>
          <div class="login-input_box login-button">
            <input type="submit" value="Login" />
          </div>
          <div class="sign_up"></div>
        </form>
      </div>
    </div>
  );
};

export default Login;
