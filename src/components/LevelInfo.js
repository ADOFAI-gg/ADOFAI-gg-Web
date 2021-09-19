import React from "react";
import { Link } from "react-router-dom";

// Components
import LevelTags from "./LevelTags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentDots } from "@fortawesome/free-solid-svg-icons";

const LevelInfo = ({ levelData, key }) => {
  const {
    id,
    title,
    difficulty,
    creators,
    // songId,
    song,
    artists,
    minBpm,
    maxBpm,
    tiles,
    comments,
    likes,
    tags,
  } = levelData;

  const LevelDifficulty = () => {
    return (
      <img
        className="level-item-info-difficulty"
        src={`difficulty_icons/${difficulty}.svg`}
        alt={`Lv. ${difficulty}`}
      />
    );
  };

  return (
    <Link key={key} to={"/levels/" + id}>
      <article key={key} className="level-item-info">
        {/* <div className="level-item-info-background-container ">
          <div
            style={{
              backgroundImage: `url(${
                "level_backgrounds/" + levelData.levelBackground
              })`,
            }}
            className="level-item-info-background"
          ></div>
        </div> */}

        <div className="level-item-info-container-normal">
          <LevelDifficulty />

          <div className="level-item-info-section" style={{ width: "400px" }}>
            <div className="level-item-info-label">Level</div>
            <div className="level-item-info-value">{title}</div>
          </div>

          <div className="level-item-info-section" style={{ width: "200px" }}>
            <div className="level-item-info-label">Creator</div>
            <div className="level-item-info-value">{creators.join(" & ")}</div>
          </div>

          <div
            className="level-item-info-section level-item-info-section-center"
            style={{ width: "130px" }}
          >
            <div className="level-item-info-label">BPM</div>
            <div className="level-item-info-value">
              {minBpm === maxBpm
                ? minBpm
                : minBpm.toString() + "-" + maxBpm.toString()}
            </div>
          </div>

          <div
            className="level-item-info-section level-item-info-section-center"
            style={{ width: "80px" }}
          >
            <div className="level-item-info-label">Tiles</div>
            <div className="level-item-info-value">{tiles}</div>
          </div>

          <div
            className="level-item-info-section level-item-info-section-center"
            style={{ width: "80px" }}
          >
            <div className="level-item-info-label">
              <FontAwesomeIcon
                icon={faCommentDots}
                style={{ height: "12px", weight: "12px", color: "white" }}
              />
            </div>
            <div className="level-item-info-value">{comments}</div>
          </div>

          <div
            className="level-item-info-section level-item-info-section-center"
            style={{ width: "80px" }}
          >
            <div className="level-item-info-label">
              <FontAwesomeIcon
                icon={faHeart}
                style={{ height: "12px", weight: "12px", color: "#FF4E4E" }}
              />
            </div>
            <div className="level-item-info-value">{likes}</div>
          </div>
        </div>

        <div
          className="level-item-info-container-hover"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          <LevelDifficulty />
          <div className="level-item-info-section" style={{ width: "400px" }}>
            <div className="level-item-info-label">Song</div>
            <div className="level-item-info-value">{song}</div>
          </div>

          <div className="level-item-info-section" style={{ width: "250px" }}>
            <div className="level-item-info-label">Artist</div>
            <div className="level-item-info-value">{artists.join(" & ")}</div>
          </div>

          <div className="level-item-info-section" style={{ width: "335px" }}>
            <div className="level-item-info-label">Tags</div>
            <div className="level-item-info-value">
              {" "}
              {tags.length !== 0 ? (
                tags.map((tag) => (
                  <LevelTags tag={tag.id} id={id} styleClass="main-tag" />
                ))
              ) : (
                <img
                  className="main-tag"
                  src={"/tag/empty.svg"}
                  alt="No Tags"
                />
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default LevelInfo;
