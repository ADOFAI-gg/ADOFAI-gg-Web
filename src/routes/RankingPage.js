import { React, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

// Components
import RankingItem from '../components/RankingItem';

// Stylesheets
import '../stylesheets/ranking.css';

const RankingPage = () => {
  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setItems(null);
        setIsError(null);
        setIsLoading(true);

        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/ranking`, {
          params: {
            offset: 0,
            amount: 30,
          }
        });

        setItems(response.data.results);
        setItemCount(response.data.count);
      } catch (e) {
        setIsError(e);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const fetchMoreData = async () => {
    console.log(items);
    if (items.length >= itemCount) {
      setHasMore(false);
      return;
    }

    try {
      setIsError(null);

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/ranking`, {
        params: {
          offset: items.length,
          amount: 30,
        }
      });

      setItems(items.concat(response.data.results));
    } catch (e) {
      setIsError(e);
    }
  };

  return (
    <div className="ranking-main">
      <div className="content-title" style={{ margin: '15px', fontSize: '2em' }}>
        Ranking
      </div>

      <div className="ranking-content">
        { isLoading ? null
        : !items ? null
        : isError ? (<h2>Oops! An error occurred.</h2>)
        : (
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <h4 style={{ textAlign: 'center', fontWeight: '300', marginTop: '10px', marginBottom: '10px' }}>
                Wait a second please!
              </h4>
            }
          >
            {items.map((i, index) => {
              return <RankingItem rank={i} index={index} />
            })}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default RankingPage;