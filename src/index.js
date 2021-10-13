import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App";

// Stylesheets
import "./stylesheets/global.css";
import "./stylesheets/main.css";
import "./stylesheets/mod.css";
import "./stylesheets/modList.css";
import "./stylesheets/level.css";
import "./stylesheets/levelList.css";

require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
