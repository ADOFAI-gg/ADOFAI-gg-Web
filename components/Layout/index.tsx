import React from 'react';
import Header from '@components/Layout/Header';
import styled from 'styled-components';
import Head from 'next/head';

const Container = styled.div`
  padding-top: var(--header-height);
`;

const Main = styled.main`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
`;

const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1100px;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <Head>
        <title>Adofai.gg</title>
      </Head>
      <Header />
      <Main>
        <Content>{children}</Content>
      </Main>
    </Container>
  );
};

export default Layout;
