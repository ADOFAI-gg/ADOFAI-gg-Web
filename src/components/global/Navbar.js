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

      <NavbarMenu>
        <NavbarMenuIconBtn src="/mod_icons/planet_edit.svg" size={0.45} />
        <NavbarMenuIconBtn src="/mod_icons/level_editor.svg" size={0.45} />
        <NavbarMenuIconBtn src="/mod_icons/game_play.svg" size={0.5} />
        <NavbarMenuIconBtn src="/mod_icons/other.svg" />
      </NavbarMenu>
    </nav>
  );
};

const NavbarMenu = ({ children }) => {
  return (
    <div className="nav-menu">
      <ul className="nav-menu-list">{children}</ul>
    </div>
  );
};

const NavbarMenuIconBtn = ({ icon, src, link, size }) => {
  return (
    <li
      className="nav-menu-icon-button"
      style={{ "--nav-icon-size": `calc(var(--nav-height) * ${size ?? 0.4})` }}
    >
      <Link to={link}>{icon ?? <img src={src} alt="" />}</Link>
    </li>
  );
};

export default Navbar;
