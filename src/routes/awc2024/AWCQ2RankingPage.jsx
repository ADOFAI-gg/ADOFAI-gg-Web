import React, { useEffect, useState } from 'react';
import SectionTitle from '../../components/global/SectionTitle';
import styled, { css } from 'styled-components';
import axios from 'axios';

const API_BASE_URL = 'https://corsproxy.io/?' + 'https://2024-awc.adofai.gg/'; // TODO

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
  transition: all 0.2s ease-in-out;
  transition-property: background-color, font-weight;

  ${({ disabled }) =>
    !disabled &&
    css`
      cursor: pointer;

      &:hover,
      &:focus-visible {
        background: rgba(0, 2, 15, 0.6);
      }

      &:active {
        background: rgba(0, 2, 15, 0.8);
      }
    `}

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
  flex-grow: 1;

  ${({ $fillAsRow }) =>
    $fillAsRow &&
    css`
      width: 100%;
    `}
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
  t
}) => {
  return (
    <RankingItemBox
      $showCutoffLineBottom={showCutoffLineBottom}
      $cutoffLineText={t('커트라인', 'Passing Line', '晋级线')}
    >
      <RankingItemRow>
        <ItemRank>#{rank}</ItemRank>
        <ItemPlayerName>{playerName}</ItemPlayerName>
      </RankingItemRow>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {children}
      </div>
    </RankingItemBox>
  );
};

const RecordLabel = styled.div`
  width: 64px;
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
const ItemLevelRecord = ({ label, xAcc, hitMargins, fillAsRow }) => {
  const formattedXAcc = xAcc >= 1 ? '100.000' : (xAcc * 100).toFixed(3);

  return (
    <RankingItemRow $fillAsRow={fillAsRow}>
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

const RankingItemSkeletonBox = styled.div`
  display: flex;
  padding: 18px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;

  ${({ $showCutoffLineBottom, $cutoffLineText }) =>
    cutoffLineStyle({ $showCutoffLineBottom, $cutoffLineText })}
`;

const RankingItemSkeletonContent = styled.div`
  font-family: var(--monospace-font);
  width: 100%;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);

  color: rgba(255, 255, 255, 0.1);
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RankingItemSkeleton = ({ rank, showCutoffLineBottom, t }) => (
  <RankingItemSkeletonBox
    $showCutoffLineBottom={showCutoffLineBottom}
    $cutoffLineText={t('커트라인', 'Passing Line', '晋级线')}
  >
    <RankingItemSkeletonContent>#{rank}</RankingItemSkeletonContent>
  </RankingItemSkeletonBox>
);

/**
 * @param {Object} props
 * @param {Array} props.rankData
 * @param {String} props.levelTypeToFilter 'levelA', 'levelB', 'levelC', 'levelD'
 * @param {String[]} props.levelTypeToShow  ['levelA', 'levelB', 'levelC', 'levelD']
 * @param {Number} props.cutOffLine
 * @param {Function} props.t
 */
const RankingItemList = ({
  rankData,
  levelTypeToFilter,
  levelTypeToShow,
  cutOffLine,
  t
}) => (
  <>
    {rankData
      .filter((a) => a.levelStats[levelTypeToFilter])
      .map((a, i) => (
        <RankingItemFrame
          playerName={a.player.playerName}
          rank={i + 1}
          t={t}
          showCutoffLineBottom={i + 1 === cutOffLine}
          key={a.player.playerId}
        >
          <ItemLevelRecord
            label={t('합산', 'Sum', '合计')}
            xAcc={Object.values(a.levelStats).reduce((a, b) => a + b.xacc, 0)}
            hitMargins={Object.values(a.levelStats).reduce(
              (a, b) => a.map((v, i) => v + b.hitMargins[i]),
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            )}
            fillAsRow={levelTypeToShow.length > 1}
          />

          {levelTypeToShow.map((levelType) => (
            <ItemLevelRecord
              label={
                {
                  levelA: t('첫째', 'Level 1', '第1关'),
                  levelB: t('둘째', 'Level 2', '第2关'),
                  levelC: t('셋째', 'Level 3', '第3关'),
                  levelD: t('넷째', 'Level 4', '第4关')
                }[levelType]
              }
              xAcc={a.levelStats[levelType].xacc}
              hitMargins={a.levelStats[levelType].hitMargins}
              key={levelType}
            />
          ))}
        </RankingItemFrame>
      ))}

    {/* 커트라인까지 rankItem 없으면 스켈레톤 */}
    {rankData.length < cutOffLine &&
      Array.from({ length: cutOffLine - rankData.length }).map((_, i) => (
        <RankingItemSkeleton
          rank={rankData.length + i + 1}
          showCutoffLineBottom={rankData.length + i + 1 === cutOffLine}
          t={t}
          key={i}
        />
      ))}
  </>
);

