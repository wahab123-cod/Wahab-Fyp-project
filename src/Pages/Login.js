import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Style/login.css";
import soccerBallIcon from '../images/download.jpg'
import Navbar from "./Navbar";
import Footer from "./Footer";
const Login = () => {
  const [hasRejectedBookings, setHasRejectedBookings] = useState(false);
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
        } else {
          alert("Incorrect email or password");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
     <>
      <Navbar hasRejectedBookings={hasRejectedBookings} />
    <div className="login-body sports-ecommerce">

      <div className="login-main_div">
        <div className="title">
          <img src={soccerBallIcon} alt="Soccer Ball" className="icon" />
          Login Form
        </div>
        <form onSubmit={handleSubmit}>
          <div className="login-input_box">
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="login-input_box">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className="option_div">
            <div className="check_box">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <div className="forgot_password">
              <a href="#">Forgot Password?</a>
            </div>
          </div>
          <div className="login-input_box login-button">
            <button type="submit">Login</button>
          </div>
          <div className="sign_up">
            Don't have an account? <a href="signup">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;
