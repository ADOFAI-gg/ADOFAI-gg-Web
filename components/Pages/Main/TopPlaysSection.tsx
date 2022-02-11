import React from 'react';
import styled, { css } from 'styled-components';
import SectionTitle from '@components/SectionTitle';
import Skeleton from 'react-loading-skeleton';
import { api } from '../../../utils/api';
import useSWR from 'swr';
import { Level, Play } from '../../../typings';
import Image from 'next/image';
import AccuracyIcon from '@assets/icons/accuracy.svg';
import SpeedIcon from '@assets/icons/speed.svg';
import PPIcon from '@assets/icons/pp.svg';
import { useTranslation } from 'react-i18next';
import NextLink from 'next/link';

const Container = styled.div`
  padding-top: 40px;
`;

const PlayItemBackgroundContainer = styled.div`
  width: 100%;
  padding-bottom: 56.25%;
  position: relative;
  transition: transform 0.2s ease;
`;

const PlayItemContainer = styled.div`
  flex-grow: 1;
  display: 'flex';
  flex-direction: 'column';
  width: 0;
  transition: background-color 0.2s ease;
  border-radius: 12px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  & > div {
    transition: transform 0.2s ease;
  }}

  &:hover > div {
    transform: scale(0.95);
  }
`;

const PlayItemBackground = styled.a<{ background?: string }>`
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
          justify-content: center;
          align-items: center;
        `
      : ''}
`;

const PlayTitle = styled.div`
  font-size: 24px;
  font-weight: 800;
`;

const PlayLevelInfo = styled.a`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  gap: 6px;
  justify-content: center;
`;

const PlayLevelDetails = styled.div`
  display: flex;
  opacity: 0.6;
  width: 100%;
`;

const PlayLevelDetail = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 6px;
  justify-content: center;
`;

const PlayLevelDetailLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
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
    <PlayItemContainer>
      <div>
        <PlayItemBackgroundContainer>
          <PlayItemBackground
            rel='noreferrer'
            target='_blank'
            href={play.url}
            background={youtubeId}
          />
        </PlayItemBackgroundContainer>
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
          <NextLink href='/levels/[id]' as={`/levels/${level?.id}`} passHref>
            <PlayLevelInfo>
              <div>
                <Image
                  alt=''
                  src={require(`@assets/difficultyIcons/${level?.difficulty}.svg`)}
                  width={24}
                  height={24}
                />
              </div>
              <div
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}
              >
                {level?.artists.join(' & ')} - {level?.title}
              </div>
            </PlayLevelInfo>
          </NextLink>

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
    </PlayItemContainer>
  );
};

const PlaySkeleton: React.FC = () => {
  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <PlayItemBackgroundContainer>
        <PlayItemBackground>
          <Skeleton width='100%' height='100%' />
        </PlayItemBackground>
      </PlayItemBackgroundContainer>
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
  const { t } = useTranslation('main');

  return (
    <Container>
      <SectionTitle showMoreLink='/ranking'>
        {t('sectionTitle.topPlays')}
      </SectionTitle>

      <div style={{ marginTop: 16, display: 'flex', gap: 20 }}>
        <React.Suspense fallback={<PlayLoading />}>
          <PlaysView />
        </React.Suspense>
      </div>
    </Container>
  );
};

export default TopPlaysSection;
