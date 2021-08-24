import MainTopPlay2 from './MainTopPlay2';
import axios from "axios";
import React, { useEffect, useState } from "react";

const MainTopPlays2 = () => {
  const [playData, getPlayData] = useState([]);

  useEffect(() => {
    getAllPlayData();
  }, []);

  const getAllPlayData = () => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/playLogs`, {
      params: {
        offset: 0,
        amount: 3,
				sort: 'PP_DESC'
      }
    })
    .then((response) => {
      getPlayData(response.data.results);
    })
    .catch(error => console.error(`Error: ${error}`));
  }  
  return (
    <div>
      <div className="content-title">
        <h1 style={{ flexBasis: '80%', textAlign: 'left' }}>Top Plays</h1>
        {/* <h3 style={{ flexBasis: '20%', textAlign: 'right', paddingTop: '20px' }}><a href="#top-plays">See All ▹</a></h3> */}
      </div>
      <div className="main-top-plays">
        {playData.map((topPlay) => (
          <MainTopPlay2 topPlay={topPlay} />
        ))}
      </div>
    </div>
  );
}

export default MainTopPlays2;