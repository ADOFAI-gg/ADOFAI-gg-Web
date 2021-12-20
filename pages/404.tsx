import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import NotFoundImage from '@assets/images/notFound.svg';
import Image from 'next/image';

import { useTranslation } from 'react-i18next';

const NotFound: NextPage = () => {
  const { t } = useTranslation('errors');

  const Container = styled.div`
    background: #fff;
    height: calc(100vh - var(--header-height) - calc(26px * 2));
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    flex-direction: column;
    color: #000;
    padding: 32px;

    @media (max-width: 768px) {
      flex-direction: row;
      gap: 24px;
    }
  `;

  const TextContainer = styled.div`
    text-align: center;

    @media (max-width: 768px) {
      text-align: left;
    }
  `;

  return (
    <Container>
      <Image
        src={NotFoundImage}
        alt=''
        onDragStart={(e) => e.preventDefault()}
      />
      <TextContainer>
        <div style={{ marginTop: 36, fontWeight: 700, fontSize: 36 }}>
          {t('error', { code: '404' })}
        </div>

        <div style={{ fontSize: 28, fontWeight: 400 }}>{t('404')}</div>
      </TextContainer>
    </Container>
  );
};

export default NotFound;
