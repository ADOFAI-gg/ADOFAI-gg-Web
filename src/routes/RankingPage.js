import React, { useEffect, useReducer } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

// Components
import RankingItem from '../components/RankingItem';

// Stylesheets
import '../stylesheets/ranking.css';

const RankingPage = () => {
  const reduce = (state, action) => {
    switch (action.type) {
      case 'RANKING_REQUEST':
        return {
          ...state,
          isLoading: true,
        };
        
      case 'RANKING_FETCH':
        return {
          ...state,
          isLoading: false,
          items: action.items,
        };
      
      case 'RANKING_ERROR':
        return {
          ...state,
          isLoading: false,
          error: action.error,
        };
      
      case 'HAS_MORE_RANKING':
        return {
          ...state,
          hasMore: action.hasMore,
        };
      
      case 'ITEM_COUNT':
        return {
          ...state,
          itemCount: action.itemCount,
        };
      
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reduce, {
    isLoading: false,
    isError: null,
    hasMore: true,
    itemCount: 0,
    items: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'RANKING_FETCH', items: null });
        dispatch({ type: 'RANKING_ERROR', error: null });
        dispatch({ type: 'RANKING_REQUEST' });

        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/ranking`, {
          params: {
            offset: 0,
            amount: 30,
          }
        });

        dispatch({ type: 'RANKING_FETCH', items: response.data.results });
        dispatch({ type: 'ITEM_COUNT', itemCount: response.data.count });
      } catch (e) {
        dispatch({ type: 'RANKING_ERROR', error: e });
      }

      ;
    };

    fetchData();
  }, []);

  const fetchMoreData = async () => {
    if (state.items.length >= state.itemCount) {
      dispatch({ type: 'HAS_MORE_RANKING', hasMore: false });
      return;
    }

    try {
      dispatch({ type: 'RANKING_ERROR', error: null });

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/ranking`, {
        params: {
          offset: state.items.length,
          amount: 30,
        }
      });

      dispatch({ type: 'RANKING_FETCH', items: state.items.concat(response.data.results) });
    } catch (e) {
      dispatch({ type: 'RANKING_ERROR', error: e });
    }
  };

  return (
    <div className="ranking-main">
      <div className="content-title" style={{ margin: '15px', fontSize: '2em' }}>
        Ranking
      </div>

      <div className="ranking-content">
        { state.isLoading ? null
        : !state.items ? null
        : state.isError ? (<h2>Oops! An error occurred.</h2>)
        : (
          <InfiniteScroll
            dataLength={state.items.length}
            next={fetchMoreData}
            hasMore={state.hasMore}
            loader={
              <h4 style={{ textAlign: 'center', fontWeight: '300', marginTop: '10px', marginBottom: '10px' }}>
                Wait a second please!
              </h4>
            }
          >
            {state.items.map((i, index) => {
              return <RankingItem rank={i} index={index} />
            })}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default RankingPage;