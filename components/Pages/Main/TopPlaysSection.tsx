import React from 'react';
import styled, { css } from 'styled-components';
import SectionTitle from '@components/SectionTitle';
import Skeleton from 'react-loading-skeleton';
import { api } from '../../../utils/api';
import useSWR from 'swr';
import { Play } from '../../../typings';

const Container = styled.div`
  padding-top: 40px;
`;

const PlayItemContainer = styled.div`
  width: 100%;
  padding-bottom: 56.25%;
  position: relative;
`;

const PlayItemContent = styled.div<{ background?: string }>`
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
          &::before {
            z-index: -1;
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
          }
        `
      : ''}
`;

const PlayTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const PlayItem: React.FC<{ play: Play }> = ({ play }) => {
  const youtubeIdRegex =
    /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
  const youtubeId = youtubeIdRegex.exec(play.url)?.[1];
  console.log(play, youtubeId);

  return (
    <div style={{ flexGrow: 1 }}>
      <PlayItemContainer>
        <PlayItemContent background={youtubeId}>
          <PlayTitle>{play.level.name}</PlayTitle>
        </PlayItemContent>
      </PlayItemContainer>
    </div>
  );
};

const PlaySkeleton: React.FC = () => {
  return (
    <div style={{ flexGrow: 1 }}>
      <PlayItemContainer>
        <PlayItemContent>
          <Skeleton width='100%' height='100%' />
        </PlayItemContent>
      </PlayItemContainer>
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
    fetcher
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
