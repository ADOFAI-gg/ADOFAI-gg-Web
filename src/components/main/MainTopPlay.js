import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainTopPlay = ({ topPlay }) => {
  const [difficulty, getDifficulty] = useState([]);

  const difficultyColorDict = {
    0: { borderColor: "#A4A4A4" },
    1: { borderColor: "#0099FF" },
    2: { borderColor: "#AEAFAD" },
    3: { borderColor: "#00DDFF" },
    4: { borderColor: "#00FFFF" },
    5: { borderColor: "#00FFAA" },
    6: { borderColor: "#00FF00" },
    7: { borderColor: "#66FF00" },
    8: { borderColor: "#99FF00" },
    9: { borderColor: "#CCFF00" },
    10: { borderColor: "#FFFF00" },
    11: { borderColor: "#FFDD00" },
    12: { borderColor: "#FFCC00" },
    13: { borderColor: "#FFAA00" },
    14: { borderColor: "#FF8800" },
    15: { borderColor: "#FF6600" },
    16: { borderColor: "#FF4400" },
    17: { borderColor: "#FF0000" },
    18: { borderColor: "#CC0000" },
    18.5: { borderColor: "#A61C00" },
    19: { borderColor: "#660000" },
    19.5: { borderColor: "#460C00" },
    20: { borderColor: "#000000" },
    20.5: {
      backgroundImage:
        "linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(255,0,0,1) 100%)",
      backgroundColor: "black",
      backgroundOrigin: "border-box",
    },
    21: { borderColor: "#4C1130" },
  };

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

  const videoId =
    /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/.exec(
      topPlay.url
    )[1];

  return (
    <a key={topPlay.id} href={topPlay.url} target="_blank" rel="noreferrer">
      <section className="main-top-plays-container">
        <div
          className="main-top-plays-image-container"
          style={difficultyColorDict[difficulty]}
        >
          <img
            className="main-top-plays-image"
            src={"https://i3.ytimg.com/vi/" + videoId + "/0.jpg"}
            alt=""
          />
        </div>

        <div className="main-top-plays-pp">
          {topPlay.playPoint.toFixed(0)} PP
        </div>

        <div className="main-top-plays-title">
          <Link to={`/levels/${topPlay.level.id}`}>{topPlay.level.name}</Link>
        </div>
        {/* <div className="main-top-plays-pp">
          {topPlay.playPoint.toFixed(0) + " PP"}
        </div> */}
        {/* <img
          className="main-top-plays-level"
          src={"difficulty_icons/" + difficulty + ".svg"}
          alt=""
        /> */}
        {/* <div className="main-top-plays-subtitle">{topPlay.levelSubTitle}</div> */}
        <div className="main-top-plays-player">{topPlay.player.name}</div>
        <div className="main-top-plays-spac">
          <div>
            <img src={"other_icons/speed.svg"} alt="Speed Trial: " />
            <span>{`${topPlay.speed / 100}x`}</span>
          </div>

          <div style={{ marginLeft: "40px" }}>
            <img src={"other_icons/accuracy.svg"} alt="Accurancy: " />
            <span>
              {topPlay.rawAccuracy
                ? `${topPlay.rawAccuracy.toFixed(2)}%`
                : "UNKNOWN"}
            </span>
          </div>

          <div style={{ marginLeft: "40px" }}>
            <span>Lv. {String(difficulty).replace(".5", "+")}</span>
          </div>
        </div>
      </section>
    </a>
  );
};

export default MainTopPlay;
