import React from // useState
"react";
import { Link } from "react-router-dom";
// import { CSSTransition } from "react-transition-group";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowLeft,
//   faChevronRight,
//   faPaperPlane,
//   faEnvelope,
//   faCaretDown,
//   faPlusCircle,
//   faSort,
//   faPlayCircle,
//   faUserCircle,
//   faUserCog,
// } from "@fortawesome/free-solid-svg-icons";
// import { faDiscord } from "@fortawesome/free-brands-svg-icons";

// const exampleUser = {
//   name: "CrackThrough",
//   avatar:
//     "https://cdn.discordapp.com/avatars/543672901585469441/672d6992a72ffe021a1a0c45e3ade56d.webp?size=1024",
// };

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

      {/* <NavMenu>
        <NavMenuItem
          icon={
            <>
              <img
                src={exampleUser.avatar}
                className="nav-menu-user-avatar"
                alt=""
              />
              <FontAwesomeIcon icon={faCaretDown} />
            </>
          }
          dropdown
        />
      </NavMenu> */}
    </nav>
  );
};

// const NavMenu = ({ children }) => {
//   return (
//     <div className="nav-menu">
//       <ul className="nav-menu-list">{children}</ul>
//     </div>
//   );
// };

// const NavMenuItem = ({ icon, link, externalLink, dropdown }) => {
//   const [isOpned, setIsOpned] = useState(false);

//   return (
//     <li>
//       {link ? (
//         <Link
//           to={link}
//           className="nav-menu-icon-button"
//           onClick={() => setIsOpned(!isOpned)}
//         >
//           {icon}
//         </Link>
//       ) : (
//         <a
//           href={externalLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="nav-menu-icon-button"
//           onClick={() => setIsOpned(!isOpned)}
//         >
//           {icon}
//         </a>
//       )}

//       {dropdown && (
//         <CSSTransition
//           in={isOpned}
//           timeout={200}
//           unmountOnExit
//           classNames="nav-menu-dropdown"
//         >
//           <>
//             <NavDropdown />
//             <div
//               className="nav-menu-dropdown-backdrop"
//               onClick={() => setIsOpned(false)}
//             />
//           </>
//         </CSSTransition>
//       )}
//     </li>
//   );
// };

// const NavDropdown = () => {
//   const [activeMenu, setActiveMenu] = useState("main");
//   const [menuHeight, setMenuHeight] = useState("auto");

//   const calcHeight = (el) => {
//     const height = el.offsetHeight;

//     setMenuHeight(height);
//   };

//   const NavDropdownItem = ({
//     children,
//     leftIcon,
//     goToMenu,
//     link,
//     externalLink,
//   }) => {
//     const ItemContent = () => {
//       return (
//         <>
//           <span className="nav-menu-icon-button">{leftIcon}</span>

//           <span className="nav-menu-dropdown-item-text">{children}</span>

//           {goToMenu && (
//             <span className="nav-menu-dropdown-more">
//               <FontAwesomeIcon icon={faChevronRight} />
//             </span>
//           )}
//         </>
//       );
//     };

//     if (link) {
//       return (
//         <Link
//           to={link}
//           className="nav-menu-dropdown-item"
//           onClick={() => goToMenu && setActiveMenu(goToMenu)}
//         >
//           <ItemContent />
//         </Link>
//       );
//     } else if (externalLink) {
//       return (
//         <a
//           href={externalLink ?? ""}
//           className="nav-menu-dropdown-item"
//           target="_blank"
//           rel="noopener noreferrer"
//           onClick={() => goToMenu && setActiveMenu(goToMenu)}
//         >
//           <ItemContent />
//         </a>
//       );
//     } else {
//       return (
//         <div
//           className="nav-menu-dropdown-item"
//           style={goToMenu && { cursor: "pointer" }}
//           onClick={() => goToMenu && setActiveMenu(goToMenu)}
//         >
//           <ItemContent />
//         </div>
//       );
//     }
//   };

