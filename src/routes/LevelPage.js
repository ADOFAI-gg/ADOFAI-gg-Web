import React from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const LevelPage = () => {
  function PSSwal() {
    Swal.fire({
      title: 'What is Photosensitive Seizure?',
      html: `
      Some people may experience seizures when exposed to certain visual effects, such as <strong>severely twinkling lights</strong> during the game. These symptoms are called "photosensitive seizures".
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
  
  return (
    <>
      {/* Main */}
      <div className="level-info-main">
        <div className="level-info">
          <div className="lavel-info-header">
            <img className="level-info-thumbnail" src="https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
            <div className="level-info-basic">
              <div className="level-info-title">
                <div>
                <div className="level-info-name">We Could Get More Machinegun Psystyle! (And More Genre Switches)</div>
                <div className="level-info-author">
                    <strong>かめりあ (Camellia)</strong> ─ Level by <strong>Appeal</strong>
                  </div>
                </div>
                <div className="level-info-tags">
                  <div className="level-info-seizure-tag-container">
                    <div className="level-info-tag level-info-seizure-tag">
                      <div className="level-info-seizure-tag-text-area">
                        <span id="normal-text">Seizure Warning</span>
                        <span id="hover-text" onClick={PSSwal}>What is Photosensitive Seizure?</span>
                      </div>
                    </div>
                  </div>
                  <div className="level-info-tag">Multiple Press</div>
                  <div className="level-info-tag">Polyrhythm</div>
                  <div className="level-info-tag">Frums moment</div>
                  <div className="level-info-tag">Memorization</div>
                </div>
              </div>
              <div className="level-info-header-buttons">
                <a href="#a"><img className="level-info-header-button" src="http://localhost:3000/other_icons/steam.svg" alt="steam workshop" /></a>
                <a href="#a"><img className="level-info-header-button" src="http://localhost:3000/other_icons/download.svg" alt="level download" /></a>
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
                      <img style={{ width: '40px' }} src="http://localhost:3000/level.png" alt="" />
                    </div>
                  </div>
                  <div className="level-info-detail-info-section">
                    <div className="level-info-label">
                      BPM
                    </div>
                    <div className="level-info-value">
                      9999 - 9999<span className="level-info-value-decimal">.99</span>
                    </div>
                  </div>
                  <div className="level-info-detail-info-section">
                    <div className="level-info-label">
                      Tiles
                    </div>
                    <div className="level-info-value">
                      62539
                    </div>
                  </div>
                </div>
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div className="level-info-detail-info-section">
                    <div className="level-info-label">
                        Description
                    </div>
                    <div className="level-info-value detail-info-description">
                      {id}
                      {/* This text is very useless bcz this is a.... test text! bla bla bla blaMy english is not very good, look i wrote english, not English. and... bla bla bla i dont know what i saying */}
                    </div>
                  </div>
                  <div className="level-info-detail-info-like">ここに「いいね」ボタン</div>
                </div>
                  
              </div>
              <div className="level-info-detail-info-video">
                <div>Wait a moment please!</div>
                <iframe src="https://www.youtube.com/embed/EHZZqgFpfuc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
              </div>
            </div>

            
          </div>
        </div>

        <div className="content-title">
          <h1 style={{ flexBasis: '80%', textAlign: 'left' }}>Leaderboard</h1>
          <h3 style={{ flexBasis: '20%', textAlign: 'right', paddingTop: '20px' }}><a href="#maps">See All ▹</a></h3>
        </div>

      </div>
    </>
  );
}
export default LevelPage;