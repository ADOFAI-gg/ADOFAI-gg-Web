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
    position: relative;
    color: #ffe76e;
    text-decoration: none;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 1.5px;
      bottom: 0;
      left: 0;
      background-color: #ffe76e;
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
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
            width={14.99}
            height={15.99}
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
