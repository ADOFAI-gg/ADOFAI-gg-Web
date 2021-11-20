import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

const Title = styled.h1`
  flex-grow: 1;
  margin: 0;
  font-size: 28px;
`;

const ShowMoreLink = styled.a`
  font-size: 20px;
  font-weight: 500;
`;

const SectionTitle: React.FC<{ showMoreLink?: string }> = ({
  children,
  showMoreLink
}) => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <div>
        <Title>{children}</Title>
      </div>

      {showMoreLink && (
        <Link passHref href={showMoreLink}>
          <ShowMoreLink>{t('showMore')} ▹</ShowMoreLink>
        </Link>
      )}
    </Container>
  );
};

export default SectionTitle;
