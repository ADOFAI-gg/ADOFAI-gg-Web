import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '../routes/HomePage';
import LevelPage from '../routes/LevelPage';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/level">
            <LevelPage />
        </Route>

        <Route exact path="/">
            <HomePage />
        </Route>

      </Switch>
    </Router>
  )
};
export default AppRouter;