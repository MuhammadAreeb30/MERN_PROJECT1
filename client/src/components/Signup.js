import React, { useState } from "react";
import { FaUser, FaPhoneVolume, FaRegSquareMinus } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {

    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
    } else {
      window.alert("Registration Successful");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="signup">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>
            <div className="register-form">
              <form method="POST">
              <div className="form-group">
                <label htmlFor="name">
                  <FaUser />
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  id="name"
                  autoComplete="off"
                  value={user.name}
                  onChange={handleInputs}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <IoMail />
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  id="email"
                  autoComplete="off"
                  value={user.email}
                  onChange={handleInputs}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">
                  <FaPhoneVolume />
                </label>
                <input
                  type="number"
                  name="phone"
                  placeholder="Your Phone"
                  id="phone"
                  autoComplete="off"
                  value={user.phone}
                  onChange={handleInputs}
                />
              </div>
              <div className="form-group">
                <label htmlFor="work">
                  <FaRegSquareMinus />
                </label>
                <input
                  type="text"
                  name="work"
                  placeholder="Your Profession"
                  id="work"
                  autoComplete="off"
                  value={user.work}
                  onChange={handleInputs}
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
                  id="password"
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInputs}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cpassword">
                  <FaLock />
                </label>
                <input
                  type="password"
                  name="cpassword"
                  placeholder="Confirm Your Password"
                  id="cpassword"
                  autoComplete="off"
                  value={user.cpassword}
                  onChange={handleInputs}
                />
              </div>
              <div className="register-btn">
                <input
                  type="submit"
                  value="Regiter"
                  name="signup"
                  className="signup-btn"
                  onClick={postData}
                />
              </div>
              </form>
            </div>
          </div>

          <div className="signup-image">
            <figure>
              <img
                src="./images/signup.jpg"
                alt="signup-img"
                className="signup-img"
              />
            </figure>
            <NavLink to="/login" className="signup-img-link">
              I am Already Register
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
