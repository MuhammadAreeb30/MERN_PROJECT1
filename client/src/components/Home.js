import React, { useState, useEffect } from "react";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);

  const userHomePage = async () => {
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
      if (data.status === 200) {
        setUserName(data.name);
        setShow(true);
      }else{
        setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userHomePage();
  }, []);

  return (
    <>
      <div className="home-page">
        <div className="home-content">
          <p>Welcome</p>
          <h1>{userName}</h1>
          <h2>
            {show ? "Happy to see you back" : "We are the Mern Developer"}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Home;
