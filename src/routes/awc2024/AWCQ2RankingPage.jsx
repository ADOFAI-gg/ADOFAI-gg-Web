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
  const getLevelsStats = (a) =>
    Object.keys(a.levelStats).sort().splice(0, levelTypeToShow.length);

  const sumXAcc = (a) =>
    getLevelsStats(a).reduce((_a, _b) => _a + a.levelStats[_b].xacc, 0);

  const sumHitMargins = (a) =>
    getLevelsStats(a).reduce(
      (_a, _b) => _a.map((v, i) => v + a.levelStats[_b].hitMargins[i]),
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );

  // xAcc가 높을수록 -> (failMiss + failOverload)가 적을수록(idx 8+9) -> perfect가 많을수록(idx 3) -> q1Data가 높을수록 -> updatedAt이 빠를수록
  const preprocessedRankData = rankData
    .filter((a) => a.levelStats[levelTypeToFilter])
    .sort((a, b) => {
      const sumHitMarginsA = sumHitMargins(a);
      const sumHitMarginsB = sumHitMargins(b);

      return (
        sumXAcc(b) - sumXAcc(a) ||
        sumHitMarginsA[8] +
          sumHitMarginsA[9] -
          (sumHitMarginsB[8] + sumHitMarginsB[9]) ||
        sumHitMarginsB[3] - sumHitMarginsA[3] ||
        q1Data[b.player.playerId] - q1Data[a.player.playerId] ||
        new Date(a.levelStats[levelTypeToFilter].updatedAt) -
          new Date(b.levelStats[levelTypeToFilter].updatedAt)
      );
    });

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
            hitMargins={sumHitMargins(a)}
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

