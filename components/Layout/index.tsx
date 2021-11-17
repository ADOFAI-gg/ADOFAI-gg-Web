import React from 'react';
import Header from '@components/Layout/Header';
import styled from 'styled-components';
import Head from 'next/head';

const Container = styled.div`
  padding-top: var(--header-height);
`;

const Main = styled.main`
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1000px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <Head>
        <title>Adofai.gg</title>
      </Head>
      <Header />
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;
