import React, { useEffect, useState } from 'react';
import SectionTitle from '../../components/global/SectionTitle';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  width: 1100px;

  * {
    box-sizing: border-box;
  }
`;

const TabRow = styled.div`
  display: flex;
  width: 100%;
  height: 42px;
  gap: 12px;
`;

const Tab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border: 0;
  border-radius: 8px;
  background: rgba(0, 2, 15, 0.4);
  overflow: hidden;
  position: relative;
  font-size: 18px;
  letter-spacing: -0.19px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  transition-property: background-color, font-weight;

  &:hover,
  &:focus-visible {
    background: rgba(0, 2, 15, 0.6);
  }

  &:active {
    background: rgba(0, 2, 15, 0.8);
  }

  ::after {
    content: '';
    width: 100%;
    height: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #4d93fc;
    transition: height 0.2s ease-in-out;
  }

  ${({ $active }) =>
    $active &&
    css`
      font-weight: 700;

      ::after {
        height: 2px;
      }
    `}
`;

const Note = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  border: 2px solid #f54f51;
  margin-top: 24px;
  line-height: 140%;
`;

const NoteHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  color: #f54f51;
  line-height: 100%;
`;

const RedWarningIcon = (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
    <circle cx='8' cy='8' r='7' stroke='#F54F51' strokeWidth='2' />
    <path
      d='M8 4.5V8.5'
      stroke='#F54F51'
      strokeWidth='2'
      strokeLinecap='round'
    />
    <path
      d='M9 11.5C9 12.0523 8.55228 12.5 8 12.5C7.44772 12.5 7 12.0523 7 11.5C7 10.9477 7.44772 10.5 8 10.5C8.55228 10.5 9 10.9477 9 11.5Z'
      fill='#F54F51'
    />
  </svg>
);

const RankSectionTitleBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-top: 18px;

  & > h3 {
    font-size: 20px;
    line-height: 120%;
    font-weight: 700;
  }

  & > hr {
    flex-grow: 1;
    height: 1px;
    opacity: 0.4;
    background: #fff;
    border: none;
  }

  & > div {
    font-weight: 500;
    line-height: 100%;
    opacity: 0.4;
  }
`;

const RankSectionTitle = ({ additional, children }) => (
  <RankSectionTitleBox>
    <h3>{children}</h3>
    <hr />
    <div>{additional}</div>
  </RankSectionTitleBox>
);

const Row2 = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;

  & > div {
    width: 0;
    flex-grow: 1;
  }
`;

const cutoffLineStyle = ({ $showCutoffLineBottom, $cutoffLineText }) =>
  $showCutoffLineBottom &&
  css`
    ::before {
      content: '';
      width: 100%;
      height: 2px;
      background: #ffe76e;
      position: absolute;
      bottom: 0;
      left: 0;
    }

    ::after {
      content: '${$cutoffLineText}';
      background: #ffe76e;
      color: #382f00;
      font-weight: 700;
      position: absolute;
      padding: 4px 8px;
      line-height: 100%;
      border-radius: 4px;
      bottom: 0;
      left: 0;
      transform: translateY(50%);
    }
  `;

const RankingItemBox = styled.div`
  display: flex;
  padding: 18px 14px;
  justify-content: center;
  gap: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  flex-direction: column;
  position: relative;

  ${({ $showCutoffLineBottom, $cutoffLineText }) =>
    cutoffLineStyle({ $showCutoffLineBottom, $cutoffLineText })}
`;

const RankingItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  align-self: stretch;
  width: 100%;
`;

const ItemRank = styled.div`
  width: 60px;
  font-size: 20px;
  font-family: var(--monospace-font);
  font-weight: 700;
  letter-spacing: -0.22px;
  line-height: 120%;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
`;

const ItemPlayerName = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 20px;
  line-height: 24px;
  flex-grow: 1;
`;

const RankingItemFrame = ({
  playerName,
  rank,
  children,
  showCutoffLineBottom,
  cutoffLineText
}) => {
  return (
    <RankingItemBox
      $showCutoffLineBottom={showCutoffLineBottom}
      $cutoffLineText={cutoffLineText}
    >
      <RankingItemRow>
        <ItemRank>#{rank}</ItemRank>
        <ItemPlayerName>{playerName}</ItemPlayerName>
      </RankingItemRow>

      <div style={{ display: 'flex', gap: 12 }}>{children}</div>
    </RankingItemBox>
  );
};

const RecordLabel = styled.div`
  width: 60px;
  font-family: var(--monospace-font);
  font-weight: 400;
  letter-spacing: -0.96px;
  display: flex;
  justify-content: center;
  opacity: 0.4;
  flex-shrink: 0;
  line-height: 100%;
`;

const ItemXAccuracyWrapper = styled.div`
  font-family: var(--monospace-font);
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: 0.6;
  letter-spacing: -1.5px;
  line-height: 100%;
`;

const RecordDivider = styled.div`
  width: 2px;
  height: 2px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 100%;
`;

