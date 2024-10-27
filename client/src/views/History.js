import React, { useState, useEffect } from "react";
import "./../css/History.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  CONSTANT,
  capitalizeFirstLetter,
  checkLoginFromNonLogin,
} from "../CONSTANT";
export default function History(props) {
  let navigate = useNavigate();
  useEffect(() => {
    if (checkLoginFromNonLogin()) {
      navigate("/");
    }
  }, []);

  const [history, setHistory] = useState([]);

  const getData = async () => {
    await axios
      .get(CONSTANT.server + "data/view/" + props.session.personal._id)
      .then((responce) => {
        if (responce.status === 200) {
          setHistory(responce.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (props.session.personal._id !== "") {
      getData();
    }
  }, [props]);
  return (
    <div className="__History">
      <div className="content h-100 center-custom">
        <h1>History</h1>
        <div className="mt-4 mb-4">
          <img src="arrow.svg" loading="lazy" alt="" className="arrow" />
        </div>
        <div className="row center-custom">
          {history.length > 0
            ? history.map((a, b) => {
                return (
                  <>
                    <div
                      className="col-12 py-4 px-5 card mt-2 mb-2"
                      key={a._id}
                    >
                      <span className="text-center">
                        <span className="text-dark">Mood : </span>
                        <span className="text-dark">
                          {capitalizeFirstLetter(a.mood)}{" "}
                          {
                            CONSTANT.moods[
                              CONSTANT.moodsMetaData.filter((i, j) => {
                                return i.name === a.mood;
                              })[0].index
                            ]
                          }
                        </span>
                      </span>
                      <span className="text-center">
                        <span className="text-dark">DateTime : </span>
                        <span className="text-dark">
                          {new Date(a.addedAt).toLocaleString()}
                        </span>
                      </span>
                    </div>
                  </>
                );
              })
            : "No History!"}
        </div>
      </div>
    </div>
  );
}
