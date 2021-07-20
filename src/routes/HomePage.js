import React from 'react';
import MainAddInfo from '../components/MainAddInfo';
import MainTopPlays from '../components/MainTopPlays';
import MainPopularLevels from '../components/MainPopularLevels';

const HomePage = () => {
  return (
    <main>
      <img className="main-logo" src="http://localhost:3000/logo.svg" alt="" />
      <h2 style={{ marginTop: '10px' }}>Based On The <a href="https://docs.google.com/spreadsheets/d/1PzLHfWmVWJHrBGnNSsLTsdH0ibdk0hB4MpKHET1nkpU/edit#gid=1848316468" target="_blank" rel="noreferrer"><span className="yellow-highlight">Unofficial ADOFAI Forum</span></a></h2>
      <input className="main-search-bar" type="text" placeholder="Search Song, Artist, or Creator" />

      <MainAddInfo playersOnline='999999' rankedPlayers='999999' rankedLevels='999999' unclearedLevels='999999'/>
      <MainTopPlays />
      <MainPopularLevels />
      <img className="inquiry" src="http://localhost:3000/other_icons/message.svg" alt="" /> 
    </main>
  );
};
export default HomePage;