const tabShowDate = {
  levelA: new Date('2024-01-16T00:00:00+09:00'),
  levelB: new Date('2024-01-19T00:00:00+09:00'),
  levelC: new Date('2024-01-22T00:00:00+09:00'),
  levelD: new Date('2024-01-25T00:00:00+09:00')
};

const AWCQ2RankingPage = () => {
  /** 0: 모두 보기, 1: 그룹 A, 2: 그룹 B */
  const [currentTab, setCurrentTab] = useState(0);
  const [lang, setLang] = useState('ko-KR');

  const [rankData, setRankData] = useState([]);

  const t = (ko, en, cn) =>
    lang === 'ko-KR' ? ko : lang === 'zh-CN' ? cn : en;

  useEffect(() => {
    // 언어 설정
    const _lang = navigator.language;
    setLang(_lang);

    const now = Date.now();
    if (now < tabShowDate.levelB.getTime()) setCurrentTab(0);
    else if (now < tabShowDate.levelC.getTime()) setCurrentTab(1);
    else if (now < tabShowDate.levelD.getTime()) setCurrentTab(2);
    else setCurrentTab(3);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: rankData } = await axios.get(
          `${API_BASE_URL}measure/rank?limit=100`
        );
        setRankData(rankData.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <Wrapper>
        <SectionTitle>
          {t(
            'AWC 2024 예선 2라운드 리더보드',
            'AWC 2024 Qualifiers Round 2 Leaderboard',
            'AWC 2024预选赛第2轮排行榜'
          )}
        </SectionTitle>
        <TabRow>
          <Tab $active={currentTab === 0} onClick={() => setCurrentTab(0)}>
            {t('첫 번째 레벨', 'First Level')}
          </Tab>
          <Tab
            $active={currentTab === 1}
            onClick={() => setCurrentTab(1)}
            disabled={Date.now() < tabShowDate.levelB.getTime()}
          >
            {t('두 번째 레벨', 'Second Level')}
          </Tab>
          <Tab
            $active={currentTab === 2}
            onClick={() => setCurrentTab(2)}
            disabled={Date.now() < tabShowDate.levelC.getTime()}
          >
            {t('세 번째 레벨', 'Third Level')}
          </Tab>
          <Tab
            $active={currentTab === 3}
            onClick={() => setCurrentTab(3)}
            disabled={Date.now() < tabShowDate.levelD.getTime()}
          >
            {t('네 번째 레벨', 'Foruth Level')}
          </Tab>
        </TabRow>

        {currentTab === 0 && (
          <RankingItemList
            rankData={rankData}
            levelTypeToFilter='levelA'
            levelTypeToShow={['levelA']}
            cutOffLine={100 - 17 * 1}
            t={t}
          />
        )}

        {currentTab === 1 && (
          <RankingItemList
            rankData={rankData}
            levelTypeToFilter='levelB'
            levelTypeToShow={['levelA', 'levelB']}
            cutOffLine={100 - 17 * 2}
            t={t}
          />
        )}

        {currentTab === 2 && (
          <RankingItemList
            rankData={rankData}
            levelTypeToFilter='levelC'
            levelTypeToShow={['levelA', 'levelB', 'levelC']}
            cutOffLine={100 - 17 * 3}
            t={t}
          />
        )}

        {currentTab === 3 && (
          <RankingItemList
            rankData={rankData}
            levelTypeToFilter='levelD'
            levelTypeToShow={['levelA', 'levelB', 'levelC', 'levelD']}
            cutOffLine={100 - 17 * 4}
            t={t}
          />
        )}
      </Wrapper>
    </main>
  );
};

export default AWCQ2RankingPage;
