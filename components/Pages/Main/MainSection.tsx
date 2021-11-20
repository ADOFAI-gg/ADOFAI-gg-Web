import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Logo from '@assets/logo.svg';
import InputField from '@components/InputField';
import { Trans, useTranslation } from 'react-i18next';
import SearchIcon from '@assets/icons/search.svg';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;

const Description = styled.div`
  padding-top: 15px;
  font-size: 25px;
  font-weight: 600;
  text-align: center;

  @media (max-width: 512px) {
    font-size: 20px;
  }

  & > a {
    color: #ffe76e;
  }
`;

const MainSection: React.FC = () => {
  const { t } = useTranslation('main');

  return (
    <Container>
      <Image alt='logo' src={Logo} />
      <Description>
        <Trans i18nKey='description' t={t}>
          <a
            rel='noreferrer'
            target='_blank'
            href='https://docs.google.com/spreadsheets/d/1PzLHfWmVWJHrBGnNSsLTsdH0ibdk0hB4MpKHET1nkpU/edit'
          >
            {{ link: 'Unofficial ADOFAI Forum' }}
          </a>
        </Trans>
      </Description>
      <InputField
        leftIcon={
          <Image
            alt=''
            onDragStart={(e) => e.preventDefault()}
            src={SearchIcon}
            width={17.5}
            height={18.79}
          />
        }
        containerProps={{
          style: { marginTop: 30, maxWidth: 700 }
        }}
        inputType='home'
        placeholder={t('searchPlaceholder')}
      />
    </Container>
  );
};

export default MainSection;
