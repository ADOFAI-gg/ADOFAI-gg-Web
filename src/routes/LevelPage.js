import React, { useReducer, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faSteam } from "@fortawesome/free-brands-svg-icons";

// Components
import LikeButton from "../components/global/LikeButton";
import LevelTags from "../components/level/LevelTags";

const LevelPage = ({ history }) => {
  const reduce = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return {
          ...state,
          isLoading: true,
        };

      case "FETCH_RESULT":
        return {
          ...state,
          isLoading: false,
          level: {
            ...action.level,
            thumbnail: null,
            hasNSFW:
              action.level && action.level.tags.some((tag) => tag.id === 23),
            youtubeId:
              action.level &&
              /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/.exec(
                action.level.video
              )[1],
          },
          leaderboard: {
            ...action.leaderboard,
          },
        };

      case "FETCH_ERROR":
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
      title: "What is Photosensitive Seizure?",
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
        popup: "level-info-swal-popup",
      },
    });
  };

  const NSFWWarningSwal = () => {
    Swal.fire({
      title: "Are you sure?",
      html: `
      This level contains <strong>NSFW content</strong>.
      <br>
      <br>If you are a minor or don't want to see a level with sexual content, please <strong>press Cancel and do NOT play this level</strong>.
      `,
      icon: "warning",
      showCancelButton: true,
      allowOutsideClick: false,
      customClass: {
        popup: "level-info-swal-popup",
        container: "level-info-nsfwswal-container",
      },
    }).then((result) => {
      if (result.isDismissed) {
        if (history.length > 1) {
          history.goBack();
        } else {
          history.push("/");
        }
      }
    });
  };

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_RESULT", level: null });
        dispatch({ type: "FETCH_ERROR", error: null });
        dispatch({ type: "FETCH_REQUEST" });

        const levelResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/levels/${id}`
        );
        const leaderboardResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/playLogs`,
          {
            params: {
              offset: 0,
              amount: 10,
              levelId: id,
              sort: "PP_DESC",
            },
          }
        );

        dispatch({
          type: "FETCH_RESULT",
          level: levelResponse.data,
          leaderboard: leaderboardResponse.data.results,
        });
      } catch (e) {
        dispatch({ type: "FETCH_ERROR", error: e });
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

  return (
    <>
      {/* Main */}
      <main>
        {state.isLoading ? null : !state.level ||
          !state.leaderboard ? null : state.isError ||
          state.level.title === undefined ? (
          <h2 style={{ margin: "30px" }}>Oops! An error occurred.</h2>
        ) : (
          <>
            <section className="level-info">
              <header className="level-info-header">
                <img
                  className="level-info-thumbnail"
                  src={
                    state.level.censored
                      ? "/level_background/censored_level.svg"
                      : state.level.thumbnail ||
                        `https://i.ytimg.com/vi/${state.level.youtubeId}/original.jpg`
                  }
                  alt="Level Thumbnail."
                />
                <div className="level-info-basic">
                  <div className="level-info-title">
                    <div>
                      <div className="tooltip-container">
                        {state.level.title.length > 21 ? (
                          <span className="level-info-tooltiptext tooltiptext">
                            Full Name of Level
                            <br />
                            <span
                              style={{ fontWeight: "300" }}
                              className="notranslate"
                            >
                              {state.level.title}
                            </span>
                          </span>
                        ) : null}

                        <div className="level-info-name notranslate">
                          {state.level.title}
                        </div>
                      </div>
                      <div className="level-info-song-name notranslate">
                        {state.level.song}
                      </div>
                      <div className="level-info-author notranslate">
                        <strong>
                          {state.level.artists.map((artist, index) => {
                            return (
                              <>
                                <span>{index > 0 ? " & " : null}</span>
                                <Link to={`/levels?query=${artist}`}>
                                  {artist}
                                </Link>
                              </>
                            );
                          })}
                        </strong>
                        {" ─ Level by "}
                        <strong>
                          {state.level.creators.map((creator, index) => {
                            return (
                              <>
                                <span>{index > 0 ? " & " : null}</span>
                                <Link to={`/levels?query=${creator}`}>
                                  {creator}
                                </Link>
                              </>
                            );
                          })}
                        </strong>
                      </div>
                    </div>
                    <div className="level-info-tags">
                      {!state.level.censored && state.level.difficulty === 0 ? (
                        <div className="level-info-tag level-info-warn-tag level-info-incomplete-tag" />
                      ) : null}

                      {state.level.censored ? (
                        <div className="level-info-tag level-info-warn-tag level-info-censored-tag" />
                      ) : null}

                      {state.level.hasNSFW ? (
                        <div className="level-info-tag level-info-warn-tag level-info-nsfw-tag" />
                      ) : null}

                      {state.level.epilepsyWarning ? (
                        <div
                          className="level-info-tag level-info-warn-tag level-info-seizure-tag"
                          onClick={PSSwal}
                        />
                      ) : null}

                      {state.level.tags.length !== 0
                        ? // eslint-disable-next-line array-callback-return
                          state.level.tags.map((tag) => {
                            if (tag.id !== 23)
                              return (
                                <LevelTags
                                  tag={tag.id}
                                  id={state.level.id}
                                  styleClass="level-info-tag-icon"
                                />
                              );
                          })
                        : !state.level.epilepsyWarning &&
                          !state.level.censored &&
                          !state.level.tags.hasNSFW && (
                            <img
                              className="level-info-tag-icon"
                              src={"/tag/empty.svg"}
                              alt="No Tags"
                            />
                          )}
                    </div>
                  </div>
                  <div className="level-info-header-buttons">
                    {!state.level.workshop ? null : (
                      <a
                        href={state.level.workshop}
                        target="_blank"
                        rel="noreferrer"
                        className="level-info-header-button"
                      >
                        <FontAwesomeIcon icon={faSteam} />
                      </a>
                    )}
                    <a
                      href={state.level.download}
                      target="_blank"
                      rel="noreferrer"
                      className="level-info-header-button"
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </a>
                  </div>
                </div>
              </header>

              <div className="level-info-details">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "600px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div className="level-info-detail-info-section">
                        <div
                          className="level-info-label"
                          style={{ textAlign: "center" }}
                        >
                          Lv.
                        </div>
                        <div className="level-info-value">
                          <img
                            style={{
                              marginTop: "5px",
                              width: "32px",
                              height: "32px",
                            }}
                            src={`/difficulty_icons/${
                              state.level.censored
                                ? "-2"
                                : state.level.difficulty
                            }.svg`}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="level-info-detail-info-section">
                        <div className="level-info-label">BPM</div>
                        <div className="level-info-value">
                          {String(state.level.minBpm).split(".")[0]}
                          <span className="level-info-value-decimal">
                            {String(state.level.minBpm).split(".")[1] ===
                            undefined
                              ? null
                              : `.${String(state.level.minBpm).split(".")[1]}`}
                          </span>

                          {state.level.minBpm === state.level.maxBpm ? null : (
                            <>
                              -{String(state.level.maxBpm).split(".")[0]}
                              <span className="level-info-value-decimal">
                                {String(state.level.maxBpm).split(".")[1] ===
                                undefined
                                  ? null
                                  : `.${
                                      String(state.level.minBpm).split(".")[1]
                                    }`}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="level-info-detail-info-section">
                        <div className="level-info-label">Tiles</div>
                        <div className="level-info-value">
                          {state.level.tiles}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <div className="level-info-detail-info-section">
                        <div className="level-info-label">Description</div>
                        <div className="level-info-value level-info-detail-info-description ">
                          {!state.level.description
                            ? `There's no description for this level.`
                            : state.level.description}
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
            </section>

            {Object.keys(state.leaderboard).length > 0 ? (
              <section className="level-info-leaderboard">
                <div className="content-title">
                  <h1 style={{ flexBasis: "80%", textAlign: "left" }}>
                    Leaderboard
                  </h1>
                </div>

                <div className="level-info-leaderboard-content">
                  {Object.values(state.leaderboard).map((v, index) => {
                    return (
                      <a
                        href={v.url}
                        target="_blank"
                        rel="noreferrer"
                        className="level-info-leaderboard-item"
                        style={{ color: "white" }}
                      >
                        <div className="level-info-leaderboard-item-rank">
                          #{index + 1}
                        </div>

                        <div className="level-info-leaderboard-item-content">
                          <div className="level-info-leaderboard-item-name notranslate">
                            {v.player.name}
                          </div>

                          <div className="level-info-leaderboard-item-detail">
                            <div className="level-info-leaderboard-item-detail-play">
                              <div className="level-info-leaderboard-item-detail-pp">
                                {v.playPoint.toFixed(0)}
                              </div>

                              <div className="level-info-leaderboard-item-detail-play-info">
                                <div style={{ minWidth: "4em" }}>
                                  <img
                                    src={"/other_icons/speed.svg"}
                                    alt="Speed Trial: "
                                    style={{
                                      height: "0.9em",
                                    }}
                                  />
                                  {v.speed / 100}x
                                </div>
                                <div>
                                  <img
                                    src={"/other_icons/accuracy.svg"}
                                    alt="Accurancy: "
                                    style={{
                                      height: "0.9em",
                                    }}
                                  />
                                  {v.rawAccuracy
                                    ? `${v.rawAccuracy.toFixed(1)}%`
                                    : "UNKNOWN"}
                                </div>
                              </div>
                            </div>

                            <div className="level-info-leaderboard-item-detail-description">
                              "
                              {v.description ? (
                                v.description
                              ) : (
                                <i>No description.</i>
                              )}
                              "
                            </div>

                            <div className="level-info-leaderboard-item-detail-timestamp">
                              {new Date(v.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </>
        )}
      </main>
    </>
  );
};

export default LevelPage;
