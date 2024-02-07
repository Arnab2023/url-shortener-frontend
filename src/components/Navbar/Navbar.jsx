import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function Navbar({ showText }) {
  const { loggedUser, setLoggedUser } = useUser();
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="img">
        <img
          src="https://cdn0.iconfinder.com/data/icons/very-basic-android-l-lollipop-icon-pack/24/globe-512.png"
          alt=""
        />
        <p>URL Shortener</p>
      </div>
      <div className="nav">
        {loggedUser ? (
          <>
            {" "}
            <button
              className="bton"
              onClick={() =>
                navigate(showText === "dashboard" ? "/dashboard" : "/")
              }
            >
              {showText === "dashboard" ? "Dashboard" : "Shorten URL"}
            </button>
            <button
              className="bton"
              onClick={() => {
                setLoggedUser(null);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="bton" onClick={() => navigate("/register")}>
              Register
            </button>
            <button className="bton" onClick={() => navigate("/login")}>
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
