function App() {
  return (
    <div className="container">
      <div className="navbar">
        <div className="navbar-logo">
          <a href="#home">
            <img className="logo-middle" style={{ height: '20px', marginLeft: '10px' }} src="http://localhost:3000/logo.png" alt="" />
          </a>
        </div>
        <div className="navbar-content">
          <ul>
            <li><a href="#maps">Maps</a></li>
            <li><a href="#mods">Mods</a></li>
            <li><a href="#ranking">Ranking</a></li>
            <li><a href="#discord">Join Discord</a></li>
          </ul>
        </div>
        <div className="navbar-login"></div>
      </div>
    </div>
  );
}

export default App;