const ItemHitMarginList = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ItemHitMarginBox = styled.div`
  font-family: var(--monospace-font);
  letter-spacing: -1.5px;
  color: ${({ color }) => color};
  line-height: 16px;

  & > span {
    font-weight: 700;
    margin-right: 2px;
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

/**
 * @param {Object} props
 * @param {String} props.label
 * @param {Array} props.hitMargins
 * @param {Number} props.xAccuracy
 */
const ItemLevelRecord = ({ label, xAcc, hitMargins }) => {
  const formattedXAcc = xAcc >= 1 ? '100.000' : (xAcc * 100).toFixed(3);

  return (
    <RankingItemRow>
      <RecordLabel>{label}</RecordLabel>

      <ItemXAccuracyWrapper>
        <img
          src={'https://adofai.gg/other_icons/xaccuracy.svg'}
          alt='X Accurancy: '
        />
        {formattedXAcc}%
      </ItemXAccuracyWrapper>

      <RecordDivider />

      <ItemHitMarginList>
        <ItemHitMargin color='#ED6769' content={hitMargins[0]} />
        <ItemHitMargin color='#FFE76E' content={hitMargins[1]} />
        <ItemHitMargin color='#C8FF6E' content={hitMargins[2]} />
        <ItemHitMargin color='#3BF892' content={hitMargins[3]} />
        <ItemHitMargin color='#C8FF6E' content={hitMargins[4]} />
        <ItemHitMargin color='#FFE76E' content={hitMargins[5]} />
        <ItemHitMargin color='#ED6769' content={hitMargins[6]} />

        <RecordDivider />

        <ItemHitMargin color='#C983E2' label='M' content={hitMargins[8]} />
        <ItemHitMargin color='#C983E2' label='O' content={hitMargins[9]} />
      </ItemHitMarginList>
    </RankingItemRow>
  );
};

const groupAData = JSON.parse(
  '[{"player":{"playerName":"알명서1512"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"shinora"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"Mint"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"폐브"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"Sharky"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"마이스타"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"유한"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"리온"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"규페복제판"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"LuKe"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"발아통밀"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"스티"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"jate"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"김만식"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"수직항력"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"LIO"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"에바"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"wsbimango"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"도드기"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"김몬호따엑기스"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"스심"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"띵근"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"RetroBean"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"Dehznik"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"noobjamini"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2219,1,0,0,0,0,0,0,0],"xacc":0.9998874}},{"player":{"playerName":"Sammon"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,2219,1,0,0,0,0,0,0,0],"xacc":0.9998874}},{"player":{"playerName":"Leviathan"},"commonLevel":{"hitMargins":[0,0,1,1690,0,0,0,0,0,0,0,0],"xacc":0.9998522},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"5henry"},"commonLevel":{"hitMargins":[0,0,2,1688,1,0,0,0,0,0,0,0],"xacc":0.9995565},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"무돌"},"commonLevel":{"hitMargins":[0,0,3,1688,0,0,0,0,0,0,0,0],"xacc":0.9995565},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"xDxRax"},"commonLevel":{"hitMargins":[0,0,1,1688,2,0,0,0,0,0,0,0],"xacc":0.9995565},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"rizecoin"},"commonLevel":{"hitMargins":[0,0,0,1690,1,0,0,0,0,0,0,0],"xacc":0.9998522},"groupLevel":{"hitMargins":[0,0,1,2217,2,0,0,0,0,0,0,0],"xacc":0.9996622}},{"player":{"playerName":"센치"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,1,1,2218,1,0,0,0,0,0,0,0],"xacc":0.9995047}},{"player":{"playerName":"ㄱㄴ"},"commonLevel":{"hitMargins":[0,0,3,1687,1,0,0,0,0,0,0,0],"xacc":0.9994087},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"Delectronic"},"commonLevel":{"hitMargins":[0,0,1,1687,3,0,0,0,0,0,0,0],"xacc":0.9994087},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"현권"},"commonLevel":{"hitMargins":[0,0,2,1689,0,0,0,0,0,0,0,0],"xacc":0.9997043},"groupLevel":{"hitMargins":[0,0,0,2218,1,1,0,0,0,0,0,0],"xacc":0.9996171}},{"player":{"playerName":"smartowl"},"commonLevel":{"hitMargins":[0,0,1,1687,3,0,0,0,0,0,0,0],"xacc":0.9994087},"groupLevel":{"hitMargins":[0,0,0,2219,1,0,0,0,0,0,0,0],"xacc":0.9998874}},{"player":{"playerName":"토리"},"commonLevel":{"hitMargins":[0,0,3,1686,2,0,0,0,0,0,0,0],"xacc":0.9992608},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"WillTRM"},"commonLevel":{"hitMargins":[0,0,1,1689,1,0,0,0,0,0,0,0],"xacc":0.9997043},"groupLevel":{"hitMargins":[0,0,1,2217,1,1,0,0,0,0,0,0],"xacc":0.9995045}},{"player":{"playerName":"Jongyeol"},"commonLevel":{"hitMargins":[0,0,2,1687,2,0,0,0,0,0,0,0],"xacc":0.9994087},"groupLevel":{"hitMargins":[0,0,1,2218,1,0,0,0,0,0,0,0],"xacc":0.9997748}},{"player":{"playerName":"snoob"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[2,0,0,2219,1,0,0,0,0,0,0,0],"xacc":0.9991674}},{"player":{"playerName":"PivoGuru🌙"},"commonLevel":{"hitMargins":[0,0,1,1688,2,0,0,0,0,0,0,0],"xacc":0.9995565},"groupLevel":{"hitMargins":[0,0,1,2216,3,0,0,0,0,0,0,0],"xacc":0.99954957}},{"player":{"playerName":"티모버프좀"},"commonLevel":{"hitMargins":[0,0,3,1687,1,0,0,0,0,0,0,0],"xacc":0.9994087},"groupLevel":{"hitMargins":[0,0,1,2217,2,0,0,0,0,0,0,0],"xacc":0.9996622}},{"player":{"playerName":"4my3b"},"commonLevel":{"hitMargins":[0,0,0,1686,5,0,0,0,0,0,0,0],"xacc":0.9992608},"groupLevel":{"hitMargins":[0,0,1,2218,1,0,0,0,0,0,0,0],"xacc":0.9997748}},{"player":{"playerName":"Halleen"},"commonLevel":{"hitMargins":[0,0,2,1684,5,0,0,0,0,0,0,0],"xacc":0.9989651},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"lavalucky"},"commonLevel":{"hitMargins":[0,0,5,1683,3,0,0,0,0,0,0,0],"xacc":0.9988173},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"Retr0"},"commonLevel":{"hitMargins":[0,0,3,1687,1,0,0,0,0,0,0,0],"xacc":0.99940866},"groupLevel":{"hitMargins":[0,1,0,2216,3,0,0,0,0,0,0,0],"xacc":0.9993919}},{"player":{"playerName":"민들레차 DDIT"},"commonLevel":{"hitMargins":[0,1,0,1688,1,1,0,0,0,0,0,0],"xacc":0.9991425},"groupLevel":{"hitMargins":[0,0,0,2216,4,0,0,0,0,0,0,0],"xacc":0.9995496}},{"player":{"playerName":"붉꽃"},"commonLevel":{"hitMargins":[0,0,3,1685,3,0,0,0,0,0,0,0],"xacc":0.999113},"groupLevel":{"hitMargins":[0,0,2,2216,2,0,0,0,0,0,0,0],"xacc":0.9995496}},{"player":{"playerName":"소울블루"},"commonLevel":{"hitMargins":[0,0,4,1683,4,0,0,0,0,0,0,0],"xacc":0.9988173},"groupLevel":{"hitMargins":[0,0,1,2218,1,0,0,0,0,0,0,0],"xacc":0.9997748}},{"player":{"playerName":"준탱이는방탱"},"commonLevel":{"hitMargins":[0,0,3,1687,1,0,0,0,0,0,0,0],"xacc":0.9994087},"groupLevel":{"hitMargins":[0,1,3,2214,2,0,0,0,0,0,0,0],"xacc":0.9991667}},{"player":{"playerName":"! 화재"},"commonLevel":{"hitMargins":[0,0,2,1685,4,0,0,0,0,0,0,0],"xacc":0.999113},"groupLevel":{"hitMargins":[1,0,2,2217,1,0,0,0,0,0,0,0],"xacc":0.9993021}},{"player":{"playerName":"Remittal"},"commonLevel":{"hitMargins":[1,0,0,1688,3,0,0,0,0,0,0,0],"xacc":0.9990839},"groupLevel":{"hitMargins":[0,0,3,2215,1,1,0,0,0,0,0,0],"xacc":0.9992793}},{"player":{"playerName":"김주형"},"commonLevel":{"hitMargins":[0,0,0,1688,2,0,0,0,1,0,0,0],"xacc":0.999113},"groupLevel":{"hitMargins":[0,0,6,2213,1,0,0,0,0,0,0,0],"xacc":0.9992117}},{"player":{"playerName":"khjjjj"},"commonLevel":{"hitMargins":[0,1,4,1683,2,1,0,0,0,0,0,0],"xacc":0.9984033},"groupLevel":{"hitMargins":[0,0,1,2219,0,0,0,0,0,0,0,0],"xacc":0.9998874}},{"player":{"playerName":"346_Pomegranate"},"commonLevel":{"hitMargins":[0,0,7,1679,5,0,0,0,0,0,0,0],"xacc":0.9982259},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"시로나"},"commonLevel":{"hitMargins":[0,0,0,1682,9,0,0,0,0,0,0,0],"xacc":0.9986694},"groupLevel":{"hitMargins":[0,0,2,2214,4,0,0,0,0,0,0,0],"xacc":0.9993243}},{"player":{"playerName":"리하"},"commonLevel":{"hitMargins":[0,0,0,1689,0,2,0,0,0,0,0,0],"xacc":0.9992903},"groupLevel":{"hitMargins":[1,0,3,2213,3,1,0,0,0,0,0,0],"xacc":0.9986943}},{"player":{"playerName":"Getoutoftheway"},"commonLevel":{"hitMargins":[0,1,2,1684,4,0,0,0,0,0,0,0],"xacc":0.9987581},"groupLevel":{"hitMargins":[2,0,0,2219,1,0,0,0,0,0,0,0],"xacc":0.9991674}},{"player":{"playerName":"최민준"},"commonLevel":{"hitMargins":[0,0,0,1690,1,0,0,0,0,0,0,0],"xacc":0.9998522},"groupLevel":{"hitMargins":[0,1,6,2207,4,2,0,0,0,0,0,0],"xacc":0.9980631}},{"player":{"playerName":"파크"},"commonLevel":{"hitMargins":[0,0,8,1681,2,0,0,0,0,0,0,0],"xacc":0.9985216},"groupLevel":{"hitMargins":[0,0,4,2213,2,1,0,0,0,0,0,0],"xacc":0.9990541}},{"player":{"playerName":"지성"},"commonLevel":{"hitMargins":[0,0,7,1680,3,1,0,0,0,0,0,0],"xacc":0.9981667},"groupLevel":{"hitMargins":[1,0,1,2217,2,0,0,0,0,0,0,0],"xacc":0.9993021}},{"player":{"playerName":"xiaoxiaoci"},"commonLevel":{"hitMargins":[0,0,2,1686,2,1,0,0,0,0,0,0],"xacc":0.9990538},"groupLevel":{"hitMargins":[2,1,4,2213,2,0,0,0,0,0,0,0],"xacc":0.9983348}},{"player":{"playerName":"LSJ0821"},"commonLevel":{"hitMargins":[0,1,4,1681,5,0,0,0,0,0,0,0],"xacc":0.9983146},"groupLevel":{"hitMargins":[0,0,7,2210,3,0,0,0,0,0,0,0],"xacc":0.9988739}},{"player":{"playerName":"bogwardd"},"commonLevel":{"hitMargins":[0,0,1,1681,9,0,0,0,0,0,0,0],"xacc":0.9985216},"groupLevel":{"hitMargins":[0,0,4,2207,9,0,0,0,0,0,0,0],"xacc":0.9985361}},{"player":{"playerName":"설룬"},"commonLevel":{"hitMargins":[0,1,10,1670,10,0,0,0,0,0,0,0],"xacc":0.9966884},"groupLevel":{"hitMargins":[0,0,0,2220,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"2yper"},"commonLevel":{"hitMargins":[1,0,6,1679,5,1,0,0,0,0,0,0],"xacc":0.9975473},"groupLevel":{"hitMargins":[0,0,3,2212,5,0,0,0,0,0,0,0],"xacc":0.9990991}},{"player":{"playerName":"Mepster4"},"commonLevel":{"hitMargins":[0,1,6,1674,9,1,0,0,0,0,0,0],"xacc":0.9970728},"groupLevel":{"hitMargins":[0,0,1,2214,5,0,0,0,0,0,0,0],"xacc":0.9993243}},{"player":{"playerName":"F1am3_guo"},"commonLevel":{"hitMargins":[0,0,6,1675,9,1,0,0,0,0,0,0],"xacc":0.9974276},"groupLevel":{"hitMargins":[0,0,1,2211,7,1,0,0,0,0,0,0],"xacc":0.9988288}},{"player":{"playerName":"강 야"},"commonLevel":{"hitMargins":[1,0,5,1674,11,1,0,0,0,0,0,0],"xacc":0.9968085},"groupLevel":{"hitMargins":[0,0,5,2213,2,0,0,0,0,0,0,0],"xacc":0.9992117}},{"player":{"playerName":"헤릭"},"commonLevel":{"hitMargins":[1,1,4,1681,5,0,0,0,0,0,0,0],"xacc":0.9978428},"groupLevel":{"hitMargins":[1,2,5,2208,5,0,0,0,0,0,0,0],"xacc":0.9979739}},{"player":{"playerName":"cherrymxblue"},"commonLevel":{"hitMargins":[0,2,11,1674,2,2,0,0,0,0,0,0],"xacc":0.9966588},"groupLevel":{"hitMargins":[2,0,2,2217,1,0,0,0,0,0,0,0],"xacc":0.9989424}},{"player":{"playerName":"w62826"},"commonLevel":{"hitMargins":[0,1,8,1675,6,1,0,0,0,0,0,0],"xacc":0.9972206},"groupLevel":{"hitMargins":[1,0,11,2206,3,0,0,0,0,0,0,0],"xacc":0.9980639}},{"player":{"playerName":"IAMZF"},"commonLevel":{"hitMargins":[1,2,9,1674,4,2,0,0,0,0,0,0],"xacc":0.9961879},"groupLevel":{"hitMargins":[0,0,5,2207,8,0,0,0,0,0,0,0],"xacc":0.9985361}},{"player":{"playerName":"MedBaksa"},"commonLevel":{"hitMargins":[0,3,9,1667,11,1,0,0,0,0,0,0],"xacc":0.9956239},"groupLevel":{"hitMargins":[0,2,6,2208,3,1,0,0,0,0,0,0],"xacc":0.9981757}},{"player":{"playerName":"AN"},"commonLevel":{"hitMargins":[2,4,9,1674,3,0,0,0,1,0,0,0],"xacc":0.9952747},"groupLevel":{"hitMargins":[1,1,11,2207,1,0,0,0,0,0,0,0],"xacc":0.9980189}},{"player":{"playerName":"hangukkin"},"commonLevel":{"hitMargins":[1,4,13,1668,6,0,0,0,0,0,0,0],"xacc":0.9953014},"groupLevel":{"hitMargins":[0,3,5,2203,7,2,0,0,0,0,0,0],"xacc":0.9972973}},{"player":{"playerName":"𝑴𝒖𝒕𝒆𝑨𝒊𝒓"},"commonLevel":{"hitMargins":[0,2,16,1659,12,2,0,0,0,0,0,0],"xacc":0.9944412},"groupLevel":{"hitMargins":[0,0,3,2203,14,0,0,0,0,0,0,0],"xacc":0.9980856}},{"player":{"playerName":"참치"},"commonLevel":{"hitMargins":[0,2,14,1669,5,1,0,0,0,0,0,0],"xacc":0.9961265},"groupLevel":{"hitMargins":[0,2,9,2199,7,2,1,0,1,0,0,0],"xacc":0.996308}},{"player":{"playerName":"RIT"},"commonLevel":{"hitMargins":[1,1,11,1658,16,4,0,0,1,0,0,0],"xacc":0.9931738},"groupLevel":{"hitMargins":[0,0,7,2207,6,0,0,0,0,0,0,0],"xacc":0.9985361}},{"player":{"playerName":"존맛탱"},"commonLevel":{"hitMargins":[0,1,10,1675,3,2,0,0,0,0,0,0],"xacc":0.9970136},"groupLevel":{"hitMargins":[2,8,16,2193,1,1,0,0,1,0,0,0],"xacc":0.9944869}},{"player":{"playerName":"dwjak"},"commonLevel":{"hitMargins":[0,4,10,1661,10,6,0,0,0,0,0,0],"xacc":0.993495},"groupLevel":{"hitMargins":[1,1,12,2200,7,0,0,0,0,0,0,0],"xacc":0.997231}},{"player":{"playerName":"광명"},"commonLevel":{"hitMargins":[1,4,21,1650,15,1,0,0,0,0,0,0],"xacc":0.992435},"groupLevel":{"hitMargins":[1,1,12,2200,6,1,0,0,0,0,0,0],"xacc":0.9970734}},{"player":{"playerName":"NoneOverLTH"},"commonLevel":{"hitMargins":[2,6,17,1654,9,3,0,0,2,0,0,0],"xacc":0.9908447},"groupLevel":{"hitMargins":[0,0,14,2195,11,0,0,0,0,0,0,0],"xacc":0.9971847}},{"player":{"playerName":"겸 미"},"commonLevel":{"hitMargins":[2,1,12,1673,4,1,0,0,0,0,0,0],"xacc":0.9959835},"groupLevel":{"hitMargins":[3,12,22,2180,3,2,0,0,1,0,0,0],"xacc":0.9918804}},{"player":{"playerName":"sangtaxi"},"commonLevel":{"hitMargins":[4,7,19,1659,2,2,0,0,2,0,0,0],"xacc":0.990649},"groupLevel":{"hitMargins":[3,3,11,2195,9,0,0,0,2,0,0,0],"xacc":0.9949617}},{"player":{"playerName":"막강민"},"commonLevel":{"hitMargins":[11,14,51,1599,12,10,0,0,5,0,0,0],"xacc":0.9741774},"groupLevel":{"hitMargins":[3,6,17,2186,7,3,0,0,1,0,0,0],"xacc":0.9933423}},{"player":{"playerName":"Ereny"},"commonLevel":{"hitMargins":[4,3,31,1624,24,6,0,0,3,0,0,0],"xacc":0.9850442},"groupLevel":{"hitMargins":[11,14,27,2115,44,15,0,0,5,0,0,0],"xacc":0.9780592}},{"player":{"playerName":"우도니"},"commonLevel":{"hitMargins":[24,18,38,1586,20,12,1,0,17,0,0,0],"xacc":0.9594988},"groupLevel":{"hitMargins":[2,4,13,2197,5,1,0,0,0,0,0,0],"xacc":0.9959046}},{"player":{"playerName":"이온"},"commonLevel":{"hitMargins":[9,18,24,1614,23,6,1,0,6,0,0,0],"xacc":0.9763963},"groupLevel":{"hitMargins":[13,13,21,2120,44,17,0,0,5,0,0,0],"xacc":0.9777653}},{"player":{"playerName":"SudsyCypress981"},"commonLevel":{"hitMargins":[11,5,12,1634,11,5,0,0,57,10,0,0],"xacc":0.9498281},"groupLevel":{"hitMargins":[5,2,6,2194,8,5,0,0,26,4,0,0],"xacc":0.9814667}},{"player":{"playerName":"frogqueen1587"},"commonLevel":{"hitMargins":[3,4,9,1671,5,2,0,0,0,0,0,0],"xacc":0.994392},"groupLevel":{"hitMargins":[47,23,35,2055,27,31,0,0,49,13,0,0],"xacc":0.935307}},{"player":{"playerName":"urprd👻👻"},"commonLevel":{"hitMargins":[49,24,43,1530,34,24,0,0,36,3,0,0],"xacc":0.9275674},"groupLevel":{"hitMargins":[6,8,22,2181,8,1,0,0,0,0,0,0],"xacc":0.9920485}},{"player":{"playerName":"MBS Goulzz#9977"},"commonLevel":{"hitMargins":[9,15,56,1579,25,10,0,0,6,0,0,0],"xacc":0.9715},"groupLevel":{"hitMargins":[35,43,62,2039,20,18,2,0,38,9,0,0],"xacc":0.9409974}},{"player":{"playerName":"perry_lin"},"commonLevel":{"hitMargins":[31,20,31,1568,23,18,1,0,31,8,0,0],"xacc":0.94171},"groupLevel":{"hitMargins":[38,53,58,1946,56,64,1,0,43,10,0,0],"xacc":0.9193918}},{"player":{"playerName":"jyslife78"},"commonLevel":{"hitMargins":[23,18,36,1546,49,21,0,0,21,0,0,0],"xacc":0.9509627},"groupLevel":{"hitMargins":[80,88,74,1821,80,64,1,0,93,14,0,0],"xacc":0.8697624}},{"player":{"playerName":"이므르"},"commonLevel":{"hitMargins":[210,80,109,1155,72,60,1,0,215,21,0,0],"xacc":0.7222829},"groupLevel":{"hitMargins":[40,58,81,1952,32,28,3,0,69,4,0,0],"xacc":0.9174019}}]'
);
const groupBData = JSON.parse(
  '[{"player":{"playerName":"Kekman301"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,1697,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"R_I"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,1697,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"RainB"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,1697,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"태 혁"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,1697,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"피구공"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,1697,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"ㅇㅈㅎ"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,1697,0,0,0,0,0,0,0,0],"xacc":1}},{"player":{"playerName":"asjdh [아스제]"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,1,1696,0,0,0,0,0,0,0,0],"xacc":0.9998527}},{"player":{"playerName":"어깨가아파요"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,1,1695,1,0,0,0,0,0,0,0],"xacc":0.9997054}},{"player":{"playerName":"Jipper"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,0,1695,2,0,0,0,0,0,0,0],"xacc":0.9997054}},{"player":{"playerName":"rtzjskl"},"commonLevel":{"hitMargins":[0,0,1,1690,0,0,0,0,0,0,0,0],"xacc":0.9998522},"groupLevel":{"hitMargins":[0,0,0,1696,1,0,0,0,0,0,0,0],"xacc":0.9998527}},{"player":{"playerName":"RosecatRC"},"commonLevel":{"hitMargins":[0,0,0,1690,1,0,0,0,0,0,0,0],"xacc":0.9998522},"groupLevel":{"hitMargins":[0,0,3,1693,1,0,0,0,0,0,0,0],"xacc":0.9994107}},{"player":{"playerName":"RinkiRin"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,2,1691,4,0,0,0,0,0,0,0],"xacc":0.9991161}},{"player":{"playerName":"Jofo"},"commonLevel":{"hitMargins":[0,0,0,1690,1,0,0,0,0,0,0,0],"xacc":0.9998522},"groupLevel":{"hitMargins":[0,0,3,1692,2,0,0,0,0,0,0,0],"xacc":0.9992634}},{"player":{"playerName":"yoonsu"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,3,1691,2,1,0,0,0,0,0,0],"xacc":0.99890983}},{"player":{"playerName":"DutJi"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,1,2,1691,3,0,0,0,0,0,0,0],"xacc":0.9989098}},{"player":{"playerName":"히히"},"commonLevel":{"hitMargins":[0,0,1,1690,0,0,0,0,0,0,0,0],"xacc":0.9998522},"groupLevel":{"hitMargins":[0,0,2,1690,5,0,0,0,0,0,0,0],"xacc":0.9989688}},{"player":{"playerName":"fiyce"},"commonLevel":{"hitMargins":[0,0,2,1687,2,0,0,0,0,0,0,0],"xacc":0.9994087},"groupLevel":{"hitMargins":[0,0,4,1691,2,0,0,0,0,0,0,0],"xacc":0.9991161}},{"player":{"playerName":"HyungWon"},"commonLevel":{"hitMargins":[0,0,0,1691,0,0,0,0,0,0,0,0],"xacc":1},"groupLevel":{"hitMargins":[0,0,8,1684,5,0,0,0,0,0,0,0],"xacc":0.9980848}},{"player":{"playerName":"대야"},"commonLevel":{"hitMargins":[0,0,0,1688,3,0,0,0,0,0,0,0],"xacc":0.9995565},"groupLevel":{"hitMargins":[0,0,5,1687,5,0,0,0,0,0,0,0],"xacc":0.9985268}},{"player":{"playerName":"nnuura"},"commonLevel":{"hitMargins":[0,0,7,1681,3,0,0,0,0,0,0,0],"xacc":0.9985216},"groupLevel":{"hitMargins":[0,0,4,1690,3,0,0,0,0,0,0,0],"xacc":0.9989688}},{"player":{"playerName":"지우"},"commonLevel":{"hitMargins":[0,0,1,1689,0,1,0,0,0,0,0,0],"xacc":0.9994974},"groupLevel":{"hitMargins":[0,1,2,1684,10,0,0,0,0,0,0,0],"xacc":0.9978786}},{"player":{"playerName":"최다현"},"commonLevel":{"hitMargins":[0,0,2,1685,4,0,0,0,0,0,0,0],"xacc":0.999113},"groupLevel":{"hitMargins":[0,1,8,1683,5,0,0,0,0,0,0,0],"xacc":0.9977313}},{"player":{"playerName":"비타"},"commonLevel":{"hitMargins":[0,0,4,1685,2,0,0,0,0,0,0,0],"xacc":0.999113},"groupLevel":{"hitMargins":[0,2,3,1685,6,1,0,0,0,0,0,0],"xacc":0.99761343}},{"player":{"playerName":"띠아블"},"commonLevel":{"hitMargins":[0,0,3,1685,3,0,0,0,0,0,0,0],"xacc":0.999113},"groupLevel":{"hitMargins":[0,0,2,1685,7,3,0,0,0,0,0,0],"xacc":0.9976134}},{"player":{"playerName":"CoinDreemurr"},"commonLevel":{"hitMargins":[0,0,3,1684,4,0,0,0,0,0,0,0],"xacc":0.9989651},"groupLevel":{"hitMargins":[0,0,4,1682,9,2,0,0,0,0,0,0],"xacc":0.9973778}},{"player":{"playerName":"icethread"},"commonLevel":{"hitMargins":[0,0,3,1685,3,0,0,0,0,0,0,0],"xacc":0.999113},"groupLevel":{"hitMargins":[0,2,9,1675,10,1,0,0,0,0,0,0],"xacc":0.9961402}},{"player":{"playerName":"AeiL"},"commonLevel":{"hitMargins":[0,1,6,1679,5,0,0,0,0,0,0,0],"xacc":0.9980189},"groupLevel":{"hitMargins":[0,0,5,1681,9,2,0,0,0,0,0,0],"xacc":0.9972304}},{"player":{"playerName":"zsry"},"commonLevel":{"hitMargins":[1,0,4,1676,7,0,0,0,4,0,0,0],"xacc":0.9955378},"groupLevel":{"hitMargins":[0,0,1,1695,1,0,0,0,0,0,0,0],"xacc":0.9997054}},{"player":{"playerName":"현페"},"commonLevel":{"hitMargins":[1,0,3,1685,3,0,0,0,0,0,0,0],"xacc":0.9986407},"groupLevel":{"hitMargins":[0,2,19,1675,1,0,0,0,0,0,0,0],"xacc":0.9963465}},{"player":{"playerName":"유케이"},"commonLevel":{"hitMargins":[0,4,5,1668,12,2,0,0,0,0,0,0],"xacc":0.9953578},"groupLevel":{"hitMargins":[0,0,3,1692,2,0,0,0,0,0,0,0],"xacc":0.9992634}},{"player":{"playerName":"ADTRE"},"commonLevel":{"hitMargins":[1,0,1,1689,1,0,0,0,0,0,0,0],"xacc":0.9992317},"groupLevel":{"hitMargins":[0,2,10,1670,13,2,0,0,0,0,0,0],"xacc":0.9951974}},{"player":{"playerName":"Matsum"},"commonLevel":{"hitMargins":[0,0,3,1685,2,1,0,0,0,0,0,0],"xacc":0.998906},"groupLevel":{"hitMargins":[0,1,9,1673,10,4,0,0,0,0,0,0],"xacc":0.9954331}},{"player":{"playerName":"ㅁㄴㅇㄹ"},"commonLevel":{"hitMargins":[0,1,5,1681,3,1,0,0,0,0,0,0],"xacc":0.9981076},"groupLevel":{"hitMargins":[0,2,12,1673,9,1,0,0,0,0,0,0],"xacc":0.9958456}},{"player":{"playerName":"jouseop75"},"commonLevel":{"hitMargins":[0,0,8,1679,4,0,0,0,0,0,0,0],"xacc":0.9982259},"groupLevel":{"hitMargins":[0,2,8,1672,14,1,0,0,0,0,0,0],"xacc":0.9956983}},{"player":{"playerName":"ProjectFlea"},"commonLevel":{"hitMargins":[1,2,4,1682,3,0,0,0,0,0,0,0],"xacc":0.9977837},"groupLevel":{"hitMargins":[1,5,10,1678,3,1,0,0,0,0,0,0],"xacc":0.9954947}},{"player":{"playerName":"애캔"},"commonLevel":{"hitMargins":[0,0,1,1674,15,1,0,0,0,0,0,0],"xacc":0.9972797},"groupLevel":{"hitMargins":[0,2,12,1674,6,3,0,0,0,0,0,0],"xacc":0.9955804}},{"player":{"playerName":"박찬휘"},"commonLevel":{"hitMargins":[0,1,10,1672,8,0,0,0,0,0,0,0],"xacc":0.996984},"groupLevel":{"hitMargins":[2,1,10,1678,7,1,0,0,0,0,0,0],"xacc":0.9958505}},{"player":{"playerName":"치킨"},"commonLevel":{"hitMargins":[0,0,6,1683,2,0,0,0,0,0,0,0],"xacc":0.9988173},"groupLevel":{"hitMargins":[0,4,18,1661,13,1,0,0,0,0,0,0],"xacc":0.9936653}},{"player":{"playerName":"SensenPlayer_"},"commonLevel":{"hitMargins":[0,0,2,1681,7,1,0,0,0,0,0,0],"xacc":0.9983146},"groupLevel":{"hitMargins":[0,3,13,1665,13,3,0,0,0,0,0,0],"xacc":0.9940483}},{"player":{"playerName":"보리차"},"commonLevel":{"hitMargins":[0,1,9,1676,5,0,0,0,0,0,0,0],"xacc":0.9975754},"groupLevel":{"hitMargins":[0,3,8,1670,10,6,0,0,0,0,0,0],"xacc":0.9941662}},{"player":{"playerName":"더파"},"commonLevel":{"hitMargins":[0,5,11,1671,4,0,0,0,0,0,0,0],"xacc":0.9960083},"groupLevel":{"hitMargins":[0,5,16,1666,9,1,0,0,0,0,0,0],"xacc":0.9941956}},{"player":{"playerName":"fgghf"},"commonLevel":{"hitMargins":[0,3,6,1669,8,5,0,0,0,0,0,0],"xacc":0.9950917},"groupLevel":{"hitMargins":[0,0,11,1661,23,2,0,0,0,0,0,0],"xacc":0.994284}},{"player":{"playerName":"Copralite"},"commonLevel":{"hitMargins":[2,3,7,1666,11,4,0,0,0,0,0,0],"xacc":0.9939162},"groupLevel":{"hitMargins":[1,4,6,1673,11,2,0,0,1,0,0,0],"xacc":0.9943168}},{"player":{"playerName":"렉곤 laggon"},"commonLevel":{"hitMargins":[0,6,13,1665,7,0,0,0,0,0,0,0],"xacc":0.9949142},"groupLevel":{"hitMargins":[0,2,16,1654,21,4,0,0,0,0,0,0],"xacc":0.9924278}},{"player":{"playerName":"세븐"},"commonLevel":{"hitMargins":[1,2,5,1671,9,3,0,0,1,0,0,0],"xacc":0.9950945},"groupLevel":{"hitMargins":[0,9,21,1651,15,1,0,0,0,0,0,0],"xacc":0.9911609}},{"player":{"playerName":"samkwon519"},"commonLevel":{"hitMargins":[0,2,3,1663,21,2,0,0,0,0,0,0],"xacc":0.9950325},"groupLevel":{"hitMargins":[1,3,24,1639,21,10,0,0,0,0,0,0],"xacc":0.9883098}},{"player":{"playerName":"!뮤직마크!"},"commonLevel":{"hitMargins":[2,6,8,1658,15,4,0,0,0,0,0,0],"xacc":0.9921146},"groupLevel":{"hitMargins":[3,5,19,1654,14,3,0,0,2,0,0,0],"xacc":0.9897353}},{"player":{"playerName":"이루"},"commonLevel":{"hitMargins":[2,11,23,1638,11,8,0,0,0,0,0,0],"xacc":0.9873006},"groupLevel":{"hitMargins":[0,7,17,1648,21,4,0,0,0,0,0,0],"xacc":0.9905127}},{"player":{"playerName":"권현욱"},"commonLevel":{"hitMargins":[2,3,20,1639,24,5,0,0,0,0,0,0],"xacc":0.9897224},"groupLevel":{"hitMargins":[0,10,24,1630,27,5,0,0,1,0,0,0],"xacc":0.986594}},{"player":{"playerName":"미파"},"commonLevel":{"hitMargins":[1,2,6,1660,18,3,0,0,2,0,0,0],"xacc":0.993026},"groupLevel":{"hitMargins":[9,9,24,1629,24,7,0,0,4,0,0,0],"xacc":0.9807737}},{"player":{"playerName":"horsesdrumstick"},"commonLevel":{"hitMargins":[12,5,1,1664,13,2,0,0,6,0,0,0],"xacc":0.9863183},"groupLevel":{"hitMargins":[5,4,13,1644,27,6,0,0,3,0,0,0],"xacc":0.9864865}},{"player":{"playerName":"reaching"},"commonLevel":{"hitMargins":[1,1,22,1659,7,2,0,0,0,0,0,0],"xacc":0.9941785},"groupLevel":{"hitMargins":[1,17,34,1598,33,14,0,0,1,0,0,0],"xacc":0.9781213}},{"player":{"playerName":"Danchu"},"commonLevel":{"hitMargins":[15,12,22,1627,18,1,0,0,11,0,0,0],"xacc":0.9760844},"groupLevel":{"hitMargins":[9,19,45,1551,44,32,0,0,6,0,0,0],"xacc":0.9612837}},{"player":{"playerName":"! 무명"},"commonLevel":{"hitMargins":[6,17,55,1583,18,13,0,0,5,0,0,0],"xacc":0.9728639},"groupLevel":{"hitMargins":[21,17,53,1553,32,23,0,0,19,0,0,0],"xacc":0.952823}},{"player":{"playerName":"고서양"},"commonLevel":{"hitMargins":[40,11,22,1466,95,53,0,0,44,2,0,0],"xacc":0.915955},"groupLevel":{"hitMargins":[62,23,18,1343,147,107,2,0,59,5,0,0],"xacc":0.8672423}}]'
);

const AWCQ1RankingPage = () => {
  /** 0: 모두 보기, 1: 그룹 A, 2: 그룹 B */
  const [currentTab, setCurrentTab] = useState(0);
  const [lang, setLang] = useState('ko-KR');

  const groupACutoffLine = 64;
  const groupBCutoffLine = 36;

  const t = (ko, en, cn) =>
    lang === 'ko-KR' ? ko : lang === 'zh-CN' ? cn : en;
  useEffect(() => {
    const _lang = navigator.language;
    setLang(_lang);
  }, []);

  return (
    <main>
      <Wrapper>
        <SectionTitle>
          {t(
            'AWC 2024 예선 1라운드 리더보드',
            'AWC 2024 Qualifiers Round 1 Leaderboard',
            'AWC 2024预选赛第1轮排行榜'
          )}
        </SectionTitle>
        <TabRow>
          <Tab $active={currentTab === 0} onClick={() => setCurrentTab(0)}>
            {t('모두 보기', 'View All', '查看所有')}
          </Tab>
          <Tab $active={currentTab === 1} onClick={() => setCurrentTab(1)}>
            {t('그룹 A', 'Group A', 'A组')}
          </Tab>
          <Tab $active={currentTab === 2} onClick={() => setCurrentTab(2)}>
            {t('그룹 B', 'Group B', 'B组')}
          </Tab>
        </TabRow>

        <Note>
          <NoteHeader>
            {RedWarningIcon}
            {t('참고', 'Note', '注意')}
          </NoteHeader>
          {t(
            `예선 1라운드는 이미 종료되었습니다!`,
            `Qualifiers Round 1 has already ended!`,
            '预选赛第1轮已经结束了！'
          )}
        </Note>

        {currentTab === 0 && (
          <Row2>
            <div>
              <RankSectionTitle
                additional={`${groupAData.length}${t(
                  '명',
                  ' players',
                  '名玩家'
                )}`}
              >
                {t('그룹 A', 'Group A', 'A组')}
              </RankSectionTitle>

              {groupAData.map((a, i) => (
                <RankingItemFrame
                  playerName={a.player.playerName}
                  rank={i + 1}
                  showCutoffLineBottom={i + 1 === Math.floor(groupACutoffLine)}
                  cutoffLineText={t('커트라인', 'Passing Line', '晋级线')}
                  key={'a' + a.player.playerName}
                >
                  <ItemLevelRecord
                    label={t('합산', 'Sum', '合计')}
                    xAcc={(a.commonLevel.xacc + a.groupLevel.xacc) / 2}
                    hitMargins={a.commonLevel.hitMargins.map(
                      (v, i) => v + a.groupLevel.hitMargins[i]
                    )}
                  />
                </RankingItemFrame>
              ))}
            </div>

            <div>
              <RankSectionTitle
                additional={`${groupBData.length}${t(
                  '명',
                  ' players',
                  '名玩家'
                )}`}
              >
                {t('그룹 B', 'Group B', 'B组')}
              </RankSectionTitle>

              {groupBData.map((a, i) => (
                <RankingItemFrame
                  playerName={a.player.playerName}
                  rank={i + 1}
                  showCutoffLineBottom={i + 1 === Math.floor(groupBCutoffLine)}
                  cutoffLineText={t('커트라인', 'Passing Line', '晋级线')}
                  key={'b' + a.player.playerName}
                >
                  <ItemLevelRecord
                    label={t('합산', 'Sum', '合计')}
                    xAcc={(a.commonLevel.xacc + a.groupLevel.xacc) / 2}
                    hitMargins={a.commonLevel.hitMargins.map(
                      (v, i) => v + a.groupLevel.hitMargins[i]
                    )}
                  />
                </RankingItemFrame>
              ))}
            </div>
          </Row2>
        )}

        {/* ----------------------------------------------------------------------- */}

        {currentTab === 1 && (
          <div>
            <RankSectionTitle
              additional={`${groupAData.length}${t(
                '명',
                ' players',
                '名玩家'
              )}`}
            >
              {t('그룹 A', 'Group A', 'A组')}
            </RankSectionTitle>

            {groupAData.map((a, i) => (
              <RankingItemFrame
                playerName={a.player.playerName}
                rank={i + 1}
                showCutoffLineBottom={i + 1 === Math.floor(groupACutoffLine)}
                cutoffLineText={t('커트라인', 'Passing Line', '晋级线')}
                key={'a' + a.player.playerName}
              >
                <ItemLevelRecord
                  label={t('공통', 'Common', '共同')}
                  xAcc={a.commonLevel.xacc}
                  hitMargins={a.commonLevel.hitMargins}
                />
                <ItemLevelRecord
                  label={t('선택', 'Group', '自选')}
                  xAcc={a.groupLevel.xacc}
                  hitMargins={a.groupLevel.hitMargins}
                />
              </RankingItemFrame>
            ))}
          </div>
        )}

        {currentTab === 2 && (
          <div>
            <RankSectionTitle
              additional={`${groupBData.length}${t(
                '명',
                ' players',
                '名玩家'
              )}`}
            >
              {t('그룹 B', 'Group B', 'B组')}
            </RankSectionTitle>

            {groupBData.map((a, i) => (
              <RankingItemFrame
                playerName={a.player.playerName}
                rank={i + 1}
                showCutoffLineBottom={i + 1 === Math.floor(groupBCutoffLine)}
                cutoffLineText={t('커트라인', 'Passing Line', '晋级线')}
                key={'b' + a.player.playerName}
              >
                <ItemLevelRecord
                  label={t('공통', 'Common', '共同')}
                  xAcc={a.commonLevel.xacc}
                  hitMargins={a.commonLevel.hitMargins}
                />
                <ItemLevelRecord
                  label={t('선택', 'Group', '自选')}
                  xAcc={a.groupLevel.xacc}
                  hitMargins={a.groupLevel.hitMargins}
                />
              </RankingItemFrame>
            ))}
          </div>
        )}
      </Wrapper>
    </main>
  );
};

export default AWCQ1RankingPage;
