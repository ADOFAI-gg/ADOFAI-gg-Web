import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./stylesheets/basic.css";

require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
