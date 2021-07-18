import Navbar from './components/Navbar'
import MainAddInfo from './components/MainAddInfo';
import MainTopPlays from './components/MainTopPlays';
import MainPopularMaps from './components/MainPopularMaps';

function App() {
  return (
    <div className="container">
      <Navbar />
      <div className="main">
        <img className="main-logo" src="http://localhost:3000/logo.svg" alt="" />
        <h2 style={{ marginTop: '10px' }}>Based On The <a href="https://docs.google.com/spreadsheets/d/1PzLHfWmVWJHrBGnNSsLTsdH0ibdk0hB4MpKHET1nkpU/edit#gid=1848316468" target="_blank"><span className="yellow-highlight">Unofficial ADOFAI Forum</span></a></h2>
        <input className="main-search-bar" type="text" placeholder="Search Song, Artist, or Creator" />
        <MainAddInfo playersOnline='999999' rankedPlayers='999999' rankedMaps='999999' unclearedMaps='999999'/>
        <MainTopPlays />
        <MainPopularMaps />
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
