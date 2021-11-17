import React from 'react';
import SectionTitle from '@components/SectionTitle';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 40px;
`;

const RecentLevelsSection: React.FC = () => {
  return (
    <Container>
      <SectionTitle showMoreLink='/levels'>Recent Ranked Levels</SectionTitle>
    </Container>
  );
};

export default RecentLevelsSection;
