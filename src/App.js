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
      <div className="main">
        <img className="main-logo" src="http://localhost:3000/logo.png" alt="" />
        <h2 style={{ marginTop: '10px' }}>Based On The <a href="https://docs.google.com/spreadsheets/d/1PzLHfWmVWJHrBGnNSsLTsdH0ibdk0hB4MpKHET1nkpU/edit#gid=1848316468" target="_blank"><span className="yellow-highlight">Unofficial ADOFAI Forum</span></a></h2>
        <input className="main-search-bar" type="text" placeholder="Search Song, Artist, or Creator" />
        <div className="main-additional-information">
          <table>
            <tr><h3>Players Online</h3></tr>
            <tr><h2><span className="yellow-highlight">999999</span></h2></tr>
          </table>
          <table>
            <tr><h3>Ranked Players</h3></tr>
            <tr><h2><span className="yellow-highlight">999999</span></h2></tr>
          </table>
          <table>
            <tr><h3>Ranked Maps</h3></tr>
            <tr><h2><span className="yellow-highlight">999999</span></h2></tr>
          </table>
          <table>
            <tr><h3>Uncleared Maps</h3></tr>
            <tr><h2><span className="yellow-highlight">999999</span></h2></tr>
          </table>
        </div>
        <div className="main-popular-maps-title">
          {/* <div style={{ flexBasis: '80%', textAlign: 'left' }}><h1>Recent Popular Maps</h1></div> */}
          {/* <div style={{ flexBasis: '20%', textAlign: 'right' }}><h3><a style={{ color: 'white' }} href="#maps">See All ▹</a></h3></div> */}
          <h1 style={{ flexBasis: '80%', textAlign: 'left' }}>Recent Popular Maps</h1>
          <h3 style={{ flexBasis: '20%', textAlign: 'right', paddingTop: '20px' }}><a style={{ color: 'white' }} href="#maps">See All ▹</a></h3>
        </div>
        <div className="main-popular-maps">
          <div className="map-info-container">
            <img style={{ marginRight: '20px' }} src="http://localhost:3000/level.png" alt="" />
            <table border="0" cellSpacing="0" cellPadding="0" width="300" style={{ textAlign: "left" }}>
              <tr>
                <td className="map-info-top">Song</td>
              </tr>
              <tr>
                <td valign="bottom" className="map-info-bottom">I love girrafes</td>
              </tr>  
            </table>
            <table border="0" cellSpacing="0" cellPadding="0" width="200" style={{ textAlign: "left" }}>
              <tr>
                <td className="map-info-top">Artist</td>
              </tr>
              <tr>
                <td valign="bottom" className="map-info-bottom" style={{ maxWidth: "200px" }}>かめりあ(Camellia)</td>
              </tr>  
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
