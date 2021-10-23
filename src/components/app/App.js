import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";

// Components
import PageTracking from "../global/PageTracking";
import Navbar from "../global/Navbar";
import Footer from "../global/Footer";
import AppContainer from "./AppContainer";

// Pages
import MainPage from "../../routes/MainPage";
import LevelPage from "../../routes/LevelPage";
import LevelListPage from "../../routes/LevelListPage";
import ModListPage from "../../routes/ModListPage";
import ModPage from "../../routes/ModPage";
import RankingPage from "../../routes/RankingPage";

const App = () => {
  return (
    <Router>
      <AppContainer>
        <div className="container">
          <Navbar />

          {/* MAIN */}
          <SkeletonTheme color="#ffffff59" highlightColor="#ffffff00">
            <PageTracking />

            <Switch>
              <Route exact path="/" component={MainPage} />
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
          </SkeletonTheme>

          {/* FOOTER */}
          <Footer />
        </div>
      </AppContainer>
    </Router>
  );
};

export default App;
