import React, { useReducer, useEffect } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import { get } from '../utils/http';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faSteam } from '@fortawesome/free-brands-svg-icons';

// Components
import LikeButton from '../components/global/LikeButton';
import LevelTags from '../components/level/LevelTags';
import SectionTitle from '../components/global/SectionTitle';

const LevelPage = ({ history }) => {
  const reduce = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return {
          ...state,
          isLoading: true
        };

      case 'FETCH_RESULT':
        const youtubeIdRegex =
          /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
        const extractedYoutubeId =
          action.level && youtubeIdRegex.exec(action.level.video);

        const hasNSFW =
          action.level && action.level.tags.some((tag) => tag.id === 4);

        return {
          ...state,
          isLoading: false,
          level: {
            ...action.level,
            thumbnail: null,
            hasNSFW: hasNSFW,
            youtubeId: extractedYoutubeId && extractedYoutubeId[1]
          },
          leaderboard: {
            ...action.leaderboard
          }
        };

      case 'FETCH_ERROR':
        return {
          ...state,
          isLoading: false,
          error: action.error
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reduce, {
    isLoading: false,
    isError: null,
    level: null,
    leaderboard: null
  });

  const ReactSwal = withReactContent(Swal);

  const PSSwal = () => {
    ReactSwal.fire({
      title: 'Include Photosensitive Sections',
      html: (
        <>
          This level features sections that include flashing imagery and could
          trigger photosensitive epilepsy.
          <br />
          <br />
          To prevent this, play the level in a well-lit room, and don't play
          this level if you're tired.
        </>
      ),
      icon: 'warning',
      heightAuto: false,
      customClass: {
        popup: 'level-info-swal-popup'
      }
    });
  };

  const NSFWWarningSwal = () => {
    ReactSwal.fire({
      title: 'Include NSFW Content',
      html: (
        <>
          This level include{' '}
          <strong>NSFW(sensational or bloody) Content</strong>.
          <br />
          <br />
          If you don't want to see a level with NSFW content,
          <br />
          please <strong>press Cancel and do NOT play this level</strong>.
        </>
      ),
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      heightAuto: false,
      customClass: {
        popup: 'level-info-swal-popup',
        container: 'level-info-nsfwswal-container'
      }
    }).then((result) => {
      if (result.isDismissed) {
        if (history.length > 1) {
          history.goBack();
        } else {
          history.push('/');
        }
      }
    });
  };

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_RESULT', level: null });
        dispatch({ type: 'FETCH_ERROR', error: null });
        dispatch({ type: 'FETCH_REQUEST' });

        const levelResponse = await get(`/levels/${id}`);
        const leaderboardResponse = await get(`/playLogs`, {
          offset: 0,
          amount: 10,
          levelId: id,
          sort: 'PP_DESC'
        });

        dispatch({
          type: 'FETCH_RESULT',
          level: levelResponse.data,
          leaderboard: leaderboardResponse.data.results
        });
      } catch (e) {
        dispatch({ type: 'FETCH_ERROR', error: e });
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (state.level && state.level.hasNSFW) {
      NSFWWarningSwal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.level]);

  const LeaderboardItem = ({ info, rank }) => {
    return (
      <a
        href={info.url}
        target='_blank'
        rel='noreferrer'
        className='level-info-leaderboard-item'
        key={`lb${rank}`}
        style={{ color: 'white' }}
      >
        <div className='level-info-leaderboard-item-rank'>#{rank + 1}</div>

        <div className='level-info-leaderboard-item-content'>
          <div className='level-info-leaderboard-item-name notranslate'>
            {info.player.name}
          </div>

          <div className='level-info-leaderboard-item-detail'>
            <div className='level-info-leaderboard-item-detail-play'>
              <div className='level-info-leaderboard-item-detail-pp'>
                {info.playPoint.toFixed(0)}
              </div>

              <div className='level-info-leaderboard-item-detail-play-info'>
                <div style={{ minWidth: '4em' }}>
                  <img
                    src={'/other_icons/speed.svg'}
                    alt='Speed Trial: '
                    style={{
                      height: '0.9em'
                    }}
                  />
                  {info.speed / 100}x
                </div>
                <div>
                  <img
                    src={'/other_icons/accuracy.svg'}
                    alt='Accurancy: '
                    style={{
                      height: '0.9em'
                    }}
                  />
                  {info.accuracy ? `${info.accuracy.toFixed(1)}%` : 'UNKNOWN'}
                </div>
              </div>
            </div>

            <div className='level-info-leaderboard-item-detail-description'>
              "
              <span>
                {info.description ? info.description : <i>No description.</i>}
              </span>
              "
            </div>

            <div className='level-info-leaderboard-item-detail-timestamp'>
              {new Date(info.timestamp).toLocaleDateString()}
            </div>
          </div>
        </div>
      </a>
    );
  };

  const LevelInfo = () => {
    if (state.isLoading || !state.level || !state.leaderboard) {
      return null;
    } else if (state.error && state.error.response.status === 404) {
      return <Redirect to='/error/unknownlevel' />;
    } else if (state.error) {
      return <h2 style={{ margin: '30px' }}>Oops! An error occurred.</h2>;
    } else {
      return (
        <>
          <section className='level-info'>
            <header className='level-info-header'>
              <img
                className='level-info-thumbnail'
                src={
                  state.level.censored
                    ? '/level_background/censored_level.svg'
                    : state.level.thumbnail ||
                      `https://i.ytimg.com/vi/${state.level.youtubeId}/original.jpg`
                }
                alt='Level Thumbnail.'
              />
              <div className='level-info-basic'>
                <div className='level-info-title'>
                  <div>
                    <div className='tooltip-container'>
                      {state.level.title.length > 21 ? (
                        <span className='level-info-tooltiptext tooltiptext'>
                          Full Name of Level
                          <br />
                          <span
                            style={{ fontWeight: '300' }}
                            className='notranslate'
                          >
                            {state.level.title}
                          </span>
                        </span>
                      ) : null}

                      <div className='level-info-name notranslate'>
                        {state.level.title}
                      </div>
                    </div>
                    <div className='level-info-author notranslate'>
                      <strong>
                        {state.level.music.artists.map((artist, index) => {
                          return (
                            <span key={`art${index}`}>
                              {index > 0 && <span>{' & '}</span>}
                              <Link to={`/levels?query=${artist.name}`}>
                                {artist.name}
                              </Link>
                            </span>
                          );
                        })}
                      </strong>
                      {' ─ Level by '}
                      <strong>
                        {state.level.creators.map((creator, index) => {
                          return (
                            <span key={`creator${index}`}>
                              {index > 0 && <span>{' & '}</span>}
                              <Link to={`/levels?query=${creator.name}`}>
                                {creator.name}
                              </Link>
                            </span>
                          );
                        })}
                      </strong>
                    </div>
                  </div>
                  <div className='level-info-tags'>
                    {!state.level.censored && state.level.difficulty === 0 ? (
                      <div className='level-info-tag level-info-warn-tag level-info-incomplete-tag' />
                    ) : null}

                    {state.level.censored && (
                      <div className='level-info-tag level-info-warn-tag level-info-censored-tag' />
                    )}

                    {state.level.hasNSFW && (
                      <div className='level-info-tag level-info-warn-tag level-info-nsfw-tag' />
                    )}

                    {state.level.epilepsyWarning && (
                      <div
                        className='level-info-tag level-info-warn-tag level-info-seizure-tag'
                        onClick={PSSwal}
                      />
                    )}

                    {state.level.tags.length !== 0
                      ? // eslint-disable-next-line array-callback-return
                        state.level.tags.map((tag, index) => {
                          if (tag.id !== 4)
                            return (
                              <LevelTags
                                tag={tag.id}
                                id={state.level.id}
                                key={`tag${index}`}
                                styleClass='level-info-tag-icon'
                              />
                            );
                        })
                      : !state.level.epilepsyWarning &&
                        !state.level.censored &&
                        !state.level.tags.hasNSFW && (
                          <img
                            className='level-info-tag-icon'
                            src={'/tag/empty.svg'}
                            alt='No Tags'
                          />
                        )}
                  </div>
                </div>
                <div className='level-info-header-buttons'>
                  {state.level.workshop && (
                    <a
                      href={state.level.workshop}
                      target='_blank'
                      rel='noreferrer'
                      className='level-info-header-button'
                    >
                      <FontAwesomeIcon icon={faSteam} />
                    </a>
                  )}
                  <a
                    href={state.level.download}
                    target='_blank'
                    rel='noreferrer'
                    className='level-info-header-button'
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </a>
                </div>
              </div>
            </header>

            <div className='level-info-details'>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '600px',
                    gap: 8,
                    alignItems: 'flex-start'
                  }}
                >
                  <div style={{ display: 'flex', gap: 4 }}>
                    <div className='level-info-detail-info-section'>
                      <div className='level-info-label'>Lv.</div>
                      <div className='level-info-value'>
                        <img
                          style={{
                            marginTop: '5px',
                            width: '32px',
                            height: '32px'
                          }}
                          src={`/difficulty_icons/${
                            state.level.censored ? '-2' : state.level.difficulty
                          }.svg`}
                          alt=''
                        />
                      </div>
                    </div>
                    <div className='level-info-detail-info-section'>
                      <div className='level-info-label'>BPM</div>
                      <div className='level-info-value'>
                        {String(state.level.music.minBpm).split('.')[0]}
                        <span className='level-info-value-decimal'>
                          {String(state.level.music.minBpm).split('.')[1] &&
                            `.${
                              String(state.level.music.minBpm).split('.')[1]
                            }`}
                        </span>

                        {state.level.music.minBpm ===
                        state.level.music.maxBpm ? null : (
                          <>
                            -{String(state.level.music.maxBpm).split('.')[0]}
                            <span className='level-info-value-decimal'>
                              {String(state.level.music.maxBpm).split('.')[1] &&
                                `.${
                                  String(state.level.music.minBpm).split('.')[1]
                                }`}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className='level-info-detail-info-section'>
                      <div className='level-info-label'>Tiles</div>
                      <div className='level-info-value'>
                        {state.level.tiles}
                      </div>
                    </div>
                  </div>

                  <div
                    className='level-info-detail-info-section'
                    style={{
                      flexGrow: 1
                    }}
                  >
                    <div className='level-info-label'>Description</div>
                    <div className='level-info-value level-info-detail-info-description '>
                      {!state.level.description
                        ? `There's no description for this level.`
                        : state.level.description}
                    </div>
                  </div>
                  <LikeButton likes={state.level.likes} />
                </div>
                <div className='level-info-detail-info-video'>
                  <div>Loading the video…</div>
                  <iframe
                    src={`https://www.youtube.com/embed/${state.level.youtubeId}`}
                    title='YouTube video player'
                    frameBorder='0'
                    // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  />
                </div>
              </div>
            </div>
          </section>

          {Object.keys(state.leaderboard).length > 0 && (
            <section className='level-info-leaderboard'>
              <SectionTitle>Leaderboard</SectionTitle>

              <div className='level-info-leaderboard-content'>
                {Object.values(state.leaderboard).map((v, index) => {
                  return (
                    <LeaderboardItem
                      info={v}
                      rank={index}
                      key={`leaderboard${index}`}
                    />
                  );
                })}
              </div>
            </section>
          )}
        </>
      );
    }
  };

  return (
    <>
      {/* Main */}
      <main>
        <LevelInfo />
      </main>
    </>
  );
};

export default LevelPage;
