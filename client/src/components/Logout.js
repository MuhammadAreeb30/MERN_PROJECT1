import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const userLogOut = async () => {
    const res = await fetch("http://localhost:5000/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (res.status === 200) {
      navigate("/login", { replace: true });
    } else {
      const error = new Error(res.error);
      throw error;
    }
  };

  useEffect(() => {
    userLogOut();
  }, []);

  return <></>;
};

export default Logout;
