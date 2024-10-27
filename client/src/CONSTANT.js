const DOMAINS = {
  server: "http://13.127.6.177:4000/", // CHANGE WITH YOUR BACKEND LINK (/ is MUST IN END)
  client: "http://13.127.6.177:4000/", // CHANGE WITH YOUR FRONTEND LINK (/ is MUST IN END)
};

export const CONSTANT = {
  ...DOMAINS,
  RAPID_API_KEY: "35ce833c73mshd9c90ed0bd41e2ap10534ejsn1ef1a9b2c23d", // YOURS ALREADY
  RAPID_API_DOMAIN: "faceanalysis.p.rapidapi.com", // YOURS ALREADY
  SPOTIFY_CLIENT_ID: "adc3db12fb5c4ee2a2028c8303186de0", // YOURS ALREADY
  moods: ["😀", "😞", "😡", "😲"],
  moodsMetaData: [
    {
      name: "happy",
      index: 0,
      spotify: "1RxmKsnfOfeiPVxleFoXTq",
    },
    {
      name: "sad",
      index: 1,
      spotify: "4OvKlzSxuGo7TOgdMx9DLj",
    },
    {
      name: "angry",
      index: 2,
      spotify: "5rtJmAT3cFKpkkhFaFcKzR",
    },
    {
      name: "surprise",
      index: 3,
      spotify: "309c7Hj0B77oswGnNfx3S0",
    },
  ],
};

export const checkLoginFromLogin = () => {
  return sessionStorage.getItem("loggedin") &&
    JSON.parse(sessionStorage.getItem("loggedin")).data
    ? true
    : false;
};

export const checkLoginFromNonLogin = () => {
  return sessionStorage.getItem("loggedin") &&
    JSON.parse(sessionStorage.getItem("loggedin")).data
    ? false
    : true;
};

export const Loader = (extra = "") => {
  return (
    <div class={`spinner-grow ${extra}`} role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  );
};

export const setMessage = (text, color) => {
  let error = document.getElementById("error");
  error.innerHTML = text;
  error.classList.add("text-" + color);
  error.style.display = "block";
};

export const resetMessage = () => {
  let error = document.getElementById("error");
  error.innerText = "";
  error.style.display = "none";
  error.classList.remove("text-danger");
  error.classList.remove("text-success");
};

export const isMessage = () => {
  let error = document.getElementById("error");
  if (error.style.display === "none") {
    return false;
  }
  return true;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Set a Cookie
export function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

export function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split("; ");
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}
