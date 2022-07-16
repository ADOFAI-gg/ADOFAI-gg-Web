import React, { useEffect, useState } from 'react';
import { get } from '../../utils/http';
import Skeleton from 'react-loading-skeleton';

// Components
import MainTopPlay from './MainTopPlay';
import SectionTitle from '../global/SectionTitle';

const MainTopPlays = () => {
  const [playData, setPlayData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await get(`/playLogs`, {
        offset: 0,
        amount: 3,
        sort: 'PP_DESC'
      }).then((response) => {
        setPlayData(response.data.results);
      });

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section>
      <SectionTitle
      // showMoreUrl={'/playLogs'}
      >
        Top Plays
      </SectionTitle>

      <div className='main-top-plays'>
        {isLoading
          ? Array.from({ length: 3 }, (i, index) => (
              <Skeleton
                width={'336px'}
                height={'189px'}
                key={index}
                className={'main-top-plays-container'}
              />
            ))
          : playData.map((topPlay, index) => (
              <MainTopPlay key={index} topPlay={topPlay} />
            ))}
      </div>
    </section>
  );
};

export default MainTopPlays;
