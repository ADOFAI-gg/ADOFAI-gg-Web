import React from 'react';
import Navbar from '@components/Layout/Navbar';
import Footer from '@components/Layout/Footer';
import styled from 'styled-components';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  padding-top: var(--header-height);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  width: 100%;
  padding: 24px 20px 30px;
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex-grow: 1;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1100px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Layout: React.FC = ({ children }) => {
  useTranslation(['level', 'tags', 'main', 'common', 'errors', 'search']);

  return (
    <Container>
      <Head>
        <title>Adofai.gg</title>
      </Head>

      <Navbar />

      <Main>
        <Content>{children}</Content>
      </Main>

      <Footer />
    </Container>
  );
};

export default Layout;
