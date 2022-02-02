import React, { useEffect, useReducer } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { get } from '../utils/http';

// Components
import RankingItem from '../components/ranking/RankingItem';
import ScrollButton from '../components/global/ScrollButton';

// Stylesheets
import '../stylesheets/ranking.css';

const RankingPage = () => {
  const reduce = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return {
          ...state,
          isLoading: true
        };

      case 'FETCH_RESULT':
        return {
          ...state,
          isLoading: false,
          items: action.items
        };

      case 'FETCH_ERROR':
        return {
          ...state,
          isLoading: false,
          error: action.error,
          isError: action.error ? true : false
        };

      case 'HAS_MORE_ITEMS':
        return {
          ...state,
          hasMore: action.hasMore
        };

      case 'ITEM_COUNT':
        return {
          ...state,
          itemCount: action.itemCount
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reduce, {
    isLoading: false,
    error: null,
    isError: false,
    hasMore: true,
    itemCount: 0,
    items: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_RESULT', items: null });
        dispatch({ type: 'FETCH_ERROR', error: null });
        dispatch({ type: 'FETCH_REQUEST' });

        const response = await get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/ranking`,
          {
            offset: 0,
            amount: 30
          }
        );

        dispatch({ type: 'FETCH_RESULT', items: response.data.results });
        dispatch({ type: 'ITEM_COUNT', itemCount: response.data.count });
      } catch (e) {
        dispatch({ type: 'FETCH_ERROR', error: e });
      }
    };

    fetchData();
  }, []);

  const fetchMoreData = async () => {
    if (state.items.length >= state.itemCount) {
      dispatch({ type: 'HAS_MORE_RANKING', hasMore: false });
      return;
    }

    try {
      dispatch({ type: 'FETCH_ERROR', error: null });

      const response = await get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/ranking`,
        {
          offset: state.items.length,
          amount: 30
        }
      );

      dispatch({
        type: 'FETCH_RESULT',
        items: state.items.concat(response.data.results)
      });
    } catch (e) {
      console.log('삐삐');
      dispatch({ type: 'FETCH_ERROR', error: e });
    }
  };

  return (
    <main>
      <ScrollButton />
      <div
        className='content-title'
        style={{ margin: '15px', fontSize: '2em' }}
      >
        Ranking
      </div>

      <div className='ranking-content'>
        {state.isError ? (
          <h2 style={{ margin: '6px' }}>Oops! An error occurred.</h2>
        ) : state.isLoading ? null : !state.items ? null : (
          <InfiniteScroll
            dataLength={state.items.length}
            next={fetchMoreData}
            hasMore={state.hasMore}
          >
            {state.items.map((i, index) => {
              return <RankingItem key={index} rank={i} index={index} />;
            })}
          </InfiniteScroll>
        )}
      </div>
    </main>
  );
};

export default RankingPage;
