import Navbar from './components/Navbar'
import MainAddInfo from './components/MainAddInfo';
import MainTopPlays from './components/MainTopPlays';
import MainPopularMaps from './components/MainPopularMaps';
import Footer from './components/Footer';

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
      <Footer />
    </div>
  );
}

export default App;
