import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from '../routes/HomePage';
import LevelPage from '../routes/LevelPage';
import LevelListPage from '../routes/LevelListPage';
import ModListPage from '../routes/ModListPage';
import ModPage from '../routes/ModPage';
import RankingPage from '../routes/RankingPage';
import PageTracking from './PageTracking';

const AppRouter = () => {
  return (
    <Router>
      <PageTracking/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/levels" component={LevelListPage} />
        <Route exact path="/levels/:id" component={LevelPage} />
        <Route exact path="/mods" component={ModListPage} />
        <Route exact path="/mods/:id" component={ModPage} />
        <Route exact path="/ranks" component={RankingPage} />

        <Route>
          {/* XXX to component */}
          <main>
            <br />
            <h2>Oops! This page does not exist.</h2>
          </main>
        </Route>

      </Switch>
    </Router>
  );
};

export default AppRouter;