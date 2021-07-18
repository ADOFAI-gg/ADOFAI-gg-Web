import LevelTags from './LevelTags';

const LevelInfo = ({ recentPopularLevel }) => {
  return (
    <a key={recentPopularLevel.id} href={'#level?id=' + recentPopularLevel.levelId}>
      <div className="map-info">
        <div style={{ backgroundImage: `url(${'http://localhost:3000/' + recentPopularLevel.levelBackground})` }} className="map-info-container-background"></div>
        <div className="map-info-container-bottom">
          <img style={{ marginLeft: '10px' }} src={'http://localhost:3000/level_icons/' + recentPopularLevel.levelDifficulty + '.png'} alt="" />
          <table border="0" cellSpacing="0" cellPadding="0" width="400" style={{ textAlign: "left", marginLeft: "10px" }}>
            <tr>
              <td className="map-info-top">Level</td>
            </tr>
            <tr>
              <td valign="bottom" className="map-info-map">{recentPopularLevel.levelTitle}</td>
            </tr>  
          </table>
          <table border="0" cellSpacing="0" cellPadding="0" width="200" style={{ textAlign: "left", marginLeft: "10px" }}>
            <tr>
              <td className="map-info-top">Creator</td>
            </tr>
            <tr>
              <td valign="bottom" className="map-info-creator">{recentPopularLevel.levelCreator}</td>
            </tr>  
          </table>
          <table border="0" cellSpacing="0" cellPadding="0" width="130" style={{ textAlign: "center", marginLeft: "10px" }}>
            <tr>
              <td className="map-info-top">BPM</td>
            </tr>
            <tr>
              <td valign="bottom" className="map-info-bpm">{recentPopularLevel.levelBpm}</td>
            </tr>  
          </table>
          <table border="0" cellSpacing="0" cellPadding="0" width="80" style={{ textAlign: "center", marginLeft: "10px" }}>
            <tr>
              <td className="map-info-top">Tiles</td>
            </tr>
            <tr>
              <td valign="bottom" className="map-info-tiles">{recentPopularLevel.levelTiles}</td>
            </tr>  
          </table>
          <table border="0" cellSpacing="0" cellPadding="0" width="80" style={{ textAlign: "center", marginLeft: "10px" }}>
            <tr>
              <td valign="bottom" className="map-info-top"><img style={{ height: '12px' }} src="http://localhost:3000/comment.svg" alt="" /></td>
            </tr>
            <tr>
              <td valign="bottom" className="map-info-comments">{recentPopularLevel.levelComments}</td>
            </tr>  
          </table>
          <table border="0" cellSpacing="0" cellPadding="0" width="80" style={{ textAlign: "center", marginLeft: "10px" }}>
            <tr>
              <td valign="bottom" className="map-info-top"><img style={{ height: '12px' }} src="http://localhost:3000/heart.svg" alt="" /></td>
            </tr>
            <tr>
              <td valign="bottom" className="map-info-likes">{recentPopularLevel.levelLikes}</td>
            </tr>  
          </table>
        </div>
        <div className="map-info-container-top">
          <img style={{ marginLeft: '10px' }} src={'http://localhost:3000/level_icons/' + recentPopularLevel.levelDifficulty + '.png'} alt="" />
          <table border="0" cellSpacing="0" cellPadding="0" width="400" style={{ textAlign: "left", marginLeft: "10px" }}>
            <tr>
              <td className="map-info-top">Song</td>
            </tr>
            <tr>
              <td valign="bottom" className="map-info-song">{recentPopularLevel.songTitle}</td>
            </tr>  
          </table>
          <table border="0" cellSpacing="0" cellPadding="0" width="250" style={{ textAlign: "left", marginLeft: "10px" }}>
            <tr>
              <td className="map-info-top">Artist</td>
            </tr>
            <tr>
              <td valign="bottom" className="map-info-artist">{recentPopularLevel.songArtist}</td>
            </tr>  
          </table>
          <table border="0" cellSpacing="0" cellPadding="0" width="335" style={{ textAlign: "left", marginLeft: "10px" }}>
            <tr>
              <td className="map-info-top">Tags</td>
            </tr>
            <tr>
              <td valign="bottom" className="map-info-tags">
                {recentPopularLevel.tags.map((tag) => (
                  <LevelTags tag={tag} />
                ))}
              </td>
            </tr>  
          </table>
        </div>
      </div>
    </a>
  );
}

export default LevelInfo;