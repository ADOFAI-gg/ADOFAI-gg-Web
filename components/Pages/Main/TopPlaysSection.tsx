import React from 'react';
import styled, { css } from 'styled-components';
import SectionTitle from '@components/SectionTitle';
import Skeleton from 'react-loading-skeleton';
import { api } from '../../../utils/api';
import useSWR from 'swr';
import { Level, Play } from '../../../typings';
import Image from 'next/image';
import AccuracyIcon from '@assets/otherIcons/accuracy.svg';
import SpeedIcon from '@assets/otherIcons/speed.svg';
import PPIcon from '@assets/otherIcons/pp.svg';

const Container = styled.div`
  padding-top: 40px;
`;

const PlayItemContainer = styled.div`
  width: 100%;
  padding-bottom: 56.25%;
  position: relative;
`;

const PlayItemBackground = styled.div<{ background?: string }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 10px;
  overflow: hidden;
  ${({ background }) =>
    background
      ? css`
          background: url('https://i.ytimg.com/vi/${background}/original.jpg')
            center;
          background-size: cover;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: -2;
          justify-content: center;
          align-items: center;
        `
      : ''}
`;

const PlayTitle = styled.div`
  font-size: 24px;
  font-weight: 800;
`;

const PlayLevelInfo = styled.div`
  font-size: 16px;
  font-weight: 500;
  display: flex;
  gap: 6px;
`;

const PlayLevelDetails = styled.div`
  display: flex;
  gap: 24px;
`;

const PlayLevelDetail = styled.div`
  display: flex;
  gap: 6px;
`;

const PlayLevelDetailLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const itemFetcher = (url: string) => api.get(url).then((x) => x.data);

const PlayItem: React.FC<{ play: Play }> = ({ play }) => {
  const youtubeIdRegex =
    /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
  const youtubeId = youtubeIdRegex.exec(play.url)?.[1];

  const { data: level } = useSWR<Level>(
    `/levels/${play.level.id}`,
    itemFetcher,
    {
      suspense: true
    }
  );

  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        width: 0
      }}
    >
      <PlayItemContainer>
        <PlayItemBackground background={youtubeId} />
      </PlayItemContainer>
      <div
        style={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          alignItems: 'center'
        }}
      >
        <PlayTitle>{play.player.name}</PlayTitle>
        <PlayLevelInfo>
          <div>
            <Image
              alt=''
              src={require(`@assets/difficultyIcons/${level?.difficulty}.svg`)}
              width={24}
              height={24}
            />
          </div>
          <div>
            {level?.artists.join(' & ')} - {level?.title}
          </div>
        </PlayLevelInfo>
        <PlayLevelDetails>
          <PlayLevelDetail>
            <Image src={AccuracyIcon} width={16} height={16} alt='Accuracy' />
            <PlayLevelDetailLabel>
              {play.rawAccuracy.toFixed(2)}%
            </PlayLevelDetailLabel>
          </PlayLevelDetail>
          <PlayLevelDetail>
            <Image src={SpeedIcon} width={16} height={12.92} alt='Speed' />
            <PlayLevelDetailLabel>
              {(play.speed / 100).toFixed(1)}X
            </PlayLevelDetailLabel>
          </PlayLevelDetail>
          <PlayLevelDetail>
            <Image src={PPIcon} width={10.67} height={16} alt='PP' />
            <PlayLevelDetailLabel>
              {play.playPoint.toFixed(0)} PP
            </PlayLevelDetailLabel>
          </PlayLevelDetail>
        </PlayLevelDetails>
      </div>
    </div>
  );
};

const PlaySkeleton: React.FC = () => {
  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <PlayItemContainer>
        <PlayItemBackground>
          <Skeleton width='100%' height='100%' />
        </PlayItemBackground>
      </PlayItemContainer>
      <div
        style={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 5
        }}
      >
        <div style={{ width: '70%' }}>
          <Skeleton />
        </div>
        <div
          style={{
            width: '70%',
            display: 'flex',
            gap: 6,
            alignItems: 'center'
          }}
        >
          <Skeleton circle width={30} height={30} />
          <div style={{ flexGrow: 1 }}>
            <Skeleton />
          </div>
        </div>
        <div
          style={{
            width: '80%',
            display: 'flex',
            gap: 6,
            alignItems: 'center'
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <Skeleton />
          </div>
          <div style={{ flexGrow: 1 }}>
            <Skeleton />
          </div>
          <div style={{ flexGrow: 1 }}>
            <Skeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayLoading: React.FC = () => {
  return (
    <>
      <PlaySkeleton />
      <PlaySkeleton />
      <PlaySkeleton />
    </>
  );
};

const fetcher = (url: string) => api.get(url).then((res) => res.data.results);

const PlaysView: React.FC = () => {
  const { data } = useSWR<Play[]>(
    '/playLogs?offset=0&amount=3&sort=PP_DESC',
    fetcher,
    {
      suspense: true
    }
  );

  return (
    <>
      {data?.map((x, i) => (
        <PlayItem key={i} play={x} />
      ))}
    </>
  );
};

const TopPlaysSection: React.FC = () => {
  return (
    <Container>
      <SectionTitle showMoreLink='/ranking'>Top Plays</SectionTitle>

      <div style={{ marginTop: 16, display: 'flex', gap: 20 }}>
        <React.Suspense fallback={<PlayLoading />}>
          <PlaysView />
        </React.Suspense>
      </div>
    </Container>
  );
};

export default TopPlaysSection;
