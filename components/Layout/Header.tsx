import React from 'react';
import styled from 'styled-components';
import LogoImage from '@assets/logo.svg';
import NextLink from 'next/link';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  background-color: rgba(26, 37, 51, 0.7);
  position: fixed;
  z-index: 99999;
  top: 0;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;

  width: 100%;
  height: var(--header-height);
`;

const Logo = {
  Image: styled.img`
    height: 20px;
  `
};

const Link = {
  Container: styled.div`
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  `,
  Item: styled.a`
    pointer-events: auto;
    font-size: 20px;
    padding-left: 20px;
    padding-right: 20px;
    text-decoration: none;
    color: #fff;
  `
};

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <NextLink href='/' passHref>
        <a>
          <Logo.Image src={LogoImage.src} />
        </a>
      </NextLink>
      <Link.Container>
        <NextLink href='/levels' passHref>
          <Link.Item>{t('header.links.levels')}</Link.Item>
        </NextLink>
        <NextLink href='/ranking' passHref>
          <Link.Item>{t('header.links.ranking')}</Link.Item>
        </NextLink>
      </Link.Container>
    </Container>
  );
};

export default Header;
