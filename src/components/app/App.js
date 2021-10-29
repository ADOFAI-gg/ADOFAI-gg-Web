import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";

// Components
import PageTracking from "../global/PageTracking";
import Navbar from "../global/Navbar";
import Footer from "../global/Footer";
import AppContainer from "./AppContainer";

// Pages
const MainPage = lazy(() => import("../../routes/MainPage"));
const LevelListPage = lazy(() => import("../../routes/LevelListPage"));
const LevelPage = lazy(() => import("../../routes/LevelPage"));
const ModListPage = lazy(() => import("../../routes/ModListPage"));
const ModPage = lazy(() => import("../../routes/ModPage"));
const RankingPage = lazy(() => import("../../routes/RankingPage"));

const App = () => {
  return (
    <Router>
      <AppContainer>
        <div className="container">
          <Navbar />

          {/* MAIN */}
          <SkeletonTheme color="#ffffff59" highlightColor="#ffffff00">
            <PageTracking />

            <Suspense fallback={<div></div>}>
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
            </Suspense>
          </SkeletonTheme>

          {/* FOOTER */}
          <Footer />
        </div>
      </AppContainer>
    </Router>
  );
};

export default App;
