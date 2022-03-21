import '../styles/globals.scss';
import React from 'react';
import type { AppProps } from 'next/app';
import Layout from '@components/Layout';
import App, { AppLayoutProps } from 'next/app';
import { initI18n } from '../utils/i18n';
import { I18nextProvider } from 'react-i18next';
import 'react-loading-skeleton/dist/skeleton.css';
import { DefaultSeo } from 'next-seo';
import icon from '@assets/icon.png';
import NextNProgress from 'nextjs-progressbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AdminLayout from '@components/AdminLayout';
import {
  NextComponentType,
  NextLayoutComponentType,
  NextPageContext
} from 'next';

declare module 'next' {
  type NextLayoutComponentType<P = {}> = NextComponentType<
    NextPageContext,
    any,
    P
  > & {
    layoutType?: 'user' | 'admin';
  };
}

declare module 'next/app' {
  type AppLayoutProps<P = {}> = AppProps & {
    Component: NextLayoutComponentType;
  };
}

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const { locale } = pageProps;

  const i18n = React.useMemo(() => initI18n(locale), [locale]);

  const LayoutComponent =
    React.useMemo(() => {
      switch (Component.layoutType) {
        case 'admin':
          return AdminLayout;
        case 'user':
        default:
          return Layout;
      }
    }, [Component.layoutType]) ?? Layout;

  return (
    <React.Suspense fallback={<React.Fragment />}>
      <ToastContainer />
      <NextNProgress />
      <I18nextProvider i18n={i18n}>
        <DefaultSeo
          title='Adofai-GG'
          description='Wa Sans'
          openGraph={{
            images: [
              {
                url: icon.src,
                width: icon.width,
                height: icon.height
              }
            ]
          }}
        />
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </I18nextProvider>
    </React.Suspense>
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
