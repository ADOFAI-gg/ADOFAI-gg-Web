import React from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

// Components
import LevelTags from '../components/LevelTags';

// Stylesheets
import '../stylesheets/level.css';

const LevelPage = () => {
  function PSSwal() {
    Swal.fire({
      title: 'What is Photosensitive Seizure?',
      html: `
      Some people may experience seizures when exposed to certain visual effects, such as <strong>severely flashing lights</strong> during the game. These symptoms are called "photosensitive seizures".
      <br>
      <br>Photosensitive seizures can occur even to those who have never experienced seizures before.
      <br>
      <br>When seizures begin, symptoms such as dizziness, changes in vision, eye or face cramps, twitching or shaking arms or legs, disorientation, panic, and, in severe cases, temporary loss of consciousness can occur.
      <br>
      <br><strong>If symptoms occur, immediately turn off the game and talk to your doctor.</strong>
      <br>
      <br>To reduce the risk of seizures, follow these steps.
      <br>- Play this level in a bright place
      <br>- Avoid playing this level when you are tired
      `,
      customClass: {
        popup: "level-info-swal-popup"
      }
    });
  }

  const { id } = useParams();

  // TODO replace with object
  const levelName = `LagTrain`;
  const levelSongName = `ラグトレイン`;

  const artistName = `稲葉曇`;
  const levelCreatorName = `undefined`;
  const levelThumbnail = `https://cdn.discordapp.com/attachments/697417647721021442/867295578161020968/unknown.png`;

  const levelDifficulty = 17.5;
  const levelMinBPM = 9999.636;
  const levelMaxBPM = 9913499.99;
  const levelTiles = 345348123123;
  const levelDescription = `Good luck`;
  const levelYoutubeID = `UnIhRpIT7nc`;
  const levelLikeCount = 18342;
  
  const steamWorkshop = `https://steamcommunity.com`;
  const levelDownload = `https://cdn.discordapp.com/attachments/697417647721021442/867317985890926602/METADATA.txt`;

  const hasSeizureWarning = true;
  const levelTags = [
    0,
    2,
    3,
    6,
    1
  ];

  const levelMinBPMInt = String(levelMinBPM).split('.')[0]
  const levelMinBPmDecimal = String(levelMinBPM).split('.')[1]

  const levelMaxBPMInt = String(levelMaxBPM).split('.')[0]
  const levelMaxBPmDecimal = String(levelMaxBPM).split('.')[1]

  return (
    <>
      {/* Main */}
      <div className="level-info-main">
        <div className="level-info">
          <div className="lavel-info-header">
            <img className="level-info-thumbnail" src={levelThumbnail} alt="Level Thumbnail." />
            <div className="level-info-basic">
              <div className="level-info-title">
                <div>
                  <div className="tooltip-container">
                    {(() => { if (levelName.length > 21) {
                      return ( 
                        <span className="level-info-tooltiptext">
                          Full Name of Level
                          <br />
                          <span style={{ fontWeight:'300' }}>{levelName}</span>
                        </span>
                       )
                    }})()}

                    <div className="level-info-name">{levelName}</div>
                  </div>
                  <div className="level-info-song-name">{levelSongName}</div>
                  <div className="level-info-author">
                    <strong>{artistName}</strong> ─ Level by <strong>{levelCreatorName}</strong>
                  </div>
                </div>
                <div className="level-info-tags">
                  {(() => { if (hasSeizureWarning) {
                    return <div className="level-info-tag level-info-seizure-tag" onClick={PSSwal} />
                  }})()}

                  {levelTags.map((tag) => (
                    console.log(<LevelTags tag={tag} styleClass='level-tag' />)
                  ))}
                  {/* {levelTags.map((tag) => (
                    <div className="level-info-tag">{tag}</div>
                  ))} */}
                </div>
              </div>
              <div className="level-info-header-buttons">
                <a href={steamWorkshop}><img className="level-info-header-button" src="http://localhost:3000/other_icons/steam.svg" alt="steam workshop" /></a>
                <a href={levelDownload}><img className="level-info-header-button" src="http://localhost:3000/other_icons/download.svg" alt="level download" /></a>
              </div>
            </div>
          </div>
          <div className="level-info-details">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '600px' }}>
                <div style={{ display: 'flex' }}>
                  <div className="level-info-detail-info-section">
                    <div className="level-info-label">
                      Lv.
                    </div>
                    <div className="level-info-value">
                      <img style={{ width: '40px' }} src={`http://localhost:3000/level_icons/level-icon-${levelDifficulty}.svg`} alt="" />
                    </div>
                  </div>
                  <div className="level-info-detail-info-section">
                    <div className="level-info-label">
                      BPM
                    </div>
                    <div className="level-info-value">
                      {levelMinBPMInt}<span className="level-info-value-decimal">.{levelMinBPmDecimal}</span> - {levelMaxBPMInt}<span className="level-info-value-decimal">.{levelMaxBPmDecimal}</span>
                    </div>
                  </div>
                  <div className="level-info-detail-info-section">
                    <div className="level-info-label">
                      Tiles
                    </div>
                    <div className="level-info-value">
                      {levelTiles}
                    </div>
                  </div>
                </div>
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                  <div className="level-info-detail-info-section">
                    <div className="level-info-label">
                      Description
                    </div>
                    <div className="level-info-value level-info-detail-info-description ">
                      {levelDescription}
                    </div>
                  </div>
                  <div className="level-info-detail-info-like">
                    {/* NO FUNCTIONALITY */}
                    <img style={{ height: '12px' }} src="http://localhost:3000/other_icons/un_heart.svg" alt="" />
                    {levelLikeCount}
                  </div>
                </div>
                  
              </div>
              <div className="level-info-detail-info-video">
                <div>Wait a moment please!</div>
                <iframe src={`https://www.youtube.com/embed/${levelYoutubeID}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
              </div>
            </div>

            
          </div>
        </div>

        <div className="content-title">
          <h1 style={{ flexBasis: '80%', textAlign: 'left' }}>Leaderboard</h1>
          <h3 style={{ flexBasis: '20%', textAlign: 'right', paddingTop: '20px' }}><a href="#levels">See All ▹</a></h3>
        </div>

      </div>
    </>
  );
};

export default LevelPage;