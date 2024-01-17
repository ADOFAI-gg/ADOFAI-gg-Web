import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';

// Components
import PageTracking from '../global/PageTracking';
import Navbar from '../global/Navbar';
import Footer from '../global/Footer';
import SearchSettingContextProvider from '../../utils/context/SearchSettingContextProvider';

// Pages
const MainPage = lazy(() => import('../../routes/MainPage'));
const LevelListPage = lazy(() => import('../../routes/LevelListPage'));
const LevelPage = lazy(() => import('../../routes/LevelPage'));
const ModListPage = lazy(() => import('../../routes/ModListPage'));
const ModPage = lazy(() => import('../../routes/ModPage'));
const RankingPage = lazy(() => import('../../routes/RankingPage'));
const AWC2024Q1RankingPage = lazy(() =>
  import('../../routes/awc2024/AWCQ1RankingPage')
);
const AWC2024Q2RankingPage = lazy(() =>
  import('../../routes/awc2024/AWCQ2RankingPage')
);
const Error404Page = lazy(() => import('../../routes/error/404'));

const App = () => {
  return (
    <Router>
      <SearchSettingContextProvider>
        <Navbar />

        {/* MAIN */}
        <SkeletonTheme color='#ffffff59' highlightColor='#ffffff00'>
          <PageTracking />

          <Suspense fallback={<div />}>
            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route exact path='/levels' component={LevelListPage} />
              <Route exact path='/levels/:id' component={LevelPage} />
              <Route exact path='/mods' component={ModListPage} />
              <Route exact path='/mods/:id' component={ModPage} />
              <Route exact path='/ranks' component={RankingPage} />

              <Route
                exact
                path='/awc2024/qualifier1/ranks'
                component={AWC2024Q1RankingPage}
              />
              <Route
                exact
                path='/awc2024/qualifier2/ranks'
                component={AWC2024Q2RankingPage}
              />

              <Route component={Error404Page} />
            </Switch>
          </Suspense>
        </SkeletonTheme>

        {/* FOOTER */}
        <Footer />
      </SearchSettingContextProvider>
    </Router>
  );
};

export default App;