//   const NavDropdownSecondaryTitle = ({ title }) => {
//     return (
//       <div
//         className="nav-menu-dropdown-secondary-title"
//         onClick={() => setActiveMenu("main")}
//       >
//         <div className="nav-menu-dropdown-back-button">
//           <FontAwesomeIcon icon={faArrowLeft} />
//         </div>
//         <span>{title}</span>
//       </div>
//     );
//   };

//   return (
//     <div className="nav-menu-dropdown" style={{ height: menuHeight }}>
//       <CSSTransition
//         in={activeMenu === "main"}
//         unmountOnExit
//         timeout={500}
//         onEnter={calcHeight}
//         classNames="nav-menu-dropdown-primary"
//       >
//         <div className="nav-menu-dropdown-container">
//           <div className="nav-menu-dropdown-item nav-menu-dropdown-userinfo">
//             <img
//               src={exampleUser.avatar}
//               className="nav-menu-dropdown-user-avatar"
//               alt=""
//             />
//             <span className="nav-menu-dropdown-item-text">
//               {exampleUser.name}
//             </span>
//           </div>

//           <hr />

//           <NavDropdownItem
//             leftIcon={<FontAwesomeIcon icon={faUserCircle} />}
//             link={`/user/${exampleUser.name}`}
//           >
//             My profile
//           </NavDropdownItem>

//           <NavDropdownItem
//             leftIcon={<FontAwesomeIcon icon={faUserCog} />}
//             link={`/setting/myaccount`}
//           >
//             Account settings
//           </NavDropdownItem>

//           <hr />

//           <NavDropdownItem
//             leftIcon={<FontAwesomeIcon icon={faPlusCircle} />}
//             goToMenu="submit"
//           >
//             Submit
//           </NavDropdownItem>

//           <NavDropdownItem
//             leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
//             goToMenu="contact"
//           >
//             Contact
//           </NavDropdownItem>
//         </div>
//       </CSSTransition>

//       <CSSTransition
//         in={activeMenu === "contact"}
//         unmountOnExit
//         timeout={500}
//         onEnter={calcHeight}
//         classNames="nav-menu-dropdown-secondary"
//       >
//         <div className="nav-menu-dropdown-container">
//           <NavDropdownSecondaryTitle title="Contact" />
//           <NavDropdownItem
//             leftIcon={<FontAwesomeIcon icon={faDiscord} />}
//             externalLink="https://discord.gg/adofaigg"
//           >
//             Join our Discord server
//           </NavDropdownItem>
//           <NavDropdownItem
//             leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}
//             externalLink="mailto:adofai.gg@gmail.com"
//           >
//             Send an email
//           </NavDropdownItem>
//         </div>
//       </CSSTransition>

//       <CSSTransition
//         in={activeMenu === "submit"}
//         unmountOnExit
//         timeout={500}
//         onEnter={calcHeight}
//         classNames="nav-menu-dropdown-secondary"
//       >
//         <div className="nav-menu-dropdown-container">
//           <NavDropdownSecondaryTitle title="Submit" />

//           <NavDropdownItem
//             leftIcon={<FontAwesomeIcon icon={faPlayCircle} />}
//             externalLink="https://forms.gle/XdKNuqVrt974F7Ab6"
//           >
//             Submit your play
//           </NavDropdownItem>

//           <NavDropdownItem
//             leftIcon={<img src="/mod_icons/planet_edit.svg" alt="" />}
//             externalLink="https://forms.gle/cW9wGpEoTV4yD57b7"
//           >
//             Submit your custom level
//           </NavDropdownItem>

//           <NavDropdownItem
//             leftIcon={<FontAwesomeIcon icon={faSort} />}
//             externalLink="https://docs.google.com/forms/d/e/1FAIpQLSff8C5U7_aXwwO56uvnZMvLoA6P3iY8YRAg2J2UVAusHOkM2Q/viewform?usp=sf_link"
//           >
//             Request for re-leveling
//           </NavDropdownItem>
//         </div>
//       </CSSTransition>
//     </div>
//   );
// };

export default Navbar;
