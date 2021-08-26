import LevelTags from "./LevelTags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const LevelInfo = ({ recentPopularLevel }) => {
  return (
    <a
      key={recentPopularLevel.id}
      href={"/levels/" + recentPopularLevel.levelId}
    >
      <div className="main-level-info">
        <div className="main-level-background-container">
          <div
            style={{
              backgroundImage: `url(${
                "level_backgrounds/" + recentPopularLevel.levelBackground
              })`,
            }}
            className="main-level-background"
          ></div>
        </div>
        <div className="main-level-info-container-bottom">
          <img
            style={{ marginLeft: "10px" }}
            src={
              "level_icons/level-icon-" +
              recentPopularLevel.levelDifficulty +
              ".svg"
            }
            alt=""
          />
          <table
            border="0"
            cellSpacing="0"
            cellPadding="0"
            width="400"
            style={{ textAlign: "left", marginLeft: "10px" }}
          >
            <tr>
              <td className="main-level-info-top">Level</td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-level">
                {recentPopularLevel.levelTitle}
              </td>
            </tr>
          </table>
          <table
            border="0"
            cellSpacing="0"
            cellPadding="0"
            width="200"
            style={{ textAlign: "left", marginLeft: "10px" }}
          >
            <tr>
              <td className="main-level-info-top">Creator</td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-creator">
                {recentPopularLevel.levelCreator.join(" & ")}
              </td>
            </tr>
          </table>
          <table
            border="0"
            cellSpacing="0"
            cellPadding="0"
            width="130"
            style={{ textAlign: "center", marginLeft: "10px" }}
          >
            <tr>
              <td className="main-level-info-top">BPM</td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-bpm">
                {recentPopularLevel.levelBpm}
              </td>
            </tr>
          </table>
          <table
            border="0"
            cellSpacing="0"
            cellPadding="0"
            width="80"
            style={{ textAlign: "center", marginLeft: "10px" }}
          >
            <tr>
              <td className="main-level-info-top">Tiles</td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-tiles">
                {recentPopularLevel.levelTiles}
              </td>
            </tr>
          </table>
          <table
            border="0"
            cellSpacing="0"
            cellPadding="0"
            width="80"
            style={{ textAlign: "center", marginLeft: "10px" }}
          >
            <tr>
              <td valign="bottom" className="main-level-info-top">
                <img
                  style={{ height: "12px" }}
                  src="other_icons/comment.svg"
                  alt=""
                />
              </td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-comments">
                {recentPopularLevel.levelComments}
              </td>
            </tr>
          </table>
          <table
            border="0"
            cellSpacing="0"
            cellPadding="0"
            width="80"
            style={{ textAlign: "center", marginLeft: "10px" }}
          >
            <tr>
              <td valign="bottom" className="main-level-info-top">
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ height: "12px", weight: "12px", color: "#FF4E4E" }}
                />
              </td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-likes">
                {recentPopularLevel.levelLikes}
              </td>
            </tr>
          </table>
        </div>
        <div className="main-level-info-container-top">
          <img
            style={{ marginLeft: "10px" }}
            src={
              "level_icons/level-icon-" +
              recentPopularLevel.levelDifficulty +
              ".svg"
            }
            alt=""
          />
          <table
            border="0"
            cellSpacing="0"
            cellPadding="0"
            width="400"
            style={{ textAlign: "left", marginLeft: "10px" }}
          >
            <tr>
              <td className="main-level-info-top">Song</td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-song">
                {recentPopularLevel.songTitle}
              </td>
            </tr>
          </table>
          <table
            border="0"
            cellSpacing="0"
            cellPadding="0"
            width="250"
            style={{ textAlign: "left", marginLeft: "10px" }}
          >
            <tr>
              <td className="main-level-info-top">Artist</td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-artist">
                {recentPopularLevel.songArtist.join(" & ")}
              </td>
            </tr>
          </table>
          <table
            border="0"
            cellSpacing="0"
            cellPadding="0"
            width="335"
            style={{ textAlign: "left", marginLeft: "10px" }}
          >
            <tr>
              <td className="main-level-info-top">Tags</td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-tags">
                {recentPopularLevel.tags.map((tag) => (
                  <LevelTags tag={tag} styleClass="main-tag" />
                ))}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </a>
  );
};

export default LevelInfo;
