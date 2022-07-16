import React, { useEffect, useState } from 'react';
import { get } from '../../utils/http';
import Skeleton from 'react-loading-skeleton';

// Components
import LevelInfo from '../level/LevelInfo';
import SectionTitle from '../global/SectionTitle';

const MainPopularLevels = () => {
  const [levelData, setLevelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await get(`/levels`, {
        offset: 0,
        amount: 10,
        sort: 'RECENT_DESC'
      }).then((response) => {
        setLevelData(response.data.results);
      });

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section>
      <SectionTitle showMoreUrl={'/levels'}>Recent Ranked Levels</SectionTitle>

      <div className='main-popular-levels'>
        {isLoading ? (
          <Skeleton count={10} className='level-item-info' />
        ) : (
          levelData.map((i, index) => <LevelInfo levelData={i} key={index} />)
        )}
      </div>
    </section>
  );
};

export default MainPopularLevels;
