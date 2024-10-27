import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import "./../css/Home.css";
import axios from "axios";
import {
  CONSTANT,
  capitalizeFirstLetter,
  setCookie,
  getCookie,
} from "../CONSTANT";

const Input = styled("input")({
  display: "none",
});

export default function Home(props) {
  const [looper, setLooper] = useState(0);

  useEffect(() => {
    let timeout;
    if (looper < CONSTANT.moods.length) {
      timeout = setTimeout(() => setLooper(looper + 1), 1000);
    } else {
      setLooper(0);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [CONSTANT.moods, looper]);

  const [file, setFile] = useState([]);
  const [data, setData] = useState();
  const [mood, setMood] = useState("");

  useEffect(() => {
    if (file.length > 0) {
      fetchMood();
    }
  }, [file]);

  useEffect(() => {
    if (
      getCookie("mood") &&
      getCookie("mood") !== "" &&
      getCookie("playlist") &&
      getCookie("playlist") !== ""
    ) {
      setMood(getCookie("mood"));
    }
  }, []);

  const fetchMood = async () => {
    const data = new FormData();
    data.append("image_file", file[0], file[0].name);

    const options = {
      method: "POST",
      url: "https://faceanalysis.p.rapidapi.com/emotions/process_file",
      headers: {
        "X-RapidAPI-Host": CONSTANT.RAPID_API_DOMAIN,
        "X-RapidAPI-Key": CONSTANT.RAPID_API_KEY,
      },
      data: data,
    };

    axios
      .request(options)
      .then(function (response) {
        setData(response.data);
        let emotions =
          response.data?.detections.length > 0
            ? response.data?.detections[0]?.emotions
            : null;
        emotions = {
          angry: emotions["angry"],
          happy: emotions["happy"],
          sad: emotions["sad"],
          surprise: emotions["surprise"],
        };
        let moodNow = Object.keys(emotions).reduce((a, b) =>
          emotions[a] > emotions[b] ? a : b
        );
        setMood(moodNow);
        setCookie("mood", moodNow, 1);
        if (props.session.isLoggedIn) {
          addToDatabase(moodNow);
        }
        setFile([]);
        let temp = CONSTANT.moodsMetaData.filter((a, b) => {
          return a.name === moodNow;
        });
        if (temp.length > 0) {
          setCookie("playlist", temp[0].spotify, 1);
          props.setPlaylist(temp[0].spotify);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const addToDatabase = async (moodNow) => {
    await axios
      .post(CONSTANT.server + "data/insert", {
        user: props.session.personal._id,
        mood: moodNow,
      })
      .then((responce) => {
        if (responce.status === 200) {
          //
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="__Home center-custom" id="home">
      <div className="content w-100 h-100 center-custom">
        <div className="row w-100 h-100 center-custom">
          <div className="col-6">
            <div className="greeting font-small-custom">
              <span className="outer">
                {!props.session.isLoggedIn ? "Login to" : "Hello"}
              </span>{" "}
              <span className="inner">
                {!props.session.isLoggedIn
                  ? "automate mood tracking"
                  : `${props.session.personal.name}!`}
              </span>
            </div>
            <div className="lines center-custom mt-5">
              <p>
                Don't know what <span className="inner">music</span> to{" "}
                <span className="inner">listen</span> to?
              </p>
              <p>
                Click a photo, <span className="inner">upload</span> it below!
              </p>
              <p>
                And find a <span className="inner">playlist</span> that fits
                your <span className="inner">mood</span>
              </p>
            </div>
            <div className="upload mt-5 up-it">
              <label htmlFor="contained-button-file" className="up-it">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  className="up-it"
                  onChange={(e) => {
                    setFile(e.target.files);
                  }}
                />
                <Button
                  variant="contained"
                  component="span"
                  className="Button-Custom-1 upload-custom upload-btn up-it"
                  disabled={file.length > 0 ? true : false}
                >
                  <span className="up-it center-custom">
                    {file.length > 0 ? (
                      <span className="type up-it center-custom">
                        <div
                          className="spinner-border text-light"
                          role="status"
                        ></div>
                        <span className="mx-3">Please Wait...</span>
                      </span>
                    ) : (
                      <span className="type up-it">Upload Photo</span>
                    )}
                  </span>
                </Button>
              </label>
            </div>
            <div className="responce mt-4">
              <p>
                {mood !== "" ? "You are" : "What are you"} currently feeling
                {mood !== "" ? "" : "?"}{" "}
                {mood === ""
                  ? CONSTANT.moods[looper]
                  : CONSTANT.moods[
                      CONSTANT.moodsMetaData.filter((a, b) => {
                        return a.name === mood;
                      })[0].index
                    ]}{" "}
                {mood !== "" ? capitalizeFirstLetter(mood) : ""}
              </p>
            </div>
          </div>
          <div className="col-6 center-custom">
            <div className="hero-gif center-custom">
              <img
                className="main"
                src="https://media.baamboozle.com/uploads/images/370015/1630565374_308237_gif-url.gif"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="wave-custom"></div>
    </div>
  );
}
