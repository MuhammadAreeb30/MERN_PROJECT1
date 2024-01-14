import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const callAboutPage = async () => {
    try {
      const res = await fetch("http://localhost:5000/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 200) {
        setUserData(data);
      } else {
        navigate("/login");
        setTimeout(() => {
          alert("Please log in to explore the About page.");
        }, 300);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="container about-page">
        <div className="about-container">
          <form method="GET">
            <div className="row">
              <div className="col-md-4 profile-img">
                <img src="./images/profile.jpg" alt="profile" />
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <h5>{userData.name}</h5>
                  <h6>{userData.work}</h6>
                  <p className="profile-rating mt-3 mb-5">
                    RANKINGS: <span>1/10</span>
                  </p>

                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="home-tab"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="profile-tab"
                        data-toggle="tab"
                        href="#profile"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Timeline
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                <input
                  type="submit"
                  value="Edit Profile"
                  name="btnAddMore"
                  className="edit-btn"
                />
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-4 work-content">
                <p className="work-link-heading">WORK LINK</p>
                <a
                  href="https://www.linkedin.com/in/muhammad-areeb-09aa1126a/"
                  target="_areeb"
                  className="work-link mt-3"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/m_______areeb/"
                  target="_areeb"
                  className=" work-link mt-3"
                >
                  Instagram
                </a>
                <a
                  href="https://github.com/MuhammadAreeb30"
                  target="_areeb"
                  className=" work-link mt-3"
                >
                  Github
                </a>
                <a
                  href="https://muhammadareebportfolioweb.netlify.app/"
                  target="_areeb"
                  className="work-link mt-3"
                >
                  PortFolio Website
                </a>
              </div>

              <div className="col-md-8 about-info">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>User ID</label>
                      </div>
                      <div className="col-md-6 ans">
                        <p>{userData._id}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6 ans">
                        <p>{userData.name}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6 ans">
                        <p>{userData.email}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-6 ans">
                        <p>+92 {userData.phone}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Profession</label>
                      </div>
                      <div className="col-md-6 ans">
                        <p>{userData.work}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>Experience</label>
                      </div>
                      <div className="col-md-6 ans">
                        <p>Expert</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Hourly Rate</label>
                      </div>
                      <div className="col-md-6 ans">
                        <p>10$/hr</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Total Projects</label>
                      </div>
                      <div className="col-md-6 ans">
                        <p>150</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Availability</label>
                      </div>
                      <div className="col-md-6 ans">
                        <p>6 months</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default About;
