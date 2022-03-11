import React from 'react';
import { NextPage } from 'next';
import { Level, User } from '../../../typings';
import { api } from '../../../utils/api';
import styled from 'styled-components';
import SteamIcon from '@assets/icons/steam.svg';
import DownloadIcon from '@assets/icons/download.svg';
import { faker } from '@faker-js/faker';
import Image from 'next/image';

const ImageArea = styled.div<{ thumbnail: string }>`
  padding-top: var(--header-height);
  width: 100%;
  position: relative;
  padding-left: 20px;
  padding-right: 20px;

  &::before {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    content: '';
    background-size: cover;
    background-position: center;
    background-image: url('${({ thumbnail }) => thumbnail}');
    z-index: -1;
    filter: brightness(0.6);
  }
`;

const ImageBottomArea = styled.div`
  margin-top: 24px;
  background: rgba(0, 2, 15, 0.6);
  padding: 20px 26px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  display: flex;
  gap: 18px;
  align-items: flex-end;
  overflow: hidden;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
  @supports (backdrop-filter: none) {
    backdrop-filter: blur(16px);
    background: rgba(0, 2, 15, 0.4);
  }
`;

const MetaItem: React.FC<{ label: React.ReactNode }> = ({
  label,
  children
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div
        style={{
          fontSize: 16,
          color: 'rgba(255, 255, 255, 0.8)',
          fontWeight: 300
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 28 }}>{children}</div>
    </div>
  );
};

const IconButton = styled.a<{ src: string }>`
  background-image: url('${({ src }) => src}');

  width: 36px;
  height: 36px;
  cursor: pointer;
  transition: transform ease 0.2s;

  &:hover {
    transform: scale(0.9);
  }
`;

const HorizontalUserListContainer = styled.div`
  font-size: 24px;
  font-weight: 400;
  display: flex;
  gap: 56px;
`;

const MetadataArea = styled.div`
  display: flex;
  gap: 30px;
  @media (max-width: 1023px) {
    flex-direction: column-reverse;
  }
`;

const VideoArea = styled.div`
  flex-grow: 1;
  border-radius: 16px;
  overflow: hidden;
`;

const LevelInfo: NextPage<{ level: Level | null }> = ({ level }) => {
  const videoId = React.useMemo(() => {
    if (!level?.video) return '';
    const url = new URL(level.video);
    if (url.hostname === 'youtu.be') {
      return url.pathname.slice(1);
    } else if (
      /^(www)?\.youtube\.com$/.test(url.hostname) &&
      url.pathname === '/watch'
    ) {
      return new URLSearchParams(url.search.slice(1)).get('v')!;
    }
    return '';
  }, [level?.video]);

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(level);
    }
  }, [level]);

  const difficultyIcon = React.useMemo(() => {
    if (!level) return '';
    try {
      return require(`@assets/difficultyIcons/${level.difficulty}.svg`);
    } catch {
      return '';
    }
  }, [level]);

  return (
    <div style={{ paddingBottom: 30 }}>
      {level ? (
        <>
          <ImageArea
            thumbnail={`https://i.ytimg.com/vi/${videoId}/original.jpg`}
          >
            <div
              style={{
                maxWidth: 1100,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 40,
                width: '100%'
              }}
            >
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  textShadow: '0px 0px 6px rgba(0, 0, 0, 0.8)',
                  wordBreak: 'break-all'
                }}
              >
                {level.title}
              </div>
              <ImageBottomArea>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                >
                  <HorizontalUserListContainer>
                    <div style={{ width: 98 }}>Level by</div>
                    <div>listlistlist</div>
                  </HorizontalUserListContainer>
                  <HorizontalUserListContainer>
                    <div style={{ width: 98 }}>Music by</div>
                    <div>listlistlist</div>
                  </HorizontalUserListContainer>
                </div>
                <div style={{ flexGrow: 1 }} />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 18
                  }}
                >
                  {level.workshop && (
                    <IconButton
                      href={level.workshop}
                      src={SteamIcon.src}
                      target='_blank'
                      rel='noreferrer'
                    />
                  )}
                  <IconButton
                    src={DownloadIcon.src}
                    href={level.download}
                    target='_blank'
                    rel='noreferrer'
                  />
                </div>
              </ImageBottomArea>
            </div>
          </ImageArea>
          <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: 24 }}>
            <div
              style={{
                maxWidth: 1100,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 40,
                width: '100%'
              }}
            >
              <MetadataArea>
                <VideoArea>
                  <div
                    style={{
                      position: 'relative',
                      paddingTop: '56.25%'
                    }}
                  >
                    <iframe
                      width='100%'
                      height='100%'
                      src={`https://www.youtube.com/embed/${videoId}`}
                      frameBorder='0'
                      style={{ position: 'absolute', left: 0, top: 0 }}
                    />
                  </div>
                </VideoArea>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
                >
                  <div style={{ display: 'flex', gap: 24 }}>
                    <MetaItem label='Lv.'>
                      <Image
                        width={28}
                        height={28}
                        alt=''
                        src={difficultyIcon}
                      />
                    </MetaItem>
                    <MetaItem label='Song Length'>1 min or less</MetaItem>
                  </div>
                  <div style={{ display: 'flex', gap: 24 }}>
                    <MetaItem label='BPM'>
                      {level.minBpm === level.maxBpm
                        ? level.minBpm
                        : `${level.minBpm} - ${level.maxBpm}`}
                    </MetaItem>
                    <MetaItem label='Tiles'>
                      {level.tiles.toLocaleString()}
                    </MetaItem>
                  </div>
                  <div style={{ display: 'flex', gap: 24 }}>
                    <MetaItem label='Tags'>test</MetaItem>
                  </div>
                  <div style={{ flexGrow: 1 }} />
                  test
                </div>
              </MetadataArea>
            </div>
          </div>
        </>
      ) : (
        <div>not found</div>
      )}
    </div>
  );
};

const generateFakeUsers = (count: number): User[] => {
  return new Array(count).fill(0).map(() => {
    return {
      name: faker.name.findName(),
      id: faker.datatype.uuid(),
      avatar: faker.image.avatar(),
      banner: faker.image.image(1280, 720)
    };
  });
};

LevelInfo.getInitialProps = async (ctx) => {
  const lvl = await api
    .get(`/levels/${ctx.query.id}`)
    .then((x) => x.data)
    .catch(() => null);

  return {
    level: {
      ...lvl,
      creators: generateFakeUsers(10),
      artists: generateFakeUsers(10)
    }
  };
};

export default LevelInfo;
