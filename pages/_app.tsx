import '../styles/globals.scss';
import React from 'react';
import type { AppProps } from 'next/app';
import Layout from '@components/Layout';
import App from 'next/app';
import { initI18n } from '../utils/i18n';
import { I18nextProvider } from 'react-i18next';

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = pageProps;

  const i18n = React.useMemo(() => initI18n(locale), [locale]);

  return (
    <I18nextProvider i18n={i18n}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </I18nextProvider>
  );
}

const getInitialProps: typeof App.getInitialProps = async (appContext) => {
  const locale = appContext.router.locale;

  const appProps = await App.getInitialProps(appContext);

  return {
    ...(appProps as any),
    pageProps: {
      locale,
      ...appProps.pageProps
    }
  };
};

(MyApp as any).getInitialProps = getInitialProps;

export default MyApp;