import Navbar from './components/Navbar'
import MainAddInfo from './components/MainAddInfo';
import MainTopPlays from './components/MainTopPlays';

function App() {
  return (
    <div className="container">
      <Navbar />
      <div className="main">
        <img className="main-logo" src="http://localhost:3000/logo.svg" alt="" />
        <h2 style={{ marginTop: '10px' }}>Based On The <a href="https://docs.google.com/spreadsheets/d/1PzLHfWmVWJHrBGnNSsLTsdH0ibdk0hB4MpKHET1nkpU/edit#gid=1848316468" target="_blank"><span className="yellow-highlight">Unofficial ADOFAI Forum</span></a></h2>
        <input className="main-search-bar" type="text" placeholder="Search Song, Artist, or Creator" />
        <MainAddInfo playersOnline='999999' rankedPlayers='999999' rankedMaps='999999' unclearedMaps='999999'/>
        <div className="content-title">
          <h1 style={{ flexBasis: '80%', textAlign: 'left' }}>Recent Top Plays</h1>
          <h3 style={{ flexBasis: '20%', textAlign: 'right', paddingTop: '20px' }}><a href="#maps">See All ▹</a></h3>
        </div>
        <MainTopPlays />
        <div className="content-title">
          <h1 style={{ flexBasis: '80%', textAlign: 'left' }}>Recent Popular Maps</h1>
          <h3 style={{ flexBasis: '20%', textAlign: 'right', paddingTop: '20px' }}><a href="#maps">See All ▹</a></h3>
        </div>
        <div className="main-popular-maps">
          <a href="#map">
            <div className="map-info">
              <div className="map-info-container-bottom">
                <img style={{ marginLeft: '10px' }} src="http://localhost:3000/level_icons/18.png" alt="" />
                <table border="0" cellSpacing="0" cellPadding="0" width="400" style={{ textAlign: "left", marginLeft: "10px" }}>
                  <tr>
                    <td className="map-info-top">Map</td>
                  </tr>
                  <tr>
                    <td valign="bottom" className="map-info-map">A very very very very long map title</td>
                  </tr>  
                </table>
                <table border="0" cellSpacing="0" cellPadding="0" width="200" style={{ textAlign: "left", marginLeft: "10px" }}>
                  <tr>
                    <td className="map-info-top">Creator</td>
                  </tr>
                  <tr>
                    <td valign="bottom" className="map-info-creator">A very very long creator</td>
                  </tr>  
                </table>
                <table border="0" cellSpacing="0" cellPadding="0" width="130" style={{ textAlign: "center", marginLeft: "10px" }}>
                  <tr>
                    <td className="map-info-top">BPM</td>
                  </tr>
                  <tr>
                    <td valign="bottom" className="map-info-bpm">9999-9999</td>
                  </tr>  
                </table>
                <table border="0" cellSpacing="0" cellPadding="0" width="80" style={{ textAlign: "center", marginLeft: "10px" }}>
                  <tr>
                    <td className="map-info-top">Tiles</td>
                  </tr>
                  <tr>
                    <td valign="bottom" className="map-info-tiles">9999+</td>
                  </tr>  
                </table>
                <table border="0" cellSpacing="0" cellPadding="0" width="80" style={{ textAlign: "center", marginLeft: "10px" }}>
                  <tr>
                    <td valign="bottom" className="map-info-top"><img style={{ height: '12px' }} src="http://localhost:3000/comment.svg" alt="" /></td>
                  </tr>
                  <tr>
                    <td valign="bottom" className="map-info-comments">9999+</td>
                  </tr>  
                </table>
                <table border="0" cellSpacing="0" cellPadding="0" width="80" style={{ textAlign: "center", marginLeft: "10px" }}>
                  <tr>
                    <td valign="bottom" className="map-info-top"><img style={{ height: '12px' }} src="http://localhost:3000/heart.svg" alt="" /></td>
                  </tr>
                  <tr>
                    <td valign="bottom" className="map-info-likes">9999+</td>
                  </tr>  
                </table>
              </div>
              <div className="map-info-container-top">
                <img style={{ marginLeft: '10px' }} src="http://localhost:3000/level_icons/18.png" alt="" />
                <table border="0" cellSpacing="0" cellPadding="0" width="400" style={{ textAlign: "left", marginLeft: "10px" }}>
                  <tr>
                    <td className="map-info-top">Song</td>
                  </tr>
                  <tr>
                    <td valign="bottom" className="map-info-song">A very very very very long song title</td>
                  </tr>  
                </table>
                <table border="0" cellSpacing="0" cellPadding="0" width="250" style={{ textAlign: "left", marginLeft: "10px" }}>
                  <tr>
                    <td className="map-info-top">Artist</td>
                  </tr>
                  <tr>
                    <td valign="bottom" className="map-info-artist">A very very long artist</td>
                  </tr>  
                </table>
                <table border="0" cellSpacing="0" cellPadding="0" width="335" style={{ textAlign: "left", marginLeft: "10px" }}>
                  <tr>
                    <td className="map-info-top">Tags</td>
                  </tr>
                  <tr>
                    <td valign="bottom" className="map-info-tags">
                      <div className="tag-container">
                        <span className="tooltiptext">Tag Name 1<br /><br />This tag means that this map is like this and that.</span>
                        <img className="tag" src="http://localhost:3000/updown.svg" alt="" />
                      </div>
                      <div className="tag-container">
                        <span className="tooltiptext">Tag Name 2<br /><br />This tag means that this map is like this and that.</span>
                        <img className="tag" src="http://localhost:3000/updown.svg" alt="" />
                      </div>
                      <div className="tag-container">
                        <span className="tooltiptext">Tag Name 3<br /><br />This tag means that this map is like this and that.</span>
                        <img className="tag" src="http://localhost:3000/updown.svg" alt="" />
                      </div>
                      <div className="tag-container">
                        <span className="tooltiptext">Tag Name 4<br /><br />This tag means that this map is like this and that.</span>
                        <img className="tag" src="http://localhost:3000/updown.svg" alt="" />
                      </div>
                      <div className="tag-container">
                        <span className="tooltiptext">Tag Name 5<br /><br />This tag means that this map is like this and that.</span>
                        <img className="tag" src="http://localhost:3000/updown.svg" alt="" />
                      </div>
                      <div className="tag-container">
                        <span className="tooltiptext">Tag Name 6<br /><br />This tag means that this map is like this and that.</span>
                        <img className="tag" src="http://localhost:3000/updown.svg" alt="" />
                      </div>
                      <div className="tag-container">
                        <span className="tooltiptext">Tag Name 7<br /><br />This tag means that this map is like this and that.</span>
                        <img className="tag" src="http://localhost:3000/updown.svg" alt="" />
                      </div>
                      <div className="tag-container">
                        <span className="tooltiptext">Tag Name 8<br /><br />This tag means that this map is like this and that.</span>
                        <img className="tag" src="http://localhost:3000/updown.svg" alt="" />
                      </div>
                      <div className="tag-container">
                        <span className="tooltiptext">Tag Name 9<br /><br />This tag means that this map is like this and that.<br /><br />Tag Name 10<br /><br />This tag means that this map is like this and that.</span>
                        <img className="tag" src="http://localhost:3000/add.svg" alt="" />
                      </div>
                    </td>
                  </tr>  
                </table>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="footer">
        <div className="footer-content">
          <h4 style={{ fontWeight: '400' }}>ADOFAI.GG is not associated with <a href="https://7thbe.at/" target="_blank">7th Beat Games</a>.&ensp;|&ensp;<a href="https://discord.gg/rwWyfPJ" target="_blank">Join Our Discord</a>&ensp;|&ensp;<a href="mailto:adofai.gg@gmail.com">Contact Us</a></h4>
        </div>
      </div>
    </div>
  );
}

export default App;
