import React, { useEffect, useState } from 'react';
import SectionTitle from '../../components/global/SectionTitle';
import styled, { css } from 'styled-components';
import axios from 'axios';

const API_BASE_URL =
  (import.meta.env.DEV ? 'https://corsproxy.io/?' : '') +
  'https://2024-awc.adofai.gg/';

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
  width: calc(50% - 12px);

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

const ItemPlayerId = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-left: 12px;
  user-select: text !important;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  ${RankingItemBox}:hover & {
    opacity: 0.2;
  }
`;

const RankingItemFrame = ({
  playerName,
  playerId,
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
      <RankingItemRow $fillAsRow>
        <ItemRank>#{rank}</ItemRank>
        <ItemPlayerName className='player-name'>{playerName}</ItemPlayerName>
        <ItemPlayerId>{playerId}</ItemPlayerId>
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
  white-space: pre;
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
  const formattedXAcc = (xAcc * 100).toFixed(3).padStart(7);

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

const q1Data = JSON.parse(
  '{"429603674977730570":1,"995307301156159508":1,"422656053877014548":1,"530897034698293250":1,"723366118294814813":1,"734305073483481118":1,"495160970537336843":1,"665017212003680284":1,"914336257339961356":1,"898907957696294914":1,"348283319257137152":1,"944540518333960203":1,"1159488774410088470":1,"802458820630282252":1,"414822798406582272":1,"785347178222583818":1,"750264140563611718":1,"412180095827181570":1,"350751479205986304":1,"558259883506401291":1,"646537790561189907":1,"557902267722760193":1,"914712765355143179":1,"191936176792272897":1,"606105274545209363":1,"637034483459162143":1,"572729218912223235":0.9998522,"267164160733741057":0.9995565,"409193331092881410":0.9995565,"411740500790345739":0.9995565,"963390775289344020":0.9998522,"758500956903178261":1,"861199996622995456":0.9994087,"1051671844723367967":0.9994087,"606927703626481700":0.9997043,"657790131096387594":0.9994087,"620132684831653898":0.9992608,"504996186487259157":0.9997043,"447333460382842880":0.9994087,"919539498533154866":1,"454837100127453204":0.9995565,"895450712920719390":0.9994087,"605778001157947414":0.9992608,"901114146299469834":0.9989651,"1020318623249743963":0.9988173,"536113170138398750":0.99940866,"867223598559920158":0.9991425,"992255537968336936":0.999113,"863393312705478676":0.9988173,"797728962708504577":0.9994087,"346910010128859138":0.999113,"490681340832776202":0.9990839,"764493716077281281":0.999113,"676806511489712129":0.9984033,"814678270824939571":0.9982259,"969807141714145340":0.9986694,"735080278413934674":0.9992903,"767365680772939796":0.9987581,"749281935611920405":0.9998522,"469013119038128138":0.9985216,"1004308977909256273":0.9981667,"998543567767212103":0.9990538,"308454626879864833":0.9983146,"296289597682352129":0.9985216,"630676529407459339":0.9966884,"1011902000260194324":0.9975473,"683685708539494400":0.9970728,"856362462356701184":0.9974276,"634952717101694979":0.9968085,"713934154139435120":0.9978428,"1017016063038328862":0.9966588,"569485963777277952":0.9972206,"1136357399008129106":0.9961879,"724101173002502199":0.9956239,"1171855102689161220":0.9952747,"452415871550357504":0.9953014,"685714220024594528":0.9944412,"1180798679293116476":0.9961265,"785690140286255104":0.9931738,"553933579252531200":0.9970136,"1131915643092992152":0.993495,"994884888295653396":0.992435,"895816291561111552":0.9908447,"736207124853555242":0.9959835,"464402407099596811":0.990649,"1175123688522264818":0.9741774,"890166338763522048":0.9850442,"758876004671553566":0.9594988,"666273632997212180":0.9763963,"752010041443483760":0.9498281,"1044126689728401458":0.994392,"995849565527867543":0.9275674,"661376794783383603":0.9715,"1183317383960604753":0.94171,"1122454627284164658":0.9509627,"1168471554917662792":0.7222829,"619855815909572628":1,"564237835788615681":1,"353782790875119627":1,"308170702727413763":1,"348729949693411328":1,"294026955932565506":1,"860721976025153556":1,"860766136752930846":1,"803785016709873684":1,"967398488600117258":0.9998522,"652822209437368321":0.9998522,"665159357616357377":1,"571666986669703168":0.9998522,"823672345717506060":1,"759339957004664832":1,"934816770353684552":0.9998522,"884350978655137865":0.9994087,"548738772972339201":1,"1027886236968439848":0.9995565,"497812512432193548":0.9985216,"532845334775201792":0.9994974,"952155219511365642":0.999113,"858986000600006666":0.999113,"772082851172712488":0.999113,"679987249101668364":0.9989651,"287780818934431748":0.999113,"685697991213973537":0.9980189,"957777969517039627":0.9955378,"616942838105636865":0.9986407,"621516130334539786":0.9953578,"922115407656149024":0.9992317,"696826166925066340":0.998906,"839090788322508841":0.9981076,"660747182915452928":0.9982259,"423939831681515521":0.9977837,"540488143799844874":0.9972797,"381317752331173888":0.996984,"682670286839087167":0.9988173,"764675442203557889":0.9983146,"706395328907313232":0.9975754,"433224189194010654":0.9960083,"764823089682317323":0.9950917,"385129303865688064":0.9939162,"839348697623035914":0.9949142,"707756853702033428":0.9950945,"532880388003987458":0.9950325,"622098032854433813":0.9921146,"584645121698693140":0.9873006,"749511961447759975":0.9897224,"687668618691084295":0.993026,"623747105735049216":0.9863183,"1140206412220346412":0.9941785,"938391068083368017":0.9760844,"701362756640833578":0.9728639,"808156976592846899":0.915955}'
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
}) => {
  const sumXAcc = (a) =>
    Object.keys(a.levelStats)
      .sort()
      .splice(0, levelTypeToShow.length)
      .reduce((_a, _b) => _a + a.levelStats[_b].xacc, 0);

  const preprocessedRankData = rankData
    .filter((a) => a.levelStats[levelTypeToFilter])
    .sort(
      (a, b) =>
        sumXAcc(b) - sumXAcc(a) ||
        q1Data[b.player.playerId] - q1Data[a.player.playerId] ||
        new Date(a.levelStats[levelTypeToFilter].updatedAt) -
          new Date(b.levelStats[levelTypeToFilter].updatedAt)
    );

  return (
    <>
      {preprocessedRankData.map((a, i) => (
        <RankingItemFrame
          playerName={a.player.playerName}
          playerId={a.player.playerId}
          rank={i + 1}
          t={t}
          showCutoffLineBottom={i + 1 === cutOffLine}
          key={a.player.playerId}
        >
          <ItemLevelRecord
            label={t('합산', 'Sum', '合计')}
            xAcc={sumXAcc(a)}
            hitMargins={Object.values(a.levelStats)
              .splice(0, levelTypeToShow.length)
              .reduce(
                (a, b) => a.map((v, i) => v + b.hitMargins[i]),
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              )}
            fillAsRow={levelTypeToShow.length > 1}
          />

          {levelTypeToShow.map((levelType) => (
            <ItemLevelRecord
              label={
                {
                  levelA: t('레벨 1', 'Level 1', '关卡一'),
                  levelB: t('레벨 2', 'Level 2', '关卡二'),
                  levelC: t('레벨 3', 'Level 3', '关卡三'),
                  levelD: t('레벨 4', 'Level 4', '关卡四')
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
      {preprocessedRankData.length < cutOffLine &&
        Array.from({ length: cutOffLine - preprocessedRankData.length }).map(
          (_, i) => (
            <RankingItemSkeleton
              rank={preprocessedRankData.length + i + 1}
              showCutoffLineBottom={
                preprocessedRankData.length + i + 1 === cutOffLine
              }
              t={t}
              key={i}
            />
          )
        )}
    </>
  );
};

const tabShowDate = {
  levelA: new Date('2024-01-16T00:00:00+09:00'),
  levelB: new Date('2024-01-19T00:00:00+09:00'),
  levelC: new Date('2024-01-22T00:00:00+09:00'),
  levelD: new Date('2024-01-25T00:00:00+09:00')
};

const AWCQ2RankingPage = () => {
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
            {t('첫 번째 레벨', 'First Level', '关卡一')}
          </Tab>
          <Tab
            $active={currentTab === 1}
            onClick={() => setCurrentTab(1)}
            disabled={Date.now() < tabShowDate.levelB.getTime()}
          >
            {t('두 번째 레벨', 'Second Level', '关卡二')}
          </Tab>
          <Tab
            $active={currentTab === 2}
            onClick={() => setCurrentTab(2)}
            disabled={Date.now() < tabShowDate.levelC.getTime()}
          >
            {t('세 번째 레벨', 'Third Level', '关卡三')}
          </Tab>
          <Tab
            $active={currentTab === 3}
            onClick={() => setCurrentTab(3)}
            disabled={Date.now() < tabShowDate.levelD.getTime()}
          >
            {t('네 번째 레벨', 'Fourth Level', '关卡四')}
          </Tab>
        </TabRow>

        {[0, 1, 2, 3].map(
          (i) =>
            currentTab === i && (
              <RankingItemList
                rankData={rankData}
                levelTypeToFilter={`level${'ABCD'[i]}`}
                levelTypeToShow={['levelA', 'levelB', 'levelC', 'levelD'].slice(
                  0,
                  i + 1
                )}
                cutOffLine={100 - 17 * (i + 1)}
                t={t}
                key={i}
              />
            )
        )}
      </Wrapper>
    </main>
  );
};

export default AWCQ2RankingPage;
