import React, { useState } from "react";
import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const naviagte = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Invalid Confidential");
    } else {
      window.alert("Login Successfull");
      naviagte("/");
    }
  };

  return (
    <>
      <div className="signin">
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <img
                src="./images/login.png"
                alt="signin-img"
                className="signin-img"
              />
            </figure>
            <NavLink to="/signup" className="signup-img-link">
              Create an Account
            </NavLink>
          </div>

          <div className="signin-form">
            <h2 className="form-title">Login</h2>
            <div className="register-form">
              <div className="form-group">
                <label htmlFor="email">
                  <IoMail />
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <FaLock />
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  autoComplete="off"
                />
              </div>
              <div className="register-btn">
                <input
                  type="submit"
                  value="Log In"
                  name="signin"
                  onClick={loginUser}
                  className="signup-btn"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
