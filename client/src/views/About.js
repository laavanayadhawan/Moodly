import React, { useState } from "react";
import "./../css/About.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MicIcon from "@mui/icons-material/Mic";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

export default function About() {
  return (
    <div className="__About center-custom" id="about">
      <div className="content w-100 h-100 center-custom">
        <h1>About</h1>
        <div className="mt-4 mb-4">
          <img src="arrow.svg" loading="lazy" alt="" className="arrow" />
        </div>
        <div className="row w-100 h-100 center-custom">
          <div className="col-4 p-3 card-custom">
            <div className="icon">
              <FavoriteIcon />
            </div>
            <div className="desc">
              We know your heart! We use face recognition to detect the emotion
              you are currently feeling: happy, sad, angry or surprised.
            </div>
          </div>
          <div className="col-4 p-3 card-custom">
            <div className="icon">
              <MicIcon />
            </div>
            <div className="desc">
              For each mood we have curated a Spotify playlist with songs that
              match the mood you are in. We have included top hits as well as
              hidden gems in our playlists.
            </div>
          </div>
          <div className="col-4 p-3 card-custom">
            <div className="icon">
              <WatchLaterIcon />
            </div>
            <div className="desc">
              We help you save time by eliminating the need to spend hours
              searching for the perfect songs that match your mood! With our
              Mood Log you can even keep track of the moods you have been in
              lately.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
