import React from 'react';
import SectionTitle from '@components/SectionTitle';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import LevelListItem from '@components/Level/LevelListItem';
import { Level } from '../../../typings';

const Container = styled.div`
  margin-top: 40px;
`;

const lvl: Level = {
  title: '[ns]',
  minBpm: 180,
  maxBpm: 180,
  artists: ['Camellia'],
  creators: ['방금산싱싱한샌드위치'],
  hearts: 10000,
  song: '[ns]',
  tags: [
    {
      id: 11,
      name: '4분이상'
    },
    {
      id: 12,
      name: '개박'
    },
    {
      id: 13,
      name: '동시치기'
    },
    {
      id: 14,
      name: '질주'
    }
  ],
  tiles: 1638,
  difficulty: 10
};

const RecentLevelsSection: React.FC = () => {
  const { t } = useTranslation('main');

  return (
    <Container>
      <SectionTitle showMoreLink='/levels'>
        {t('sectionTitle.recentLevels')}
      </SectionTitle>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 12,
          gap: 10
        }}
      >
        <LevelListItem level={lvl} />
        <LevelListItem level={lvl} />
        <LevelListItem level={lvl} />
        <LevelListItem level={lvl} />
        <LevelListItem level={lvl} />
        <LevelListItem level={lvl} />
        <LevelListItem level={lvl} />
        <LevelListItem level={lvl} />
        <LevelListItem level={lvl} />
        <LevelListItem level={lvl} />
      </div>
    </Container>
  );
};

export default RecentLevelsSection;
