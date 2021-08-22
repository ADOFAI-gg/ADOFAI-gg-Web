import React, { useReducer, useEffect } from 'react';
import { useParams } from "react-router-dom";
import MetaTags from 'react-meta-tags';
import axios from "axios";

import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faSteam } from '@fortawesome/free-brands-svg-icons';

// Components
import LikeButton from '../components/LikeButton';
import LevelTags from '../components/LevelTags';
import RankingItem from '../components/RankingItem';

// Stylesheets
import '../stylesheets/level.css';

const LevelPage = () => {
  const reduce = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return {
          ...state,
          isLoading: true,
        };
        
      case 'FETCH_RESULT':
        return {
          ...state,
          isLoading: false,
          level: {
            ...action.level,
            thumbnail: null,
            youtubeId: !action.level ? null : /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/.exec(action.level.video)[1],
          },
          leaderboard: {
            ...action.leaderboard,
          }
        };
      
      case 'FETCH_ERROR':
        return {
          ...state,
          isLoading: false,
          error: action.error,
        };
      
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reduce, {
    isLoading: false,
    isError: null,
    level: null,
    leaderboard: null,
  });

  const PSSwal = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_RESULT', level: null });
        dispatch({ type: 'FETCH_ERROR', error: null });
        dispatch({ type: 'FETCH_REQUEST' });

        const levelResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/levels/${id}`);
        const leaderboardResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/playLogs`, {
          params: {
            offset: 0,
            amount: 10,
            levelId: id,
            sort: 'RECENT_DESC'
          }
        });

        dispatch({ type: 'FETCH_RESULT', level: levelResponse.data, leaderboard: leaderboardResponse.data.results});
      } catch (e) {
        dispatch({ type: 'FETCH_ERROR', error: e });
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {/* Main */}
      <div className="level-info-main">
        { state.isLoading ? null
          : !state.level || !state.leaderboard ? null
          : state.isError || state.level.title === undefined ? (<h2 style={{ margin: '30px' }}>Oops! An error occurred.</h2>)
          : ( <>
            <MetaTags>
              <title>{state.level.title} ─ Adofai.gg</title>
            </MetaTags>
            
            <div className="level-info">
              <div className="lavel-info-header">
                <img className="level-info-thumbnail" src={state.level.thumbnail ? state.level.thumbnail : `https://i.ytimg.com/vi/${state.level.youtubeId}/original.jpg`} alt="Level Thumbnail." />
                <div className="level-info-basic">
                  <div className="level-info-title">
                    <div>
                      <div className="tooltip-container">
                        {state.level.title.length > 21 ?
                          <span className="level-info-tooltiptext tooltiptext">
                            Full Name of Level
                            <br />
                            <span style={{ fontWeight:'300' }}>{state.level.title}</span>
                          </span>
                        : null}

                        <div className="level-info-name">
                          {state.level.title}
                        </div>
                      </div>
                      <div className="level-info-song-name">
                        {state.level.song}
                      </div>
                      <div className="level-info-author">
                        <strong>{state.level.artists.join(' & ')}</strong> ─ Level by <strong>{state.level.creators.join(' & ')}</strong>
                      </div>
                    </div>
                    <div className="level-info-tags">
                      {state.level.difficulty === 0 ? 
                        <div className="level-info-tag level-info-warn-tag level-info-incomplete-tag" />
                      : null}

                      {state.level.nsfw ? 
                        <div className="level-info-tag level-info-warn-tag level-info-nsfw-tag" />
                      : null}

                      {state.level.epilepsyWarning ? 
                        <div className="level-info-tag level-info-warn-tag level-info-seizure-tag" onClick={PSSwal} />
                      : null}

                      {state.level.tags.map((tag) => (
                        <LevelTags tag={tag['id']} styleClass='level-tag' />
                      ))}
                    </div>
                  </div>
                  <div className="level-info-header-buttons">
                    {!state.level.workshop ? null :
                      <a href={state.level.workshop} target="_blank" rel="noreferrer" className="level-info-header-button" >
                        <FontAwesomeIcon icon={faSteam} />
                      </a>
                    }
                    <a href={state.level.download} target="_blank" rel="noreferrer" className="level-info-header-button">
                      <FontAwesomeIcon icon={faDownload} />
                    </a>
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
                          <img style={{ width: '40px' }} src={`/level_icons/level-icon-${state.level.difficulty}.svg`} alt="" />
                        </div>
                      </div>
                      <div className="level-info-detail-info-section">
                        <div className="level-info-label">
                          BPM
                        </div>
                        <div className="level-info-value">            
                          {String(state.level.minBpm).split('.')[0]}
                          <span className="level-info-value-decimal">
                            {String(state.level.minBpm).split('.')[1] === undefined ? null : `.${String(state.level.minBpm).split('.')[1]}`}
                          </span>
                          
                          {state.level.minBpm === state.level.maxBpm ? null :
                            <>
                              - 
                              {String(state.level.maxBpm).split('.')[0]}
                              <span className="level-info-value-decimal">
                                {String(state.level.maxBpm).split('.')[1] === undefined ? null : `.${String(state.level.minBpm).split('.')[1]}`}
                              </span>
                            </>
                          }
                          </div>
                      </div>
                      <div className="level-info-detail-info-section">
                        <div className="level-info-label">
                          Tiles
                        </div>
                        <div className="level-info-value">
                          {state.level.tiles}
                        </div>
                      </div>
                    </div>
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                      <div className="level-info-detail-info-section">
                        <div className="level-info-label">
                          Description
                        </div>
                        <div className="level-info-value level-info-detail-info-description ">
                          {!state.level.description ? `Woah.. There's no description for this level.` : state.level.description}
                        </div>
                      </div>
                      <LikeButton likes={state.level.likes} />
                    </div>
                      
                  </div>
                  <div className="level-info-detail-info-video">
                    <div>Wait a moment please!</div>
                    <iframe
                      src={`https://www.youtube.com/embed/${state.level.youtubeId}`}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {state.leaderboard.length > 0 ?
              <div className="level-info-leaderboard">
                <div className="content-title">
                  <h1 style={{ flexBasis: '80%', textAlign: 'left' }}>Leaderboard</h1>
                  <h3 style={{ flexBasis: '20%', textAlign: 'right', paddingTop: '20px' }}><a href="#levels">See All ▹</a></h3>
                </div>

                <div className="level-info-leaderboard-content">
                  {Object.values(state.leaderboard).map((v, index) => {
                    return <div className="level-info-leaderboard-item" style={{ color: 'white' }}>
                      <div className="level-info-leaderboard-item-rank">
                        #{index + 1}
                      </div>

                      <div className="level-info-leaderboard-item-content">
                        <div className="level-info-leaderboard-item-name">
                          {v.player.name}
                        </div>

                        <div className="level-info-leaderboard-item-detail">
                          <div className="level-info-leaderboard-item-detail-play">
                            <div className="level-info-leaderboard-item-detail-pp">
                              {(v.playPoint).toFixed(2)}
                            </div>

                            <div className="level-info-leaderboard-item-detail-play-info">
                              x{v.speed / 100} Acc {v.rawAccuracy ? `${v.rawAccuracy.toFixed(1)}%` : `UNKNOWN`}
                            </div>
                          </div>

                          <div className='level-info-leaderboard-item-detail-description'>
                            "{v.description ? v.description : `Wow! There's no description.`}"
                          </div>

                          <div className="level-info-leaderboard-item-detail-timestamp">
                            {new Date(v.timestamp).toLocaleDateString()}
                          </div>

                        </div>
                      </div>
                    </div>
                  })}
                </div>
              </div>
            : null}
          </>)}
      </div>
    </>
  );
};

export default LevelPage;