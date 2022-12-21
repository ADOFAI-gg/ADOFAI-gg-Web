import React, { useEffect, useReducer, useState } from 'react';
import SectionTitle from '../../components/global/SectionTitle';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const apiEndpoint = 'https://api.awc.enak.kr/measure/rank';

const RankingItemBox = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 14px;
  gap: 18px;
  width: calc(1100px - 28px);
  transition: background-color 0.2s ease-in-out;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const ItemRank = styled.div`
  font-family: var(--monospace-font);
  font-weight: 700;
  font-size: 22px;
  line-height: 120%;
  display: flex;
  justify-content: center;
  letter-spacing: -0.011em;
  width: 60px;
`;

const ItemPlayerName = styled.div`
  font-weight: 400;
  font-size: 22px;
  line-height: 120%;
  flex-grow: 1;
  letter-spacing: -0.011em;
  user-select: text;
`;

const ItemHitMargins = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ItemDivider = styled.div`
  width: 2px;
  height: 2px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 100%;
`;

const ItemHitMarginBox = styled.div`
  font-family: var(--monospace-font);
  line-height: 120%;
  letter-spacing: -0.09em;
  color: ${(props) => props.color};
  font-weight: 600;

  & > span {
    font-weight: 400;
    font-size: 12px;
    margin-right: 4px;
  }
`;

const ItemHitMargin = ({ color, label, content }) => {
  return (
    <ItemHitMarginBox color={color}>
      {label && <span>{label}</span>}
      {content}
    </ItemHitMarginBox>
  );
};

const ItemXAccuracyWrapper = styled.div`
  font-family: var(--monospace-font);
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: 0.6;
`;

/**
 * @param {Object} props
 * @param {Number} props.xAccuracy
 */
const ItemXAccuracy = ({ xAccuracy }) => {
  const formattedXAccuracy =
    xAccuracy >= 1 ? '100.0000' : (xAccuracy * 100).toFixed(5);

  return (
    <ItemXAccuracyWrapper>
      <img
        src={'https://adofai.gg/other_icons/xaccuracy.svg'}
        alt='X Accurancy: '
      />
      {formattedXAccuracy}%
    </ItemXAccuracyWrapper>
  );
};

/**
 * @param {Object} props
 * @param {Array} props.hitMargins
 */
const RankingItem = ({ rank, playerName, hitMargins, xAccuracy }) => {
  return (
    <RankingItemBox>
      <ItemRank>#{rank + 1}</ItemRank>

      <ItemPlayerName>{playerName}</ItemPlayerName>

      <ItemHitMargins>
        <ItemHitMargin color='#ED6769' content={hitMargins[0]} />
        <ItemHitMargin color='#FFE76E' content={hitMargins[1]} />
        <ItemHitMargin color='#C8FF6E' content={hitMargins[2]} />
        <ItemHitMargin color='#3BF892' content={hitMargins[3]} />
        <ItemHitMargin color='#C8FF6E' content={hitMargins[4]} />
        <ItemHitMargin color='#FFE76E' content={hitMargins[5]} />
        <ItemHitMargin color='#ED6769' content={hitMargins[6]} />

        <ItemDivider />

        <ItemHitMargin
          color='#20D8E3'
          label='Multipress'
          content={hitMargins[7]}
        />
        <ItemHitMargin color='#C983E2' label='Miss' content={hitMargins[8]} />
        <ItemHitMargin
          color='#C983E2'
          label='Overload'
          content={hitMargins[9]}
        />
      </ItemHitMargins>

      <ItemDivider />

      <ItemXAccuracy xAccuracy={xAccuracy} />
    </RankingItemBox>
  );
};

const AWCRankingPage = () => {
  const [showAsId, setShowAsId] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get('showAsId') === 'true') {
      setShowAsId(true);
    }
  }, [location.search]);

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

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reduce, {
    isLoading: false,
    error: null,
    isError: false,
    items: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_RESULT', items: null });
        dispatch({ type: 'FETCH_ERROR', error: null });
        dispatch({ type: 'FETCH_REQUEST' });

        const response = await axios.get(apiEndpoint, {
          params: {
            limit: 800
          }
        });

        dispatch({ type: 'FETCH_RESULT', items: response.data.data });
      } catch (e) {
        dispatch({ type: 'FETCH_ERROR', error: e });
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <SectionTitle>AWC 2023 Qualifiers Leaderboard</SectionTitle>

      {state.isError ? (
        <h2 style={{ margin: 0, marginTop: 12 }}>Oops! An error occurred.</h2>
      ) : state.isLoading ? null : !state.items ? null : (
        state.items.map((i, index) => {
          return (
            <RankingItem
              rank={index}
              playerName={
                showAsId ? i.playerId : i.discordUsername ?? i.playerName
              }
              hitMargins={i.hitMargins}
              xAccuracy={i.xacc}
              key={index}
            />
          );
        })
      )}
    </main>
  );
};

export default AWCRankingPage;
