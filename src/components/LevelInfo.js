import LevelTags from "./LevelTags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentDots } from "@fortawesome/free-solid-svg-icons";

const LevelInfo = ({ levelData, key }) => {
  return (
    <a 
			key={key} 
			href={"/levels/" + levelData.id}
			target="_blank"
      rel="noreferrer"
		>
      <div key={key} className="main-level-info">
        {/* <div className="main-level-background-container"> 
          <div style={{ backgroundImage: `url(${'level_backgrounds/' + levelData.levelBackground})` }} className="main-level-background"></div>
        </div> */}
        <div className="main-level-info-container-bottom">
          <img
            class="main-level-info-difficulty"
            src={"difficulty_icons/" + levelData.difficulty + ".svg"}
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
                {levelData.title}
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
                {levelData.creators.join(" & ")}
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
                {levelData.minBpm === levelData.maxBpm
                  ? levelData.minBpm
                  : levelData.minBpm.toString() +
                    "-" +
                    levelData.maxBpm.toString()}
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
                {levelData.tiles}
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
              <td valign="top" className="main-level-info-top">
                <FontAwesomeIcon
                  icon={faCommentDots}
                  style={{ height: "12px", weight: "12px", color: "white" }}
                />
              </td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-comments">
                {levelData.comments}
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
              <td valign="top" className="main-level-info-top">
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ height: "12px", weight: "12px", color: "#FF4E4E" }}
                />
              </td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-likes">
                {levelData.likes}
              </td>
            </tr>
          </table>
        </div>
        <div
          className="main-level-info-container-top"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          <img
            class="main-level-info-difficulty"
            style={{ marginLeft: "10px", padding: "5px" }}
            src={"difficulty_icons/" + levelData.difficulty + ".svg"}
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
                {levelData.song}
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
                {levelData.artists.join(" & ")}
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
                {levelData.tags.length !== 0 ? (
                  levelData.tags.map((tag) => (
                    <LevelTags
                      tag={tag.id}
                      id={levelData.id}
                      styleClass="main-tag"
                    />
                  ))
                ) : (
                  <span style={{ marginTop: "auto" }}>&nbsp;&nbsp;-</span>
                )}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </a>
  );
};

export default LevelInfo;
