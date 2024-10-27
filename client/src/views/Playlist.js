import React, { useEffect, useState } from "react";
import "./../css/Playlist.css";
import SpotifyConnection from "../components/SpotifyConnection";
import axios from "axios";
import { CONSTANT } from "./../CONSTANT";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = CONSTANT.SPOTIFY_CLIENT_ID; // insert your client id here from spotify
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};

const PLAYLISTS_ENDPOINT = (playlist_id) => {
  return "https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks";
};

export default function Playlist(props) {
  const REDIRECT_URL_AFTER_LOGIN = CONSTANT.client;
  let navigate = useNavigate();
  const [link, setLink] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
      navigate("/");
    }
  }, []);

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  useEffect(() => {
    if (props.link !== "") {
      setLink(props.link);
    }
  }, [props]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
      handleGetPlaylists(localStorage.getItem("accessToken"));
    } else {
      handleLogin();
    }
  }, [props.link]);

  const handleGetPlaylists = (tokenFetched) => {
    axios
      .get(PLAYLISTS_ENDPOINT(props.link), {
        headers: {
          Authorization: "Bearer " + tokenFetched,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        if (
          error.response.data !==
          "User not registered in the Developer Dashboard"
        ) {
          localStorage.clear();
          handleLogin();
        }
        console.log(error);
      });
  };

  return (
    <div className="__Playlist">
      {/* <SpotifyConnection /> */}
      <div className="content h-100 center-custom">
        <h1>Playlist For You</h1>
        <div className="mt-4 mb-4">
          <img src="arrow.svg" loading="lazy" alt="" className="arrow" />
        </div>
        <div className="tracks row center-custom">
          {data &&
            data.items.map((one, i) => {
              return (
                <div className="col-lg-3 col-sm-12 col-md-4 mt-2 mb-2 center-custom">
                  <div className="card">
                    <a
                      href={one.track.external_urls.spotify}
                      target="_blank"
                      className="mainCard"
                    >
                      <img
                        className="card-img-top"
                        src={one.track.album.images[0].url}
                        alt={one.track.album.images[0].name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{one.track.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {one.track.artists[0].name}
                        </h6>
                      </div>
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
