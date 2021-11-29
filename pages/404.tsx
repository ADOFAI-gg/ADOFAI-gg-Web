import React from 'react';
import { NextPage } from 'next';
import NotFoundImage from '@assets/images/notFound.svg';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const NotFound: NextPage = () => {
  const { t } = useTranslation('errors');

  return (
    <div
      style={{
        background: '#fff',
        height: 'calc(100vh - var(--header-height) - calc(26px * 2))',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'column',
        color: '#000'
      }}
    >
      <Image
        src={NotFoundImage}
        alt=''
        onDragStart={(e) => e.preventDefault()}
      />
      <div style={{ marginTop: 36, fontWeight: 700, fontSize: 36 }}>
        {t('error', { code: '404' })}
      </div>
      <div style={{ fontSize: 28, fontWeight: 400 }}>{t('404')}</div>
    </div>
  );
};

export default NotFound;
