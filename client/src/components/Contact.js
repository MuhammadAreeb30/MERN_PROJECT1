import React, { useState, useEffect } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoMailUnreadSharp } from "react-icons/io5";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const callAboutPage = async () => {
    try {
      const res = await fetch("http://localhost:5000/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 200) {
        setUserData({
          ...userData,
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // storing the data in state

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  // send the data in backend
  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const res = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
      credentials: "include",
    });
    const sendData = await res.json();
    console.log(sendData);
    if (!sendData) {
      console.log("Message nhi gya");
    } else {
      alert("Message Successfully Send");
      setUserData({ ...userData, message: "" });
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="contact-page">
        <div className="mt-5">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 contact-main-div">
              <div className="contact-info">
                <FaMobileAlt className="contact_icon" />
                <div className="contact-content">
                  <h3>Phone</h3>
                  <p>+92 3424273916</p>
                </div>
              </div>

              <div className="contact-info">
                <IoMailUnreadSharp className="contact_icon" />
                <div className="contact-content">
                  <h3>Mail</h3>
                  <p>muhammadareeb0897@gmail.com</p>
                </div>
              </div>

              <div className="contact-info">
                <FaMapLocationDot className="contact_icon" />
                <div className="contact-content">
                  <h3>Address</h3>
                  <p>Pakistan, Karachi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-form mt-5 d-flex justify-content-center align-items-center">
          <div className="contact-form-container py-5">
            <h2>Get In Touch</h2>
            <form id="contact-form" method="POST">
              <div className="contact-form-div d-flex justify-content-center align-items-center mt-5">
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  placeholder="Your Name"
                  onChange={handleInputs}
                  required
                  className="form-input"
                  id="contact-form-name"
                />
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  placeholder="Your Email"
                  onChange={handleInputs}
                  required
                  className="form-input"
                  id="contact-form-email"
                />
                <input
                  type="number"
                  name="phone"
                  value={userData.phone}
                  placeholder="Your Phone Number"
                  onChange={handleInputs}
                  required
                  className="form-input"
                  id="contact-form-phone"
                />
              </div>
              <div className="text-feild">
                <textarea
                  name="message"
                  placeholder="Message..."
                  onChange={handleInputs}
                  className="form-input"
                  id="contact-form-msg"
                  required
                  cols="10"
                  rows="20"
                ></textarea>
              </div>
              <div className="contact-button">
                <button
                  type="submit"
                  onClick={contactForm}
                  className="signup-btn"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
