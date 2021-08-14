import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from '../routes/HomePage';
import LevelPage from '../routes/LevelPage';
import LevelListPage from '../routes/LevelListPage';
import ModListPage from '../routes/ModListPage';
import ModPage from '../routes/ModPage';
import RankingPage from '../routes/RankingPage';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/levels" component={LevelListPage} />
        <Route path="/levels/:id" component={LevelPage} />
        <Route path="/mods" component={ModListPage} />
        <Route path="/mods/:id" component={ModPage} />
        <Route path="/ranks" component={RankingPage} />

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