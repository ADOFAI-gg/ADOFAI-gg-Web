import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainTopPlay = ({ topPlay }) => {
  const [difficulty, getDifficulty] = useState([]);

  useEffect(() => {
    getAllDifficulty();

    // disable warning because getAllDifficulty method is intentionally not added
    // eslint-disable-next-line
  }, []);

  const getAllDifficulty = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/levels/${topPlay.level.id}`,
        {
          params: {},
        }
      )
      .then((response) => {
        getDifficulty(response.data.difficulty);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  return (
    <a key={topPlay.id} href={topPlay.url} target="_blank" rel="noreferrer">
      <div className="main-top-plays-container">
        <div className="main-top-plays-image-container">
          <img
            className="main-top-plays-image"
            src={
              "https://i3.ytimg.com/vi/" + topPlay.url.split("=")[1] + "/0.jpg"
            }
            alt=""
          />
        </div>
        <div className="main-top-plays-title">
          <Link to={`/levels/${topPlay.level.id}`}>{topPlay.level.name}</Link>
        </div>
        <div className="main-top-plays-pp">
          {topPlay.playPoint.toFixed(0) + " PP"}
        </div>
        <img
          className="main-top-plays-level"
          src={"difficulty_icons/" + difficulty + ".svg"}
          alt=""
        />
        {/* <div className="main-top-plays-subtitle">{topPlay.levelSubTitle}</div> */}
        <div className="main-top-plays-player">{topPlay.player.name}</div>
        <div className="main-top-plays-spac">
          <span>{"Speed: " + topPlay.speed + "%"}</span>
          <span style={{ marginLeft: "60px" }}>
            {"Acc: " + topPlay.rawAccuracy.toFixed(2) + "%"}
          </span>
        </div>
      </div>
    </a>
  );
};

export default MainTopPlay;
