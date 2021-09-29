import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-logo">
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
          {/* <li>
          <Link to="/mods">Mods</Link>
        </li> */}
          <li>
            <Link to="/ranks">Ranking</Link>
          </li>
        </ul>
      </div>

      <div className="nav-login"></div>
    </nav>
  );
};

export default Navbar;
