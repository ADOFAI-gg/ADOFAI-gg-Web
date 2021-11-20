import React from 'react';
import styled from 'styled-components';
import LogoImg from '@assets/logo.svg';
import NextLink from 'next/link';
import { useTranslation } from 'react-i18next';
import Menu from '@assets/icons/menu.svg';
import Image from 'next/image';

const Container = styled.div`
  background-color: rgba(26, 37, 51, 0.7);
  position: fixed;
  z-index: 99999;
  top: 0;
  display: flex;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  backdrop-filter: blur(4px);

  width: 100%;
  height: var(--header-height);
`;

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

const Actions = {
  Container: styled.div`
    display: flex;
    gap: 24px;
  `,
  Item: styled.div<{ active?: boolean }>`
    font-size: 20px;
    font-weight: 400;
    opacity: ${({ active }) => (active ? 1 : 0.6)};
    transition: opacity 0.2s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
      opacity: 1;
    }
  `,
  MenuIcon: styled.div`
    width: 14px;
    height: 13px;
    background: url(${Menu.src}) no-repeat center;
    background-size: contain;
  `
};

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <NextLink href='/' passHref>
        <a>
          <Image alt='' height={20} width={140} src={LogoImg} />
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

      <div style={{ flexGrow: 1 }} />

      <Actions.Container>
        <Actions.Item>{t('header.menu.signIn')}</Actions.Item>
        {/*<Actions.Item></Actions.Item>*/}

        <Actions.Item>
          <Actions.MenuIcon />
        </Actions.Item>
      </Actions.Container>
    </Container>
  );
};

export default Navbar;
