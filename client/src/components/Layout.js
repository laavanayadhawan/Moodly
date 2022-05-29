import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Home from "./../views/Home";
import About from "./../views/About";
import Contact from "./../views/Contact";
import Playlist from "./../views/Playlist";
import History from "./../views/History";
import { CONSTANT, getCookie } from "../CONSTANT";
export default function Layout(props) {
  let __init_session = {
    personal: {
      name: "",
      email: "",
      password: "",
      addedAt: "",
      _id: "",
    },
    isLoggedIn: false,
  };
  const [data, setData] = useState(__init_session);
  useEffect(() => {
    let sessionData = JSON.parse(sessionStorage.getItem("loggedin"));
    if (sessionData) {
      setData({
        personal: sessionData.data,
        isLoggedIn: true,
      });
    }
  }, []);
  const [playlist, setPlaylist] = useState("");

  useEffect(() => {
    if (
      getCookie("mood") &&
      getCookie("mood") !== "" &&
      getCookie("playlist") &&
      getCookie("playlist") !== ""
    ) {
      setPlaylist(getCookie("playlist"));
    }
  }, []);

  return (
    <>
      {props.isHistory ? (
        <>
          <Navbar session={data} setSession={setData} />
          <History session={data} />
        </>
      ) : (
        <>
          <Navbar
            session={data}
            setSession={setData}
            __init_session={__init_session}
          />
          <Home session={data} setPlaylist={setPlaylist} />
          {playlist !== "" ? <Playlist link={playlist} /> : ""}
          <About />
          <Contact />
        </>
      )}
    </>
  );
}
