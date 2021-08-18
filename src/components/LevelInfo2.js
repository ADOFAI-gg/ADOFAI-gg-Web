import LevelTags from './LevelTags';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots } from '@fortawesome/free-solid-svg-icons';

const LevelInfo2 = ({ recentPopularLevel }) => {
  return (
    <a key={recentPopularLevel.id} href={'/levels/' + recentPopularLevel.id}>
      <div className="main-level-info">
        {/* <div className="main-level-background-container"> 
          <div style={{ backgroundImage: `url(${'level_backgrounds/' + recentPopularLevel.levelBackground})` }} className="main-level-background"></div>
        </div> */}
        <div className="main-level-info-container-bottom">
          <img style={{ marginLeft: '10px', padding: '5px' }} src={'difficulty_icons/' + recentPopularLevel.difficulty + '.png'} alt="" />
          <table border="0" cellSpacing="0" cellPadding="0" width="400" style={{ textAlign: "left", marginLeft: "10px" }}>
            <tr>
              <td className="main-level-info-top">Level</td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-level">{recentPopularLevel.title}</td>
            </tr>  
          </table>
          <table border="0" cellSpacing="0" cellPadding="0" width="200" style={{ textAlign: "left", marginLeft: "10px" }}>
            <tr>
              <td className="main-level-info-top">Creator</td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-creator">{recentPopularLevel.creators}</td>
            </tr>  
          </table>
          <table border="0" cellSpacing="0" cellPadding="0" width="130" style={{ textAlign: "center", marginLeft: "10px" }}>
            <tr>
              <td className="main-level-info-top">BPM</td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-bpm">{recentPopularLevel.minBpm === recentPopularLevel.maxBpm ? recentPopularLevel.minBpm : recentPopularLevel.minBpm.toString() + '-' + recentPopularLevel.maxBpm.toString() }</td>
            </tr>  
          </table>
          <table border="0" cellSpacing="0" cellPadding="0" width="80" style={{ textAlign: "center", marginLeft: "10px" }}>
            <tr>
              <td className="main-level-info-top">Tiles</td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-tiles">{recentPopularLevel.tiles}</td>
            </tr>  
          </table>
          <table border="0" cellSpacing="0" cellPadding="0" width="80" style={{ textAlign: "center", marginLeft: "10px" }}>
            <tr>
						<td valign="top" className="main-level-info-top"><FontAwesomeIcon icon={faCommentDots} style={{ height: '12px', weight: '12px', color: 'white' }}/></td>

            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-comments">{recentPopularLevel.comments}</td>
            </tr>  
          </table>
          <table border="0" cellSpacing="0" cellPadding="0" width="80" style={{ textAlign: "center", marginLeft: "10px" }}>
            <tr>
              <td valign="top" className="main-level-info-top"><FontAwesomeIcon icon={faHeart} style={{ height: '12px', weight: '12px', color: '#FF4E4E' }}/></td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-likes">{recentPopularLevel.likes}</td>
            </tr>  
          </table>
        </div>
        <div className="main-level-info-container-top" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <img style={{ marginLeft: '10px', padding: '5px' }} src={'difficulty_icons/' + recentPopularLevel.difficulty + '.png'} alt="" />
          <table border="0" cellSpacing="0" cellPadding="0" width="400" style={{ textAlign: "left", marginLeft: "10px" }}>
            <tr>
              <td className="main-level-info-top">Song</td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-song">{recentPopularLevel.song}</td>
            </tr>  
          </table>
          <table border="0" cellSpacing="0" cellPadding="0" width="250" style={{ textAlign: "left", marginLeft: "10px" }}>
            <tr>
              <td className="main-level-info-top">Artist</td>
            </tr>
            <tr>
              <td valign="bottom" className="main-level-info-artist">{recentPopularLevel.artists}</td>
            </tr>  
          </table>
          <table border="0" cellSpacing="0" cellPadding="0" width="335" style={{ textAlign: "left", marginLeft: "10px" }}>
            <tr>
              <td className="main-level-info-top">Tags</td>
            </tr>
            <tr>
              {/* <td valign="bottom" className="main-level-info-tags">
                {recentPopularLevel.tags.map((tag) => (
                  <LevelTags tag={tag} styleClass='main-tag' />
                ))}
              </td> */}
            </tr>  
          </table>
        </div>
      </div>
    </a>
  );
}

export default LevelInfo2;