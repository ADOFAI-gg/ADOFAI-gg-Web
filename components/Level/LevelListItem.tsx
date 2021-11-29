import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Level } from '../../typings';
import Image from 'next/image';
import millify from 'millify';
import EmptyIcon from '@assets/tagIcons/empty.svg';
import NextLink from 'next/link';

type DetailAlign = 'left' | 'center';

const DetailsContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 12px;
  display: flex;
  transition: opacity 0.2s ease;
  opacity: 1;
`;

const DetailsContainerHovered = styled(DetailsContainer)`
  padding-top: 12px;
  padding-bottom: 12px;
  position: absolute;
  top: 0;
  opacity: 0;
`;

const DetailItemContainer = styled.div<{ align?: DetailAlign }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40px;
  text-align: ${({ align = 'left' }) => align};
`;

const DetailItemLabel = styled.div`
  font-size: 16px;
  font-weight: 300;
  opacity: 0.6;
`;

const DetailItemValue = styled.div`
  font-size: 20px;
  font-weight: 500;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
  margin-bottom: -10px;
  padding-bottom: 10px;
`;

const Container = styled.a`
  height: 72px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  transition: background-color 0.2s ease;
  text-decoration: none !important;

  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.2);
    ${DetailsContainer} {
      opacity: 0;
    }
    ${DetailsContainerHovered} {
      opacity: 1;
    }
  }
`;

const LevelListItemDetail: React.FC<
  React.HTMLAttributes<any> & {
    label: React.ReactNode;
    value: React.ReactNode;
    align?: DetailAlign;
  }
> = ({ label, align, value, ...props }) => {
  return (
    <DetailItemContainer align={align} {...props}>
      <DetailItemLabel>{label}</DetailItemLabel>
      <DetailItemValue>{value}</DetailItemValue>
    </DetailItemContainer>
  );
};

const LevelListItem: React.FC<{ level: Level }> = ({ level }) => {
  const { t } = useTranslation('level');

  return (
    <NextLink href='/levels/[id]' as={`/levels/${level.id}`} passHref>
      <Container>
        <Image
          width={42}
          height={42}
          alt=''
          src={require(`@assets/difficultyIcons/${level.difficulty}.svg`)}
        />
        <div style={{ flexGrow: 1, height: '100%', width: 0 }}>
          <DetailsContainer>
            <LevelListItemDetail
              style={{
                width: '36%',
                paddingRight: 12
              }}
              label={t('level')}
              value={level.title}
            />
            <LevelListItemDetail
              style={{
                width: '26%',
                paddingLeft: 12,
                paddingRight: 24
              }}
              label={t('creator')}
              value={level.creators.join(' & ')}
            />
            <LevelListItemDetail
              align='center'
              style={{
                width: '16%',
                paddingLeft: 24,
                paddingRight: 12
              }}
              label={t('bpm')}
              value={
                level.minBpm === level.maxBpm
                  ? level.minBpm
                  : `${level.minBpm} - ${level.maxBpm}`
              }
            />
            <LevelListItemDetail
              style={{
                width: '11%',
                paddingLeft: 12,
                paddingRight: 12
              }}
              label={t('tiles')}
              align='center'
              value={level.tiles}
            />
            <LevelListItemDetail
              style={{
                width: '11%'
              }}
              align='center'
              label={t('hearts')}
              value={millify(level.likes)}
            />
          </DetailsContainer>

          <DetailsContainerHovered>
            <LevelListItemDetail
              style={{
                width: 'calc(36% - 28px)',
                paddingRight: 12
              }}
              label={t('song')}
              value={level.song}
            />
            <LevelListItemDetail
              style={{
                width: 'calc(26% + 28px)',
                paddingLeft: 12
              }}
              label={t('artist')}
              value={level.artists.join(' & ')}
            />
            <LevelListItemDetail
              style={{
                paddingLeft: 24
              }}
              label={t('tags')}
              value={
                <div style={{ display: 'flex', gap: 5, marginTop: 2 }}>
                  {!level.tags.length && (
                    <span>
                      <Image src={EmptyIcon} alt='' width={25} height={25} />
                    </span>
                  )}
                  {level.tags.map((x, i) => {
                    let icon;
                    try {
                      icon = require(`@assets/tagIcons/${x.id}.svg`).default;
                    } catch (e: any) {
                      icon = null;
                    }
                    if (!icon) return null;
                    return (
                      <span key={i}>
                        <Image src={icon} alt='' width={25} height={25} />
                      </span>
                    );
                  })}
                </div>
              }
            />
          </DetailsContainerHovered>
        </div>
      </Container>
    </NextLink>
  );
};

export default LevelListItem;
