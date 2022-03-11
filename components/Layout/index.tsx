import React from 'react';
import Navbar from '@components/Layout/Navbar';
import Footer from '@components/Layout/Footer';
import styled from 'styled-components';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  width: 100%;
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
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const routesToHideFooter = ['/login', '/signup'];

const Layout: React.FC = ({ children }) => {
  useTranslation(['level', 'tags', 'main', 'common', 'errors', 'search']);
  const router = useRouter();

  const isLevelInfoPage = React.useMemo(() => {
    return router.pathname === '/levels/[id]';
  }, [router.pathname]);

  return (
    <Container
      style={{ paddingTop: isLevelInfoPage ? 0 : 'var(--header-height)' }}
    >
      <Head>
        <title>Adofai.gg</title>
      </Head>

      <Navbar />

      <Main style={{ padding: isLevelInfoPage ? 0 : '24px 20px 30px' }}>
        <Content
          style={{
            maxWidth: isLevelInfoPage ? '100vw' : 1100
          }}
        >
          <div>{children}</div>
        </Content>
      </Main>

      {!routesToHideFooter.includes(router.pathname) && <Footer />}
    </Container>
  );
};

export default Layout;
