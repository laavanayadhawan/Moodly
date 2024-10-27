import React, { useState } from "react";
import "./../css/Contact.css";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";

export default function Contact() {
  return (
    <div className="__Contact center-custom" id="contact">
      <div className="wave-custom"></div>
      <div className="content w-100 h-100 center-custom">
        <h1>Contact</h1>
        <div className="mt-4 mb-4">
          <img src="arrow.svg" loading="lazy" alt="" className="arrow" />
        </div>
        <div className="row center-custom w-100">
          <div className="col-6 p-3 card-custom">
            <div className="icon">
              <PersonIcon />
            </div>
            <div className="col-6">
              <div className="attr text-center text-light">Name</div>
              <div className="desc text-center">Laavanaya Dhawan</div>
            </div>
          </div>
          <div className="col-6 p-3 card-custom">
            <div className="icon">
              <MailIcon />
            </div>
            <div className="col-6">
              <div className="attr text-center text-light">Email</div>
              <div className="desc text-center">ldhawan03@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
