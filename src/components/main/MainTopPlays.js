import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

// Components
import MainTopPlay from "./MainTopPlay";

const MainTopPlays = () => {
  const [playData, setPlayData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/playLogs`, {
          params: {
            offset: 0,
            amount: 3,
            sort: "PP_DESC",
          },
        })
        .then((response) => {
          setPlayData(response.data.results);
        })
        .catch((error) => console.error(`Error: ${error}`));

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="content-title">
        <h1 style={{ flexBasis: "80%", textAlign: "left" }}>Top Plays</h1>
        {/* <h3 style={{ flexBasis: '20%', textAlign: 'right', paddingTop: '20px' }}><a href="#top-plays">See All ▹</a></h3> */}
      </div>
      <div className="main-top-plays">
        {isLoading
          ? Array.from({ length: 3 }, () => (
              <Skeleton
                width={"336px"}
                height={"189px"}
                className={"main-top-plays-container"}
              />
            ))
          : playData.map((topPlay) => <MainTopPlay topPlay={topPlay} />)}
      </div>
    </section>
  );
};

export default MainTopPlays;
