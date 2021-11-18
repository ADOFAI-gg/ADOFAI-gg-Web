import React from 'react';
import SectionTitle from '@components/SectionTitle';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  margin-top: 40px;
`;

const RecentLevelsSection: React.FC = () => {
  const { t } = useTranslation('main');

  return (
    <Container>
      <SectionTitle showMoreLink='/levels'>
        {t('sectionTitle.recentLevels')}
      </SectionTitle>
    </Container>
  );
};

export default RecentLevelsSection;
