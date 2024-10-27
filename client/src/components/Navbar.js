import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./../css/Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = (props) => {
  let navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("loggedin");
    props.setSession(props.__init_session);
    navigate("/");
  };

  const jumpTo = (name) => {
    document.getElementById(name).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg __Navbar">
        {/* <span className="navbar-brand brand-name">Moodly</span> */}
        <Link to="/">
          <span className="navbar-brand brand-name center-custom mx-5">
            <img src="logo.png" className="name" />
            <img src="music-note.webp" className="mx-2 icon" />
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <MenuIcon className="icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <button
                className="Button-Custom-1 purple"
                onClick={() => {
                  jumpTo("home");
                }}
              >
                <span className="content">
                  <span className="type">Home</span>
                </span>
              </button>
            </li>
            <li className="nav-item signup">
              <button
                className="Button-Custom-1 purple"
                onClick={() => {
                  jumpTo("about");
                }}
              >
                <span className="content">
                  <span className="type">About</span>
                </span>
              </button>
            </li>
            <li className="nav-item signup">
              <button
                className="Button-Custom-1 purple"
                onClick={() => {
                  jumpTo("contact");
                }}
              >
                <span className="content">
                  <span className="type">Contact</span>
                </span>
              </button>
            </li>
          </ul>
          <div className="form-inline my-2 my-lg-0">
            <ul className="navbar-nav mr-auto">
              {props.session.isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link to="/history" className="Button-Custom-1 upload-btn">
                      <span className="content">
                        <span className="type">History</span>
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item signup">
                    <button
                      className="Button-Custom-1 upload-btn"
                      onClick={logout}
                    >
                      <span className="content">
                        <span className="type">Logout</span>
                      </span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item signup">
                    <Link to="/login" className="Button-Custom-1 upload-btn">
                      <span className="content">
                        <span className="type">Log In</span>
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item signup">
                    <Link to="/register" className="Button-Custom-1 upload-btn">
                      <span className="content">
                        <span className="type">Register</span>
                      </span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
