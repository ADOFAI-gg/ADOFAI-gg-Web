import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import HomePage from "../routes/HomePage";
import LevelPage from "../routes/LevelPage";
import LevelListPage from "../routes/LevelListPage";
import ModListPage from "../routes/ModListPage";
import ModPage from "../routes/ModPage";
import RankingPage from "../routes/RankingPage";
import PageTracking from "./PageTracking";

const App = () => {
  return (
    <Router>
      <div className="container">
        {/* HEADER */}
        <nav>
          <div className="navbar-logo">
            <Link to="/">
              <img
                className="logo-middle"
                style={{ height: "20px", marginLeft: "10px" }}
                src={"/logo.svg"}
                alt=""
              />
            </Link>
          </div>

          <div className="nav-pages">
            <ul>
              <li>
                <Link to="/levels">Levels</Link>
              </li>
              {/* <li><Link to="/mods">Mods</Link></li> */}
              <li>
                <Link to="/ranks">Ranking</Link>
              </li>
            </ul>
          </div>

          <div className="navbar-login"></div>
        </nav>

        {/* MAIN */}
        <PageTracking />

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

        {/* FOOTER */}
        <footer>
          <div className="footer-content">
            <h4 style={{ fontWeight: "400" }}>
              ADOFAI.GG is not associated with{" "}
              <a href="https://7thbe.at/" target="_blank" rel="noreferrer">
                7th Beat Games
              </a>
              {". | "}
              <a
                href="https://discord.gg/Fx9TZNftFP"
                target="_blank"
                rel="noreferrer"
              >
                Join Our Discord
              </a>
              {" | "}
              <a href="mailto:adofai.gg@gmail.com">Contact Us</a>
              {" | Powered By "}
              <a
                href="https://www.hanmesoft.com/"
                target="_blank"
                rel="noreferrer"
              >
                Hanmesoft
              </a>
            </h4>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
