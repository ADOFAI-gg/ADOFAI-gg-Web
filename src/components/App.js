import AppRouter from "./Router";

function App() {
  return (
    <div className="container">
      {/* HEADER */}
      <div className="navbar">
        <div className="navbar-logo">
          <a href="/">
            <img className="logo-middle" style={{ height: '20px', marginLeft: '10px' }} src="http://localhost:3000/logo.svg" alt="" />
          </a>
        </div>
        <div className="navbar-content">
          <ul>
            <li><a href="/levels">Levels</a></li>
            <li><a href="/mods">Mods</a></li>
            <li><a href="/ranking">Ranking</a></li>
          </ul>
        </div>
        <div className="navbar-login"></div>
      </div>

      {/* MAIN */}
      <AppRouter />

      {/* FOOTER */}
      {window.location.pathname !== '/mods' ? (
        <footer>
          <div className="footer-content">
            <h4 style={{ fontWeight: '400' }}>ADOFAI.GG is not associated with <a href="https://7thbe.at/" target="_blank" rel="noreferrer">7th Beat Games</a>.&ensp;|&ensp;<a href="https://discord.gg/rwWyfPJ" target="_blank" rel="noreferrer">Join Our Discord</a>&ensp;|&ensp;<a href="mailto:adofai.gg@gmail.com">Contact Us</a></h4>
          </div>
        </footer>
      ) : null}

    </div>
  );
}

export default App;
