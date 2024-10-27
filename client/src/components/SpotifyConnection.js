import React, { useEffect } from "react";
// import SpotifyGetPlaylists from "./components/SpotifyGetPlaylists/SpotifyGetPlaylists";
import { CONSTANT } from "./../CONSTANT";

const CLIENT_ID = CONSTANT.SPOTIFY_CLIENT_ID; // insert your client id here from spotify
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = CONSTANT.client;
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
/* 
http://localhost:3000/webapp#access_token=ABCqxL4Y&token_type=Bearer&expires_in=3600
*/
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

const SpotifyConnection = () => {
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);

      localStorage.clear();

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    }
  });

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <div className="container">
      <button onClick={handleLogin}>Login to Spotify</button>
      {/* <SpotifyGetPlaylists /> */}
    </div>
  );
};

export default SpotifyConnection;
