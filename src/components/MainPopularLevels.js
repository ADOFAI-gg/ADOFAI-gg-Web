import LevelInfo from "./LevelInfo";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainPopularLevels = () => {
  const [levelData, getLevelData] = useState([]);

  useEffect(() => {
    getAllLevelData();
  }, []);

  const getAllLevelData = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/levels`, {
        params: {
          offset: 0,
          amount: 10,
          sort: "RECENT_DESC",
        },
      })
      .then((response) => {
        getLevelData(response.data.results);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  return (
    <div>
      <div className="content-title">
        <h1 style={{ flexBasis: "80%", textAlign: "left" }}>
          Recent Ranked Levels
        </h1>
        <h3
          style={{ flexBasis: "20%", textAlign: "right", paddingTop: "20px" }}
        >
          <Link to="levels">See All ▹</Link>
        </h3>
      </div>
      <div className="main-popular-levels">
        {levelData.map((i, index) => (
          <LevelInfo levelData={i} key={index} />
        ))}
      </div>
    </div>
  );
};

export default MainPopularLevels;
