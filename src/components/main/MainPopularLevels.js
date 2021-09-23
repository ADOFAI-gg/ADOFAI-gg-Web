import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

// Components
import LevelInfo from "../level/LevelInfo";

const MainPopularLevels = () => {
  const [levelData, setLevelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/levels`, {
          params: {
            offset: 0,
            amount: 10,
            sort: "RECENT_DESC",
          },
        })
        .then((response) => {
          setLevelData(response.data.results);
        })
        .catch((error) => console.error(`Error: ${error}`));

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section>
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
        {isLoading ? (
          <Skeleton count={10} className="level-item-info" />
        ) : (
          levelData.map((i, index) => <LevelInfo levelData={i} key={index} />)
        )}
      </div>
    </section>
  );
};

export default MainPopularLevels;
