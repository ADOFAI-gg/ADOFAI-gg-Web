import AppRouter from "./AppRouter";

function App() {
  return (
    <div className="container">
      {/* HEADER */}
      <div className="navbar">
        <div className="navbar-logo">
          <a href="/">
            <img
              className="logo-middle"
              style={{ height: "20px", marginLeft: "10px" }}
              src={"/logo.svg"}
              alt=""
            />
          </a>
        </div>
        <div className="navbar-content">
          <ul>
            <li>
              <a href="/levels">Levels</a>
            </li>
            {/* <li><a href="/mods">Mods</a></li> */}
            <li>
              <a href="/ranks">Ranking</a>
            </li>
          </ul>
        </div>
        <div className="navbar-login"></div>
      </div>

      {/* MAIN */}
      <AppRouter />

      {/* FOOTER */}
      {!(
        window.location.pathname.includes("/mods") ||
        window.location.pathname.includes("/ranks") ||
        window.location.pathname.includes("/levels")
      ) ? (
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
      ) : null}
    </div>
  );
}

export default App;