const q2Data = JSON.parse(
  '[{"player":{"playerId":"348729949693411328","playerName":"피구공"},"levelStats":{"levelC":{"hitMargins":[0,0,0,1430,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T15:26:29.99981","xacc":1},"levelA":{"hitMargins":[0,0,0,1453,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-15T16:46:56.568767","xacc":1},"levelD":{"hitMargins":[0,0,0,1744,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-24T16:46:30.738658","xacc":1},"levelB":{"hitMargins":[0,0,0,1177,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-19T14:07:09.476507","xacc":1}}},{"player":{"playerId":"422656053877014548","playerName":"Mint"},"levelStats":{"levelC":{"hitMargins":[0,0,0,1430,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-24T13:51:37.739307","xacc":1},"levelA":{"hitMargins":[0,0,0,1453,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-16T06:49:17.447315","xacc":1},"levelD":{"hitMargins":[0,0,0,1744,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-24T16:51:41.753112","xacc":1},"levelB":{"hitMargins":[0,0,0,1177,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-20T08:29:22.700276","xacc":1}}},{"player":{"playerId":"619855815909572628","playerName":"Kekman301"},"levelStats":{"levelC":{"hitMargins":[0,0,0,1430,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-22T13:36:30.219962","xacc":1},"levelA":{"hitMargins":[0,0,0,1453,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-15T19:02:37.481286","xacc":1},"levelD":{"hitMargins":[0,0,0,1744,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-25T17:44:58.823693","xacc":1},"levelB":{"hitMargins":[0,0,0,1177,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-19T20:31:31.273516","xacc":1}}},{"player":{"playerId":"429603674977730570","playerName":"알명서1512"},"levelStats":{"levelC":{"hitMargins":[0,0,0,1430,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-22T07:03:24.801481","xacc":1},"levelA":{"hitMargins":[0,0,0,1453,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-16T10:10:26.124691","xacc":1},"levelD":{"hitMargins":[0,0,0,1744,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-26T12:39:32.329865","xacc":1},"levelB":{"hitMargins":[0,0,0,1177,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-20T08:13:35.81798","xacc":1}}},{"player":{"playerId":"823672345717506060","playerName":"yoonsu"},"levelStats":{"levelC":{"hitMargins":[0,0,0,1430,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-24T13:05:05","xacc":1},"levelA":{"hitMargins":[0,0,0,1453,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-18T14:14:08","xacc":1},"levelD":{"hitMargins":[0,0,0,1744,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-27T03:06:40","xacc":1},"levelB":{"hitMargins":[0,0,0,1177,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-20T03:43:53","xacc":1}}},{"player":{"playerId":"353782790875119627","playerName":"RainB"},"levelStats":{"levelC":{"hitMargins":[0,0,0,1430,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T17:49:50.249238","xacc":1},"levelA":{"hitMargins":[0,0,0,1453,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-16T18:30:16.201852","xacc":1},"levelD":{"hitMargins":[0,0,0,1744,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-27T12:51:23.296874","xacc":1},"levelB":{"hitMargins":[0,0,0,1177,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-20T16:06:25.192988","xacc":1}}},{"player":{"playerId":"294026955932565506","playerName":"ㅇㅈㅎ"},"levelStats":{"levelC":{"hitMargins":[0,0,0,1430,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-24T12:55:23.600914","xacc":1},"levelA":{"hitMargins":[0,0,0,1452,1,0,0,0,0,0,0,0],"updatedAt":"2024-01-18T11:31:37.431291","xacc":0.9998279},"levelD":{"hitMargins":[0,0,0,1744,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-26T07:10:37.963271","xacc":1},"levelB":{"hitMargins":[0,0,0,1177,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-19T15:04:36.057772","xacc":1}}},{"player":{"playerId":"646537790561189907","playerName":"스심"},"levelStats":{"levelC":{"hitMargins":[0,0,0,1430,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-23T15:12:47.012251","xacc":1},"levelA":{"hitMargins":[0,0,0,1453,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-17T02:23:49.70012","xacc":1},"levelD":{"hitMargins":[0,0,1,1741,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-27T07:13:29.460575","xacc":0.99957},"levelB":{"hitMargins":[0,0,0,1177,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-20T15:58:46.769378","xacc":1}}},{"player":{"playerId":"803785016709873684","playerName":"Jipper"},"levelStats":{"levelC":{"hitMargins":[0,0,0,1430,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-22T01:17:14.904675","xacc":1},"levelA":{"hitMargins":[0,0,0,1453,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-16T02:09:55.460312","xacc":1},"levelD":{"hitMargins":[0,1,1,1742,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-24T16:11:44.522771","xacc":0.9995126},"levelB":{"hitMargins":[0,0,0,1177,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-19T12:01:29.911808","xacc":1}}},{"player":{"playerId":"530897034698293250","playerName":"폐브"},"levelStats":{"levelC":{"hitMargins":[0,0,1,1429,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-24T01:17:04.085419","xacc":0.9998252},"levelA":{"hitMargins":[0,0,3,1450,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-17T05:57:47.792139","xacc":0.9994838},"levelD":{"hitMargins":[0,0,1,1740,3,0,0,0,0,0,0,0],"updatedAt":"2024-01-24T15:54:42.908415","xacc":0.9994266},"levelB":{"hitMargins":[0,0,0,1177,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-19T14:39:29.864986","xacc":1}}},{"player":{"playerId":"860721976025153556","playerName":"asjdh [아스제]"},"levelStats":{"levelC":{"hitMargins":[0,0,0,1430,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-22T16:28:23.81924","xacc":1},"levelA":{"hitMargins":[0,0,0,1453,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-16T12:56:52.649925","xacc":1},"levelD":{"hitMargins":[0,0,0,1743,1,0,0,0,0,0,0,0],"updatedAt":"2024-01-26T14:38:34.327196","xacc":0.9998567},"levelB":{"hitMargins":[0,0,4,1171,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T11:45:05.796013","xacc":0.9987256}}},{"player":{"playerId":"412180095827181570","playerName":"wsbimango"},"levelStats":{"levelC":{"hitMargins":[0,0,1,1428,1,0,0,0,0,0,0,0],"updatedAt":"2024-01-23T10:29:53.143303","xacc":0.9996504},"levelA":{"hitMargins":[0,0,0,1453,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-17T17:24:36.451039","xacc":1},"levelD":{"hitMargins":[1,1,4,1733,5,1,0,0,0,0,0,0],"updatedAt":"2024-01-27T01:13:42.045484","xacc":0.9975645},"levelB":{"hitMargins":[0,0,2,1172,3,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T09:11:41.217034","xacc":0.998938}}},{"player":{"playerId":"860766136752930846","playerName":"어깨가아파요"},"levelStats":{"levelC":{"hitMargins":[0,0,2,1428,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-22T09:51:54.243604","xacc":0.9996504},"levelA":{"hitMargins":[0,0,1,1450,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-17T12:03:13.816011","xacc":0.9994838},"levelD":{"hitMargins":[0,0,5,1737,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-25T12:12:13.903515","xacc":0.9989966},"levelB":{"hitMargins":[0,0,5,1167,5,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T12:14:14.913132","xacc":0.9978759}}},{"player":{"playerId":"350751479205986304","playerName":"도드기"},"levelStats":{"levelC":{"hitMargins":[0,0,1,1429,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-23T19:48:17.385613","xacc":0.9998252},"levelA":{"hitMargins":[0,0,0,1453,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-15T17:18:44.8943","xacc":1},"levelD":{"hitMargins":[0,0,2,1736,3,3,0,0,0,0,0,0],"updatedAt":"2024-01-26T20:29:23.318107","xacc":0.9982511},"levelB":{"hitMargins":[0,0,2,1169,4,2,0,0,0,0,0,0],"updatedAt":"2024-01-20T08:19:57.544898","xacc":0.9977061}}},{"player":{"playerId":"348283319257137152","playerName":"발아통밀"},"levelStats":{"levelC":{"hitMargins":[0,0,1,1426,2,1,0,0,0,0,0,0],"updatedAt":"2024-01-23T13:14:56.923898","xacc":0.9990559},"levelA":{"hitMargins":[0,0,3,1450,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-18T10:31:25.260298","xacc":0.9994838},"levelD":{"hitMargins":[0,3,6,1733,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-27T10:16:28.105549","xacc":0.9978211},"levelB":{"hitMargins":[0,0,3,1174,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-20T10:55:26.600819","xacc":0.9993628}}},{"player":{"playerId":"717983894519021588","playerName":"noobjamini"},"levelStats":{"levelC":{"hitMargins":[0,0,0,1429,1,0,0,0,0,0,0,0],"updatedAt":"2024-01-23T07:19:56.148281","xacc":0.9998252},"levelA":{"hitMargins":[0,0,1,1451,1,0,0,0,0,0,0,0],"updatedAt":"2024-01-16T08:22:38.105012","xacc":0.9996559},"levelD":{"hitMargins":[0,0,4,1735,5,0,0,0,0,0,0,0],"updatedAt":"2024-01-26T08:53:15.682754","xacc":0.9987099},"levelB":{"hitMargins":[0,0,7,1165,5,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T08:54:21.971876","xacc":0.9974511}}},{"player":{"playerId":"723366118294814813","playerName":"Sharky"},"levelStats":{"levelC":{"hitMargins":[0,0,0,1430,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-23T09:34:51.599666","xacc":1},"levelA":{"hitMargins":[0,0,0,1452,1,0,0,0,0,0,0,0],"updatedAt":"2024-01-17T09:50:42.227929","xacc":0.9998279},"levelD":{"hitMargins":[0,2,2,1735,2,3,0,0,0,0,0,0],"updatedAt":"2024-01-25T05:30:23.791399","xacc":0.9977064},"levelB":{"hitMargins":[0,0,3,1168,6,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T03:26:43.03523","xacc":0.9980884}}},{"player":{"playerId":"637034483459162143","playerName":"Sammon"},"levelStats":{"levelC":{"hitMargins":[0,1,1,1425,2,1,0,0,0,0,0,0],"updatedAt":"2024-01-21T17:28:39.836277","xacc":0.9986364},"levelA":{"hitMargins":[0,0,1,1448,3,1,0,0,0,0,0,0],"updatedAt":"2024-01-15T16:36:50.233078","xacc":0.9988988},"levelD":{"hitMargins":[0,0,4,1734,5,1,0,0,0,0,0,0],"updatedAt":"2024-01-24T22:32:46.312844","xacc":0.9983658},"levelB":{"hitMargins":[0,0,1,1175,1,0,0,0,0,0,0,0],"updatedAt":"2024-01-19T19:08:29.317863","xacc":0.9995752}}},{"player":{"playerId":"564237835788615681","playerName":"R_I"},"levelStats":{"levelC":{"hitMargins":[0,2,4,1424,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T16:32:07.36909","xacc":0.9984615},"levelA":{"hitMargins":[0,0,3,1448,1,1,0,0,0,0,0,0],"updatedAt":"2024-01-18T08:34:26.850973","xacc":0.9988988},"levelD":{"hitMargins":[0,0,9,1735,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-26T20:24:09.091248","xacc":0.9987099},"levelB":{"hitMargins":[0,0,3,1174,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-20T13:23:03.789363","xacc":0.9993628}}},{"player":{"playerId":"797728962708504577","playerName":"준탱이는방탱"},"levelStats":{"levelC":{"hitMargins":[1,0,2,1425,2,1,0,0,0,0,0,0],"updatedAt":"2024-01-24T11:28:21.398586","xacc":0.9983228},"levelA":{"hitMargins":[0,0,2,1451,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-18T08:23:57.331964","xacc":0.9996559},"levelD":{"hitMargins":[0,2,3,1732,5,2,0,0,0,0,0,0],"updatedAt":"2024-01-26T13:26:26.047623","xacc":0.9974771},"levelB":{"hitMargins":[0,0,1,1175,1,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T10:29:09.485805","xacc":0.9995752}}},{"player":{"playerId":"1027886236968439848","playerName":"대야"},"levelStats":{"levelC":{"hitMargins":[0,0,4,1423,3,0,0,0,0,0,0,0],"updatedAt":"2024-01-24T03:06:46.283856","xacc":0.9987762},"levelA":{"hitMargins":[0,0,3,1450,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-17T03:16:35.610624","xacc":0.9994838},"levelD":{"hitMargins":[0,2,1,1736,5,0,0,0,0,0,0,0],"updatedAt":"2024-01-25T14:34:09.509547","xacc":0.9984518},"levelB":{"hitMargins":[0,0,6,1168,3,0,0,0,0,0,0,0],"updatedAt":"2024-01-20T15:46:37.659638","xacc":0.9980884}}},{"player":{"playerId":"308170702727413763","playerName":"태 혁"},"levelStats":{"levelC":{"hitMargins":[0,0,2,1427,1,0,0,0,0,0,0,0],"updatedAt":"2024-01-24T14:38:12.793737","xacc":0.9994755},"levelA":{"hitMargins":[0,0,0,1453,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-18T08:02:28.98088","xacc":1},"levelD":{"hitMargins":[0,3,7,1724,9,1,0,0,0,0,0,0],"updatedAt":"2024-01-25T11:27:19.298686","xacc":0.9963303},"levelB":{"hitMargins":[0,0,3,1172,1,1,0,0,0,0,0,0],"updatedAt":"2024-01-21T13:31:02.622122","xacc":0.9986406}}},{"player":{"playerId":"571666986669703168","playerName":"Jofo"},"levelStats":{"levelC":{"hitMargins":[0,0,1,1427,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-22T18:09:48.299286","xacc":0.9994755},"levelA":{"hitMargins":[0,1,5,1443,4,0,0,0,0,0,0,0],"updatedAt":"2024-01-15T16:33:13.247445","xacc":0.9980385},"levelD":{"hitMargins":[0,1,5,1736,1,1,0,0,0,0,0,0],"updatedAt":"2024-01-25T16:33:00.319247","xacc":0.9984518},"levelB":{"hitMargins":[0,0,2,1169,6,0,0,0,0,0,0,0],"updatedAt":"2024-01-20T15:28:07.544644","xacc":0.9983008}}},{"player":{"playerId":"665159357616357377","playerName":"RinkiRin"},"levelStats":{"levelC":{"hitMargins":[0,0,3,1425,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-22T04:47:52.744952","xacc":0.9991259},"levelA":{"hitMargins":[0,0,4,1438,11,0,0,0,0,0,0,0],"updatedAt":"2024-01-16T07:24:59.712216","xacc":0.9974191},"levelD":{"hitMargins":[0,0,6,1735,3,0,0,0,0,0,0,0],"updatedAt":"2024-01-27T04:18:38.527678","xacc":0.9987099},"levelB":{"hitMargins":[0,0,4,1171,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T11:48:50.187284","xacc":0.9987256}}},{"player":{"playerId":"914712765355143179","playerName":"RetroBean"},"levelStats":{"levelC":{"hitMargins":[1,0,4,1423,3,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T20:43:28.803782","xacc":0.998218},"levelA":{"hitMargins":[0,0,0,1453,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-16T00:54:11.316372","xacc":1},"levelD":{"hitMargins":[0,0,7,1735,1,1,0,0,0,0,0,0],"updatedAt":"2024-01-24T20:19:05.98062","xacc":0.9985092},"levelB":{"hitMargins":[2,0,4,1169,3,1,0,0,0,0,0,0],"updatedAt":"2024-01-19T21:11:53.197232","xacc":0.9966497}}},{"player":{"playerId":"967398488600117258","playerName":"rtzjskl"},"levelStats":{"levelC":{"hitMargins":[0,0,10,1417,3,0,0,0,0,0,0,0],"updatedAt":"2024-01-23T10:22:55.799406","xacc":0.9977273},"levelA":{"hitMargins":[0,0,1,1450,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-18T11:36:00.527906","xacc":0.9994838},"levelD":{"hitMargins":[1,1,4,1729,8,2,0,0,0,0,0,0],"updatedAt":"2024-01-26T12:13:50.31777","xacc":0.9967908},"levelB":{"hitMargins":[0,0,2,1172,3,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T12:55:25.160009","xacc":0.998938}}},{"player":{"playerId":"191936176792272897","playerName":"Dehznik"},"levelStats":{"levelC":{"hitMargins":[0,2,0,1428,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-24T13:26:03.421529","xacc":0.9991608},"levelA":{"hitMargins":[0,0,1,1450,1,1,0,0,0,0,0,0],"updatedAt":"2024-01-16T03:57:00.728816","xacc":0.999243},"levelD":{"hitMargins":[1,1,4,1736,2,1,0,0,0,0,0,0],"updatedAt":"2024-01-26T15:27:09.904553","xacc":0.9979942},"levelB":{"hitMargins":[0,1,8,1164,2,2,0,0,0,0,0,0],"updatedAt":"2024-01-21T12:00:37.95197","xacc":0.9963467}}},{"player":{"playerId":"963390775289344020","playerName":"rizecoin"},"levelStats":{"levelC":{"hitMargins":[0,0,10,1420,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-22T16:24:15.084285","xacc":0.9982517},"levelA":{"hitMargins":[1,0,3,1447,3,0,0,0,0,0,0,0],"updatedAt":"2024-01-16T22:28:53.89336","xacc":0.9984182},"levelD":{"hitMargins":[0,0,1,1739,4,0,0,0,0,0,0,0],"updatedAt":"2024-01-27T13:30:56.37015","xacc":0.9992833},"levelB":{"hitMargins":[0,1,8,1163,5,0,0,0,0,0,0,0],"updatedAt":"2024-01-19T07:53:16.299662","xacc":0.996729}}},{"player":{"playerId":"858986000600006666","playerName":"비타"},"levelStats":{"levelC":{"hitMargins":[0,0,2,1426,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-23T06:08:27.798729","xacc":0.9993007},"levelA":{"hitMargins":[0,0,1,1449,3,0,0,0,0,0,0,0],"updatedAt":"2024-01-18T14:44:45.357211","xacc":0.9993117},"levelD":{"hitMargins":[0,1,7,1725,8,3,0,0,0,0,0,0],"updatedAt":"2024-01-25T05:34:01.610707","xacc":0.9964736},"levelB":{"hitMargins":[0,0,7,1165,5,0,0,0,0,0,0,0],"updatedAt":"2024-01-20T04:08:28.461268","xacc":0.9974511}}},{"player":{"playerId":"652822209437368321","playerName":"RosecatRC"},"levelStats":{"levelC":{"hitMargins":[0,1,5,1417,6,1,0,0,0,0,0,0],"updatedAt":"2024-01-22T13:26:41.188305","xacc":0.9972377},"levelA":{"hitMargins":[0,1,2,1449,1,0,0,0,0,0,0,0],"updatedAt":"2024-01-17T10:19:16.063877","xacc":0.9990709},"levelD":{"hitMargins":[0,2,3,1735,4,0,0,0,0,0,0,0],"updatedAt":"2024-01-27T12:45:45.675479","xacc":0.9983085},"levelB":{"hitMargins":[0,1,3,1168,5,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T04:20:53.574985","xacc":0.997791}}},{"player":{"playerId":"665017212003680284","playerName":"리온"},"levelStats":{"levelC":{"hitMargins":[0,2,3,1425,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-24T13:19:26.706186","xacc":0.9986364},"levelA":{"hitMargins":[0,0,3,1449,1,0,0,0,0,0,0,0],"updatedAt":"2024-01-18T13:48:11.284174","xacc":0.9993117},"levelD":{"hitMargins":[0,0,1,1740,3,0,0,0,0,0,0,0],"updatedAt":"2024-01-27T14:44:50.111909","xacc":0.9994266},"levelB":{"hitMargins":[0,3,5,1159,9,1,0,0,0,0,0,0],"updatedAt":"2024-01-21T14:05:10.715673","xacc":0.9949872}}},{"player":{"playerId":"267164160733741057","playerName":"5henry"},"levelStats":{"levelC":{"hitMargins":[0,4,3,1414,7,1,0,0,1,0,0,0],"updatedAt":"2024-01-24T08:20:49.854199","xacc":0.9954545},"levelA":{"hitMargins":[0,0,2,1447,4,0,0,0,0,0,0,0],"updatedAt":"2024-01-18T10:27:20.433019","xacc":0.9989676},"levelD":{"hitMargins":[0,1,2,1739,1,1,0,0,0,0,0,0],"updatedAt":"2024-01-27T14:16:43.386517","xacc":0.9988819},"levelB":{"hitMargins":[0,0,4,1170,3,0,0,0,0,0,0,0],"updatedAt":"2024-01-20T05:04:58.526346","xacc":0.9985132}}},{"player":{"playerId":"346910010128859138","playerName":"! 화재"},"levelStats":{"levelC":{"hitMargins":[1,0,2,1428,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-23T01:49:31.052894","xacc":0.9990916},"levelA":{"hitMargins":[0,0,2,1449,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-16T01:23:30.157578","xacc":0.9993117},"levelD":{"hitMargins":[0,1,6,1734,3,0,0,0,0,0,0,0],"updatedAt":"2024-01-25T01:56:35.954081","xacc":0.9983658},"levelB":{"hitMargins":[0,4,8,1160,4,1,0,0,0,0,0,0],"updatedAt":"2024-01-20T02:05:20.850288","xacc":0.9949023}}},{"player":{"playerId":"758500956903178261","playerName":"센치"},"levelStats":{"levelC":{"hitMargins":[0,0,2,1426,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T19:03:02.966523","xacc":0.9993007},"levelA":{"hitMargins":[0,0,8,1443,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-17T16:31:28.848392","xacc":0.9982794},"levelD":{"hitMargins":[0,0,7,1735,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-27T14:30:39.201682","xacc":0.9987099},"levelB":{"hitMargins":[0,0,12,1156,8,1,0,0,0,0,0,0],"updatedAt":"2024-01-20T16:30:23.386909","xacc":0.9952421}}},{"player":{"playerId":"957777969517039627","playerName":"zsry"},"levelStats":{"levelC":{"hitMargins":[0,0,2,1426,1,1,0,0,0,0,0,0],"updatedAt":"2024-01-24T01:13:28.345538","xacc":0.9990559},"levelA":{"hitMargins":[0,2,11,1438,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-18T09:57:53.245832","xacc":0.9969374},"levelD":{"hitMargins":[0,0,0,1743,1,0,0,0,0,0,0,0],"updatedAt":"2024-01-27T11:41:27.024897","xacc":0.9998567},"levelB":{"hitMargins":[0,0,8,1159,8,2,0,0,0,0,0,0],"updatedAt":"2024-01-21T14:01:10.451025","xacc":0.995582}}},{"player":{"playerId":"759339957004664832","playerName":"DutJi"},"levelStats":{"levelC":{"hitMargins":[0,0,1,1424,5,0,0,0,0,0,0,0],"updatedAt":"2024-01-23T08:54:19.793172","xacc":0.9989511},"levelA":{"hitMargins":[0,4,7,1424,15,3,0,0,0,0,0,0],"updatedAt":"2024-01-16T04:15:34.723034","xacc":0.9933242},"levelD":{"hitMargins":[0,0,0,1742,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-26T10:41:20.46755","xacc":0.9997133},"levelB":{"hitMargins":[0,1,2,1167,7,0,0,0,0,0,0,0],"updatedAt":"2024-01-19T11:12:00.814927","xacc":0.9975786}}},{"player":{"playerId":"995307301156159508","playerName":"shinora"},"levelStats":{"levelC":{"hitMargins":[0,0,0,1430,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T16:11:30.951438","xacc":1},"levelA":{"hitMargins":[1,2,4,1439,7,1,0,0,0,0,0,0],"updatedAt":"2024-01-16T17:17:52.530475","xacc":0.9963205},"levelD":{"hitMargins":[0,0,4,1734,3,3,0,0,0,0,0,0],"updatedAt":"2024-01-25T14:58:08.860763","xacc":0.9979644},"levelB":{"hitMargins":[0,3,4,1161,7,2,0,0,0,0,0,0],"updatedAt":"2024-01-18T16:47:42.80376","xacc":0.9951147}}},{"player":{"playerId":"558259883506401291","playerName":"김몬호따엑기스"},"levelStats":{"levelC":{"hitMargins":[0,0,0,1430,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-24T02:10:03.842684","xacc":1},"levelA":{"hitMargins":[0,0,0,1453,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-16T12:59:48.648012","xacc":1},"levelD":{"hitMargins":[3,0,3,1729,8,4,0,0,0,0,0,0],"updatedAt":"2024-01-27T06:20:03.459728","xacc":0.9956783},"levelB":{"hitMargins":[0,1,10,1151,13,1,0,0,1,0,0,0],"updatedAt":"2024-01-19T15:34:04.886591","xacc":0.9932455}}},{"player":{"playerId":"548738772972339201","playerName":"HyungWon"},"levelStats":{"levelC":{"hitMargins":[0,0,1,1425,4,0,0,0,0,0,0,0],"updatedAt":"2024-01-24T11:41:52.936293","xacc":0.9991259},"levelA":{"hitMargins":[0,0,5,1442,6,0,0,0,0,0,0,0],"updatedAt":"2024-01-18T07:26:42.488684","xacc":0.9981074},"levelD":{"hitMargins":[0,6,11,1710,15,2,0,0,0,0,0,0],"updatedAt":"2024-01-27T09:09:11.730514","xacc":0.9935206},"levelB":{"hitMargins":[0,0,4,1164,9,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T03:49:35.354036","xacc":0.9972388}}},{"player":{"playerId":"772082851172712488","playerName":"띠아블"},"levelStats":{"levelC":{"hitMargins":[0,0,5,1411,6,8,0,0,0,0,0,0],"updatedAt":"2024-01-24T14:33:35.930841","xacc":0.9947203},"levelA":{"hitMargins":[0,1,10,1435,5,2,0,0,0,0,0,0],"updatedAt":"2024-01-18T12:58:17.946009","xacc":0.9961803},"levelD":{"hitMargins":[0,0,4,1735,4,1,0,0,0,0,0,0],"updatedAt":"2024-01-25T08:19:28.880285","xacc":0.9985092},"levelB":{"hitMargins":[0,0,2,1170,5,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T13:03:03.933759","xacc":0.9985132}}},{"player":{"playerId":"992255537968336936","playerName":"붉꽃"},"levelStats":{"levelC":{"hitMargins":[0,0,3,1425,1,1,0,0,0,0,0,0],"updatedAt":"2024-01-24T09:08:39.623818","xacc":0.9988811},"levelA":{"hitMargins":[1,1,2,1449,0,1,0,0,0,0,0,0],"updatedAt":"2024-01-17T13:42:50.941986","xacc":0.9982806},"levelD":{"hitMargins":[0,3,11,1724,4,2,0,0,0,0,0,0],"updatedAt":"2024-01-27T05:26:18.931186","xacc":0.9961296},"levelB":{"hitMargins":[1,5,8,1157,7,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T05:49:54.336382","xacc":0.9935908}}},{"player":{"playerId":"735080278413934674","playerName":"리하"},"levelStats":{"levelC":{"hitMargins":[0,0,7,1414,7,2,0,0,0,0,0,0],"updatedAt":"2024-01-22T05:38:29.604341","xacc":0.9967133},"levelA":{"hitMargins":[0,1,7,1435,7,3,0,0,0,0,0,0],"updatedAt":"2024-01-16T11:20:58.852695","xacc":0.9959394},"levelD":{"hitMargins":[1,6,3,1713,15,7,0,0,0,0,0,0],"updatedAt":"2024-01-25T04:17:53.341694","xacc":0.9924929},"levelB":{"hitMargins":[0,1,6,1155,15,0,0,0,0,0,0,0],"updatedAt":"2024-01-19T14:11:24.121237","xacc":0.9950297}}},{"player":{"playerId":"998543567767212103","playerName":"xiaoxiaoci"},"levelStats":{"levelC":{"hitMargins":[1,3,5,1417,3,2,0,0,0,0,0,0],"updatedAt":"2024-01-22T10:34:01.74288","xacc":0.9959469},"levelA":{"hitMargins":[2,1,6,1439,6,1,0,0,0,0,0,0],"updatedAt":"2024-01-17T12:30:26.063132","xacc":0.9960138},"levelD":{"hitMargins":[0,7,12,1708,13,4,0,0,0,0,0,0],"updatedAt":"2024-01-26T02:57:50.407347","xacc":0.9926319},"levelB":{"hitMargins":[0,4,12,1150,9,2,0,0,0,0,0,0],"updatedAt":"2024-01-21T07:32:20.599884","xacc":0.9924809}}},{"player":{"playerId":"497812512432193548","playerName":"nnuura"},"levelStats":{"levelC":{"hitMargins":[0,0,2,1423,5,0,0,0,0,0,0,0],"updatedAt":"2024-01-22T20:48:14.089526","xacc":0.9987762},"levelA":{"hitMargins":[0,0,5,1443,3,2,0,0,0,0,0,0],"updatedAt":"2024-01-16T21:13:06.02546","xacc":0.9977977},"levelD":{"hitMargins":[8,5,21,1689,20,7,0,0,2,0,0,0],"updatedAt":"2024-01-27T06:52:19.064097","xacc":0.9852454},"levelB":{"hitMargins":[2,2,10,1152,11,2,0,0,0,0,0,0],"updatedAt":"2024-01-20T22:09:50.072197","xacc":0.9921544}}},{"player":{"playerId":"802458820630282252","playerName":"김만식"},"levelStats":{"levelC":{"hitMargins":[0,0,1,1424,5,0,0,0,0,0,0,0],"updatedAt":"2024-01-22T16:50:24.275233","xacc":0.9989511},"levelA":{"hitMargins":[0,0,0,1453,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-17T01:31:01.909428","xacc":1},"levelD":{"hitMargins":[21,10,15,1673,18,17,0,0,11,0,0,0],"updatedAt":"2024-01-25T07:09:56.958159","xacc":0.9703966},"levelB":{"hitMargins":[0,3,9,1153,10,2,0,0,0,0,0,0],"updatedAt":"2024-01-21T14:56:22.712308","xacc":0.9934155}}},{"player":{"playerId":"1159488774410088470","playerName":"jate"},"levelStats":{"levelC":{"hitMargins":[0,0,1,1427,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-22T07:25:13.123408","xacc":0.9994755},"levelA":{"hitMargins":[0,0,0,1452,0,1,0,0,0,0,0,0],"updatedAt":"2024-01-18T08:54:22.624175","xacc":0.9995871},"levelD":{"hitMargins":[17,7,24,1670,15,17,0,0,11,4,0,0],"updatedAt":"2024-01-26T09:18:42.970647","xacc":0.9701133},"levelB":{"hitMargins":[0,3,16,1144,14,0,0,0,0,0,0,0],"updatedAt":"2024-01-20T03:57:55.478569","xacc":0.9920986}}},{"player":{"playerId":"409193331092881410","playerName":"무돌"},"levelStats":{"levelC":{"hitMargins":[0,1,9,1416,3,1,0,0,0,0,0,0],"updatedAt":"2024-01-23T00:24:03.952332","xacc":0.9970629},"levelA":{"hitMargins":[0,0,8,1444,1,0,0,0,0,0,0,0],"updatedAt":"2024-01-16T08:51:05.351555","xacc":0.9984515},"levelB":{"hitMargins":[0,1,15,1150,11,0,0,0,0,0,0,0],"updatedAt":"2024-01-21T02:22:47.81922","xacc":0.9939677}}},{"player":{"playerId":"839090788322508841","playerName":"ㅁㄴㅇㄹ"},"levelStats":{"levelC":{"hitMargins":[0,0,1,1428,1,0,0,0,0,0,0,0],"updatedAt":"2024-01-23T08:39:21.067822","xacc":0.9996504},"levelA":{"hitMargins":[1,2,14,1425,11,1,0,0,0,0,0,0],"updatedAt":"2024-01-18T12:18:44.755908","xacc":0.9939134},"levelB":{"hitMargins":[0,1,5,1154,16,1,0,0,0,0,0,0],"updatedAt":"2024-01-21T04:40:41.191774","xacc":0.9945199}}},{"player":{"playerId":"414822798406582272","playerName":"수직항력"},"levelStats":{"levelC":{"hitMargins":[0,2,9,1410,6,3,0,0,0,0,0,0],"updatedAt":"2024-01-22T05:38:04.602057","xacc":0.9952797},"levelA":{"hitMargins":[0,0,3,1446,4,0,0,0,0,0,0,0],"updatedAt":"2024-01-18T09:16:40.885543","xacc":0.9987956},"levelB":{"hitMargins":[0,2,14,1141,19,1,0,0,0,0,0,0],"updatedAt":"2024-01-21T10:30:17.779766","xacc":0.9914613}}},{"player":{"playerId":"901114146299469834","playerName":"Halleen"},"levelStats":{"levelC":{"hitMargins":[1,0,1,1426,3,0,0,0,0,0,0,0],"updatedAt":"2024-01-22T04:28:45.901722","xacc":0.9987422},"levelA":{"hitMargins":[0,0,5,1447,1,0,0,0,0,0,0,0],"updatedAt":"2024-01-16T04:31:47.382229","xacc":0.9989676},"levelB":{"hitMargins":[0,2,19,1121,31,4,0,0,0,0,0,0],"updatedAt":"2024-01-20T01:56:59.004627","xacc":0.9863212}}},{"player":{"playerId":"685697991213973537","playerName":"AeiL"},"levelStats":{"levelC":{"hitMargins":[1,4,3,1411,10,2,0,0,0,0,0,0],"updatedAt":"2024-01-24T14:20:32.521207","xacc":0.9946541},"levelA":{"hitMargins":[0,3,13,1419,10,8,0,0,0,0,0,0],"updatedAt":"2024-01-18T14:16:55.041377","xacc":0.9915003},"levelB":{"hitMargins":[0,3,16,1139,17,2,0,0,0,0,0,0],"updatedAt":"2024-01-21T14:27:29.451857","xacc":0.9904418}}},{"player":{"playerId":"884350978655137865","playerName":"fiyce"},"levelStats":{"levelC":{"hitMargins":[1,5,6,1404,13,2,0,0,0,0,0,0],"updatedAt":"2024-01-24T03:53:46.596209","xacc":0.9931866},"levelA":{"hitMargins":[1,1,4,1445,2,1,0,0,0,0,0,0],"updatedAt":"2024-01-18T06:22:12.375699","xacc":0.9975929},"levelB":{"hitMargins":[3,0,10,1132,24,9,0,0,2,0,0,0],"updatedAt":"2024-01-20T09:37:14.107361","xacc":0.9844915}}},{"player":{"playerId":"895450712920719390","playerName":"티모버프좀"},"levelStats":{"levelC":{"hitMargins":[11,11,15,1384,12,5,0,0,3,1,0,0],"updatedAt":"2024-01-24T13:24:04.640609","xacc":0.979785},"levelA":{"hitMargins":[0,0,3,1438,7,5,0,0,0,0,0,0],"updatedAt":"2024-01-18T05:49:58.687554","xacc":0.9962147},"levelB":{"hitMargins":[2,5,20,1134,16,0,0,0,2,0,0,0],"updatedAt":"2024-01-21T11:01:07.070758","xacc":0.9867684}}},{"player":{"playerId":"504996186487259157","playerName":"WillTRM"},"levelStats":{"levelC":{"hitMargins":[22,17,28,1351,10,9,0,0,15,2,0,0],"updatedAt":"2024-01-22T03:15:59.863675","xacc":0.9589409},"levelA":{"hitMargins":[1,3,11,1430,8,1,0,0,0,0,0,0],"updatedAt":"2024-01-17T03:08:35.652751","xacc":0.9945323},"levelB":{"hitMargins":[0,0,6,1166,3,2,0,0,0,0,0,0],"updatedAt":"2024-01-21T05:20:00.49654","xacc":0.9970688}}},{"player":{"playerId":"1051671844723367967","playerName":"Delectronic"},"levelStats":{"levelC":{"hitMargins":[1,3,2,1416,8,1,0,0,0,0,0,0],"updatedAt":"2024-01-22T12:43:42.910797","xacc":0.9960168},"levelA":{"hitMargins":[0,0,6,1435,12,0,0,0,0,0,0,0],"updatedAt":"2024-01-18T10:20:48.91272","xacc":0.9969029},"levelB":{"hitMargins":[21,14,23,1090,22,11,0,0,17,6,0,0],"updatedAt":"2024-01-21T03:30:10.330462","xacc":0.9451412}}},{"player":{"playerId":"764493716077281281","playerName":"김주형"},"levelStats":{"levelC":{"hitMargins":[18,10,10,1379,17,4,0,0,10,2,0,0],"updatedAt":"2024-01-22T09:01:47.772727","xacc":0.9713448},"levelA":{"hitMargins":[0,6,21,1417,9,0,0,0,0,0,0,0],"updatedAt":"2024-01-18T12:11:04.65156","xacc":0.9923607},"levelB":{"hitMargins":[2,10,34,1088,31,13,0,0,1,0,0,0],"updatedAt":"2024-01-21T14:34:13.738942","xacc":0.972307}}},{"player":{"playerId":"605778001157947414","playerName":"4my3b"},"levelStats":{"levelC":{"hitMargins":[3,6,7,1394,13,8,0,0,2,0,0,0],"updatedAt":"2024-01-22T05:21:47.231768","xacc":0.9875785},"levelA":{"hitMargins":[2,2,19,1421,7,3,0,0,1,0,0,0],"updatedAt":"2024-01-18T14:08:36.477942","xacc":0.9916838},"levelB":{"hitMargins":[9,16,27,1073,32,15,3,0,14,2,0,0],"updatedAt":"2024-01-21T14:17:52.717342","xacc":0.9505038}}},{"player":{"playerId":"922115407656149024","playerName":"ADTRE"},"levelStats":{"levelC":{"hitMargins":[2,2,3,1409,11,5,0,0,0,0,0,0],"updatedAt":"2024-01-24T06:09:58","xacc":0.9935056},"levelA":{"hitMargins":[0,3,14,1421,13,2,0,0,0,0,0,0],"updatedAt":"2024-01-18T07:42:23","xacc":0.99328977},"levelB":{"hitMargins":[36,37,45,996,44,24,0,0,31,7,0,0],"updatedAt":"2024-01-21T13:04:36.037649","xacc":0.8970082}}},{"player":{"playerId":"620132684831653898","playerName":"토리"},"levelStats":{"levelC":{"hitMargins":[94,47,42,1257,14,13,1,0,57,31,0,0],"updatedAt":"2024-01-21T15:25:22.979096","xacc":0.8624679},"levelA":{"hitMargins":[0,1,5,1445,1,1,0,0,0,0,0,0],"updatedAt":"2024-01-18T07:56:11.362402","xacc":0.9981418},"levelB":{"hitMargins":[25,17,43,1029,40,18,1,0,30,10,0,0],"updatedAt":"2024-01-21T14:21:45.330013","xacc":0.9154575}}},{"player":{"playerId":"657790131096387594","playerName":"smartowl"},"levelStats":{"levelC":{"hitMargins":[99,79,80,1112,31,30,0,0,98,28,0,0],"updatedAt":"2024-01-23T13:29:26.638838","xacc":0.8083815},"levelA":{"hitMargins":[0,4,13,1429,6,1,0,0,0,0,0,0],"updatedAt":"2024-01-18T14:50:53.404577","xacc":0.9946662},"levelB":{"hitMargins":[26,37,52,1017,34,16,0,0,21,4,0,0],"updatedAt":"2024-01-21T14:31:12.580876","xacc":0.9178956}}},{"player":{"playerId":"606927703626481700","playerName":"현권"},"levelStats":{"levelA":{"hitMargins":[0,0,3,1448,2,0,0,0,0,0,0,0],"updatedAt":"2024-01-18T11:47:10.416123","xacc":0.9991397},"levelB":{"hitMargins":[0,4,15,1143,15,0,0,0,0,0,0,0],"updatedAt":"2024-01-20T14:07:46.808371","xacc":0.9915888}}},{"player":{"playerId":"696826166925066340","playerName":"Matsum"},"levelStats":{"levelA":{"hitMargins":[0,1,5,1431,14,2,0,0,0,0,0,0],"updatedAt":"2024-01-17T20:53:25.420438","xacc":0.9954921},"levelB":{"hitMargins":[0,1,11,1155,10,0,0,0,0,0,0,0],"updatedAt":"2024-01-20T20:14:53.049519","xacc":0.9950297}}},{"player":{"playerId":"944540518333960203","playerName":"스티"},"levelStats":{"levelA":{"hitMargins":[0,0,1,1450,1,1,0,0,0,0,0,0],"updatedAt":"2024-01-17T08:05:21.073338","xacc":0.999243},"levelB":{"hitMargins":[3,3,10,1155,8,1,0,0,0,1,0,0],"updatedAt":"2024-01-21T03:55:12.628207","xacc":0.9912786}}},{"player":{"playerId":"536113170138398750","playerName":"Retr0"},"levelStats":{"levelA":{"hitMargins":[0,0,10,1433,9,1,0,0,0,0,0,0],"updatedAt":"2024-01-17T14:59:59","xacc":0.996318},"levelB":{"hitMargins":[0,0,16,1148,8,5,0,0,0,0,0,0],"updatedAt":"2024-01-21T13:50:52","xacc":0.99235344}}},{"player":{"playerId":"914336257339961356","playerName":"규페복제판"},"levelStats":{"levelA":{"hitMargins":[0,0,2,1446,4,1,0,0,0,0,0,0],"updatedAt":"2024-01-16T04:28:42.554694","xacc":0.9985547},"levelB":{"hitMargins":[5,6,18,1097,42,9,0,0,5,0,0,0],"updatedAt":"2024-01-19T07:48:50.53471","xacc":0.9720812}}},{"player":{"playerId":"411740500790345739","playerName":"xDxRax"},"levelStats":{"levelA":{"hitMargins":[0,2,15,1412,20,4,0,0,0,0,0,0],"updatedAt":"2024-01-17T14:49:57.732346","xacc":0.9915003},"levelB":{"hitMargins":[11,14,38,1068,34,11,0,0,12,3,0,0],"updatedAt":"2024-01-21T05:12:11.945357","xacc":0.952309}}},{"player":{"playerId":"469013119038128138","playerName":"파크"},"levelStats":{"levelA":{"hitMargins":[0,6,16,1416,10,5,0,0,0,0,0,0],"updatedAt":"2024-01-18T14:06:39.340025","xacc":0.9909841},"levelB":{"hitMargins":[29,16,32,1053,26,22,1,0,28,7,0,0],"updatedAt":"2024-01-21T12:16:19.205416","xacc":0.9206755}}},{"player":{"playerId":"814678270824939571","playerName":"346_Pomegranate"},"levelStats":{"levelA":{"hitMargins":[0,0,1,1451,0,1,0,0,0,0,0,0],"updatedAt":"2024-01-18T09:15:41.027055","xacc":0.999415},"levelB":{"hitMargins":[32,15,48,987,60,32,0,0,35,13,0,0],"updatedAt":"2024-01-20T16:20:54.83918","xacc":0.894599}}},{"player":{"playerId":"1004308977909256273","playerName":"지성"},"levelStats":{"levelA":{"hitMargins":[0,5,8,1422,15,3,0,0,0,0,0,0],"updatedAt":"2024-01-18T06:32:57.384713","xacc":0.9927391},"levelB":{"hitMargins":[42,22,43,1004,51,16,0,0,41,21,0,0],"updatedAt":"2024-01-21T04:15:11.266729","xacc":0.8855645}}},{"player":{"playerId":"447333460382842880","playerName":"Jongyeol"},"levelStats":{"levelA":{"hitMargins":[0,3,9,1430,7,4,0,0,0,0,0,0],"updatedAt":"2024-01-18T10:06:01.626698","xacc":0.9943565},"levelB":{"hitMargins":[39,29,41,946,57,46,2,0,58,6,0,0],"updatedAt":"2024-01-21T06:40:29.637153","xacc":0.864134}}},{"player":{"playerId":"679987249101668364","playerName":"CoinDreemurr"},"levelStats":{"levelA":{"hitMargins":[0,2,18,1423,7,3,0,0,0,0,0,0],"updatedAt":"2024-01-17T04:56:55.305159","xacc":0.9936339},"levelB":{"hitMargins":[53,37,71,942,43,24,3,0,60,19,0,0],"updatedAt":"2024-01-20T11:26:59.909005","xacc":0.8491214}}},{"player":{"playerId":"1020318623249743963","playerName":"lavalucky"},"levelStats":{"levelA":{"hitMargins":[0,5,13,1420,13,2,0,0,0,0,0,0],"updatedAt":"2024-01-16T09:46:24.845226","xacc":0.9926359},"levelB":{"hitMargins":[119,62,55,683,127,77,1,0,173,36,0,0],"updatedAt":"2024-01-19T09:59:51.668113","xacc":0.6744936}}},{"player":{"playerId":"734305073483481118","playerName":"마이스타"},"levelStats":{"levelA":{"hitMargins":[0,0,0,1453,0,0,0,0,0,0,0,0],"updatedAt":"2024-01-18T07:28:18.662532","xacc":1}}},{"player":{"playerId":"750264140563611718","playerName":"에바"},"levelStats":{"levelA":{"hitMargins":[0,0,2,1447,4,0,0,0,0,0,0,0],"updatedAt":"2024-01-16T08:00:01.442407","xacc":0.9989676}}},{"player":{"playerId":"495160970537336843","playerName":"유한"},"levelStats":{"levelA":{"hitMargins":[0,0,5,1444,4,0,0,0,0,0,0,0],"updatedAt":"2024-01-16T05:21:16.033853","xacc":0.9984515}}},{"player":{"playerId":"557902267722760193","playerName":"띵근"},"levelStats":{"levelA":{"hitMargins":[0,0,4,1444,4,1,0,0,0,0,0,0],"updatedAt":"2024-01-17T15:21:24.239708","xacc":0.9982106}}},{"player":{"playerId":"919539498533154866","playerName":"snoob"},"levelStats":{"levelA":{"hitMargins":[0,1,1,1444,7,0,0,0,0,0,0,0],"updatedAt":"2024-01-18T11:05:15","xacc":0.9982106}}},{"player":{"playerId":"898907957696294914","playerName":"LuKe"},"levelStats":{"levelA":{"hitMargins":[0,1,2,1442,6,2,0,0,0,0,0,0],"updatedAt":"2024-01-18T10:53:43.765719","xacc":0.9973847}}},{"player":{"playerId":"532845334775201792","playerName":"지우"},"levelStats":{"levelA":{"hitMargins":[0,1,13,1431,5,2,0,0,1,0,0,0],"updatedAt":"2024-01-16T12:05:58.031506","xacc":0.9949759}}},{"player":{"playerId":"308454626879864833","playerName":"LSJ0821"},"levelStats":{"levelA":{"hitMargins":[1,1,16,1428,8,0,0,0,0,0,0,0],"updatedAt":"2024-01-16T18:11:10.627157","xacc":0.9949106}}},{"player":{"playerId":"934816770353684552","playerName":"히히"},"levelStats":{"levelA":{"hitMargins":[4,2,5,1437,8,1,0,0,0,0,0,0],"updatedAt":"2024-01-17T12:12:27.678281","xacc":0.9943377}}},{"player":{"playerId":"676806511489712129","playerName":"khjjjj"},"levelStats":{"levelA":{"hitMargins":[0,5,10,1428,4,5,0,0,1,0,0,0],"updatedAt":"2024-01-16T12:36:21.008575","xacc":0.9927736}}},{"player":{"playerId":"454837100127453204","playerName":"PivoGuru🌙"},"levelStats":{"levelA":{"hitMargins":[3,3,11,1417,18,2,0,0,2,0,0,0],"updatedAt":"2024-01-18T11:58:46.137933","xacc":0.9899382}}},{"player":{"playerId":"423939831681515521","playerName":"ProjectFlea"},"levelStats":{"levelA":{"hitMargins":[7,6,11,1429,4,1,0,0,2,0,0,0],"updatedAt":"2024-01-18T14:12:26.699557","xacc":0.9893493}}},{"player":{"playerId":"749281935611920405","playerName":"최민준"},"levelStats":{"levelA":{"hitMargins":[2,2,18,1416,8,7,0,0,2,0,0,0],"updatedAt":"2024-01-17T05:13:04.474794","xacc":0.9893471}}},{"player":{"playerId":"621516130334539786","playerName":"유케이"},"levelStats":{"levelA":{"hitMargins":[0,8,18,1405,14,7,0,0,1,0,0,0],"updatedAt":"2024-01-17T15:24:55.753405","xacc":0.9876118}}},{"player":{"playerId":"660747182915452928","playerName":"jouseop75"},"levelStats":{"levelA":{"hitMargins":[2,6,13,1404,20,7,1,0,3,0,0,0],"updatedAt":"2024-01-18T06:43:18.101286","xacc":0.9852679}}},{"player":{"playerId":"616942838105636865","playerName":"현페"},"levelStats":{"levelA":{"hitMargins":[1,9,20,1385,25,14,0,0,0,0,0,0],"updatedAt":"2024-01-17T13:29:11.039385","xacc":0.9822215}}},{"player":{"playerId":"287780818934431748","playerName":"icethread"},"levelStats":{"levelA":{"hitMargins":[5,8,15,1398,19,9,1,0,4,0,0,0],"updatedAt":"2024-01-18T08:18:51.782679","xacc":0.9811515}}},{"player":{"playerId":"767365680772939796","playerName":"Getoutoftheway"},"levelStats":{"levelA":{"hitMargins":[4,8,16,1398,16,7,0,0,8,0,0,0],"updatedAt":"2024-01-18T06:16:32.280967","xacc":0.9806452}}},{"player":{"playerId":"540488143799844874","playerName":"애캔"},"levelStats":{"levelA":{"hitMargins":[6,15,22,1375,21,16,0,0,4,0,0,0],"updatedAt":"2024-01-18T09:35:11.123689","xacc":0.973852}}},{"player":{"playerId":"490681340832776202","playerName":"Remittal"},"levelStats":{"levelA":{"hitMargins":[121,70,55,1138,69,33,2,0,88,48,0,0],"updatedAt":"2024-01-17T01:57:39.353054","xacc":0.7985222}}},{"player":{"playerId":"687668618691084295","playerName":"미파"},"levelStats":{"levelA":{"hitMargins":[163,104,75,964,81,74,2,0,155,58,0,0],"updatedAt":"2024-01-15T23:34:32.245272","xacc":0.7071599}}},{"player":{"playerId":"952155219511365642","playerName":"최다현"},"levelStats":{"levelA":{"hitMargins":[27,8,15,658,30,14,1,0,728,21,0,0],"updatedAt":"2024-01-16T03:57:07.288987","xacc":0.4701398}}}]'
);

const AWCQ2RankingPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [lang, setLang] = useState('ko-KR');

  const t = (ko, en, cn) =>
    lang === 'ko-KR' || lang === 'ko' ? ko : lang === 'zh-CN' ? cn : en;

  useEffect(() => {
    const _lang = navigator.language;
    setLang(_lang);

    const now = Date.now();
    if (now < tabShowDate.levelB.getTime()) setCurrentTab(0);
    else if (now < tabShowDate.levelC.getTime()) setCurrentTab(1);
    else if (now < tabShowDate.levelD.getTime()) setCurrentTab(2);
    else setCurrentTab(3);
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
                rankData={q2Data}
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
