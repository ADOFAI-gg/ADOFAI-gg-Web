import React, { useEffect, useState } from 'react';
import SectionTitle from '../../components/global/SectionTitle';
import styled, { css } from 'styled-components';
import axios from 'axios';

const API_BASE_URL = 'https://2024-awc.adofai.gg/';

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

const RankingItemSkeleton = ({
  rank,
  showCutoffLineBottom,
  cutoffLineText
}) => (
  <RankingItemSkeletonBox
    $showCutoffLineBottom={showCutoffLineBottom}
    $cutoffLineText={cutoffLineText}
  >
    <RankingItemSkeletonContent>#{rank}</RankingItemSkeletonContent>
  </RankingItemSkeletonBox>
);

const AWCQ1RankingPage = () => {
  /** 0: 모두 보기, 1: 그룹 A, 2: 그룹 B */
  const [currentTab, setCurrentTab] = useState(0);
  const [lang, setLang] = useState('ko-KR');

  const [groupAData, setGroupAData] = useState([]);
  const [groupBData, setGroupBData] = useState([]);
  const [groupASize, setGroupASize] = useState(0);
  const [groupBSize, setGroupBSize] = useState(0);

  const groupACutoffLine = (groupASize / (groupASize + groupBSize)) * 100;
  const groupBCutoffLine = (groupBSize / (groupASize + groupBSize)) * 100;
  const isCutoffLineNotinteger =
    groupACutoffLine % 1 !== 0 || groupBCutoffLine % 1 !== 0;

  const t = (ko, en, cn) =>
    lang === 'ko-KR' ? ko : lang === 'zh-CN' ? cn : en;
  useEffect(() => {
    const _lang = navigator.language;
    setLang(_lang);
  }, []);

  useEffect(() => {
    // /measure/rank/ -> 통계 (그룹 사이트)
    // /measure/rank/a -> 그룹 A 데이터
    // /measure/rank/b -> 그룹 B 데이터

    const fetchData = async () => {
      try {
        const groupARes = await axios.get(
          `${API_BASE_URL}measure/rank/a?limit=200`
        );
        const groupBRes = await axios.get(
          `${API_BASE_URL}measure/rank/b?limit=200`
        );

        setGroupAData(groupARes.data.data);
        setGroupBData(groupBRes.data.data);

        setGroupASize(groupARes.data.data.length);
        setGroupBSize(groupBRes.data.data.length);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  const GroupSkeleton = ({ cutline, rankOffset }) => {
    const skeletonCount = Math.floor(cutline) - rankOffset;
    if (skeletonCount <= 0) {
      return null;
    }

    return [...Array(skeletonCount)].map((_, i) => (
      <RankingItemSkeleton
        rank={rankOffset + i + 1}
        showCutoffLineBottom={rankOffset + i + 1 === Math.floor(cutline)}
        cutoffLineText={t('커트라인', 'Passing Line', '晋级线')}
      />
    ));
  };

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
        {groupASize + groupBSize < 186 && (
          <Note>
            <NoteHeader>
              {RedWarningIcon}
              {t('참고', 'Note', '注意')}
            </NoteHeader>
            {t(
              `아직 모든 참가자가 기록을 제출하지 않았습니다. 생존자 인원은
            비례배분에 따라 결정되기 때문에, 그룹 인원에 따라 커트라인이 변동될 수
            있습니다. 화면에 표시되는 커트라인은 현재 그룹 인원으로 계산된
            값이므로 부정확할 수 있습니다.`,
              `Not every participant have submitted their records yet. Since # of
            survivors is decided by percentage, the minimum accuracy for
            qualification may change. Current minimum accuracy in this page may be
            inaccurate due to its calculation being based on each group's size.`,
              '并非所有参赛者都上传了他们的记录。由于晋级人数根据百分比决定，入围的最低精准度可能会发生改变。此页面目前的最低精准度可能不准确，因为精准度的计算基于各个组的规模。'
            )}
          </Note>
        )}
        {isCutoffLineNotinteger && groupASize + groupBSize !== 0 && (
          <Note>
            <NoteHeader>
              {RedWarningIcon}
              {t('참고', 'Note', '注意')}
            </NoteHeader>
            {t(
              `비례 분배 결과가 정수로 나누어떨어지지 않아 규정에 따라 커트라인 밖의
            추가 생존자가 한 명 발생할 수 있습니다!`,
              `There might be 1 additional survivor due to the regulations, since
              surviving percentage of participants' count isn't an integer!`,
              '由于参赛人数的晋级百分比不是整数，因此根据规定可能会增加1名晋级参赛者！'
            )}
          </Note>
        )}

        {currentTab === 0 && (
          <Row2>
            <div>
              <RankSectionTitle
                additional={`${groupASize}${t('명', ' players', '名玩家')}`}
              >
                {t('그룹 A', 'Group A', 'A组')}
              </RankSectionTitle>

              {groupAData.map((a, i) => (
                <RankingItemFrame
                  playerName={a.player.playerName}
                  rank={i + 1}
                  showCutoffLineBottom={i + 1 === Math.floor(groupACutoffLine)}
                  key={a.player.playerId}
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

              {groupASize !== 0 &&
                groupAData.length < Math.floor(groupACutoffLine) && (
                  <GroupSkeleton
                    cutline={groupACutoffLine}
                    rankOffset={groupAData.length}
                  />
                )}
            </div>

            <div>
              <RankSectionTitle
                additional={`${groupBSize}${t('명', ' players', '名玩家')}`}
              >
                {t('그룹 B', 'Group B', 'B组')}
              </RankSectionTitle>

              {groupBData.map((a, i) => (
                <RankingItemFrame
                  playerName={a.player.playerName}
                  rank={i + 1}
                  showCutoffLineBottom={i + 1 === Math.floor(groupBCutoffLine)}
                  cutoffLineText={t('커트라인', 'Passing Line', '晋级线')}
                  key={a.player.playerId}
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

              {groupBSize !== 0 &&
                groupBData.length < Math.floor(groupBCutoffLine) && (
                  <GroupSkeleton
                    cutline={groupBCutoffLine}
                    rankOffset={groupBData.length}
                  />
                )}
            </div>
          </Row2>
        )}

        {/* ----------------------------------------------------------------------- */}

        {currentTab === 1 && (
          <div>
            <RankSectionTitle
              additional={`${groupASize}${t('명', ' players', '名玩家')}`}
            >
              {t('그룹 A', 'Group A', 'A组')}
            </RankSectionTitle>

            {groupAData.map((a, i) => (
              <RankingItemFrame
                playerName={a.player.playerName}
                rank={i + 1}
                showCutoffLineBottom={i + 1 === Math.floor(groupACutoffLine)}
                cutoffLineText={t('커트라인', 'Passing Line', '晋级线')}
                key={a.player.playerId}
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

            {groupASize !== 0 &&
              groupAData.length < Math.floor(groupACutoffLine) && (
                <GroupSkeleton
                  cutline={groupACutoffLine}
                  rankOffset={groupAData.length}
                />
              )}
          </div>
        )}

        {currentTab === 2 && (
          <div>
            <RankSectionTitle
              additional={`${groupBSize}${t('명', ' players', '名玩家')}`}
            >
              {t('그룹 B', 'Group B', 'B组')}
            </RankSectionTitle>

            {groupBData.map((a, i) => (
              <RankingItemFrame
                playerName={a.player.playerName}
                rank={i + 1}
                showCutoffLineBottom={i + 1 === Math.floor(groupBCutoffLine)}
                cutoffLineText={t('커트라인', 'Passing Line', '晋级线')}
                key={a.player.playerId}
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

            {groupBSize !== 0 &&
              groupBData.length < Math.floor(groupBCutoffLine) && (
                <GroupSkeleton
                  cutline={groupBCutoffLine}
                  rankOffset={groupBData.length}
                />
              )}
          </div>
        )}
      </Wrapper>
    </main>
  );
};

export default AWCQ1RankingPage;
