import React from 'react';
import Navbar from '@components/Layout/Navbar';
import Footer from '@components/Layout/Footer';
import styled from 'styled-components';
import Head from 'next/head';

const Container = styled.div`
  padding-top: var(--header-height);
`;

const Main = styled.main`
  width: 100%;
  padding: 20px;
  padding-bottom: 30px;
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

      <Navbar />

      <Main>
        <Content>{children}</Content>
      </Main>

      <Footer />
    </Container>
  );
};

export default Layout;
