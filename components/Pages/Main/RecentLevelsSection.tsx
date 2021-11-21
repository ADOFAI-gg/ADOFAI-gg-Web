import React from 'react';
import SectionTitle from '@components/SectionTitle';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import LevelListItem from '@components/Level/LevelListItem';
import { Level } from '../../../typings';
import Skeleton from 'react-loading-skeleton';
import { api } from '../../../utils/api';
import useSWR from 'swr';

const Container = styled.div`
  margin-top: 40px;
`;

const fetcher = (url: string) => api.get(url).then((x) => x.data.results);

const LevelList: React.FC = () => {
  const { data: levels } = useSWR<Level[]>(
    '/levels?offset=0&amount=10&sort=RECENT_DESC',
    fetcher,
    {
      suspense: true
    }
  );

  return (
    <>
      {levels?.map((x, i) => (
        <LevelListItem key={i} level={x} />
      ))}
    </>
  );
};

const LevelListLoading: React.FC = () => (
  <>
    <Skeleton height={72} />
    <Skeleton height={72} />
    <Skeleton height={72} />
    <Skeleton height={72} />
    <Skeleton height={72} />
    <Skeleton height={72} />
    <Skeleton height={72} />
    <Skeleton height={72} />
    <Skeleton height={72} />
    <Skeleton height={72} />
  </>
);

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
        <React.Suspense fallback={<LevelListLoading />}>
          <LevelList />
        </React.Suspense>
      </div>
    </Container>
  );
};

export default RecentLevelsSection;
