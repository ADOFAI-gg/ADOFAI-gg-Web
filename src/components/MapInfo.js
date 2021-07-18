import MapTags from './MapTags';

const MapInfo = ({ recentPopularMap }) => {
    return (
        <a key={recentPopularMap.id} href={'#map?id=' + recentPopularMap.mapId}>
            <div className="map-info">
                <div style={{ backgroundImage: `url(${'http://localhost:3000/' + recentPopularMap.mapBackground})` }} className="map-info-container-background"></div>
                <div className="map-info-container-bottom">
                    <img style={{ marginLeft: '10px' }} src={'http://localhost:3000/level_icons/' + recentPopularMap.mapLevel + '.png'} alt="" />
                    <table border="0" cellSpacing="0" cellPadding="0" width="400" style={{ textAlign: "left", marginLeft: "10px" }}>
                        <tr>
                            <td className="map-info-top">Map</td>
                        </tr>
                        <tr>
                            <td valign="bottom" className="map-info-map">{recentPopularMap.mapTitle}</td>
                        </tr>  
                    </table>
                    <table border="0" cellSpacing="0" cellPadding="0" width="200" style={{ textAlign: "left", marginLeft: "10px" }}>
                        <tr>
                            <td className="map-info-top">Creator</td>
                        </tr>
                        <tr>
                            <td valign="bottom" className="map-info-creator">{recentPopularMap.mapCreator}</td>
                        </tr>  
                    </table>
                    <table border="0" cellSpacing="0" cellPadding="0" width="130" style={{ textAlign: "center", marginLeft: "10px" }}>
                        <tr>
                            <td className="map-info-top">BPM</td>
                        </tr>
                        <tr>
                            <td valign="bottom" className="map-info-bpm">{recentPopularMap.mapBpm}</td>
                        </tr>  
                    </table>
                    <table border="0" cellSpacing="0" cellPadding="0" width="80" style={{ textAlign: "center", marginLeft: "10px" }}>
                        <tr>
                            <td className="map-info-top">Tiles</td>
                        </tr>
                        <tr>
                            <td valign="bottom" className="map-info-tiles">{recentPopularMap.mapTiles}</td>
                        </tr>  
                    </table>
                    <table border="0" cellSpacing="0" cellPadding="0" width="80" style={{ textAlign: "center", marginLeft: "10px" }}>
                        <tr>
                            <td valign="bottom" className="map-info-top"><img style={{ height: '12px' }} src="http://localhost:3000/comment.svg" alt="" /></td>
                        </tr>
                        <tr>
                            <td valign="bottom" className="map-info-comments">{recentPopularMap.mapComments}</td>
                        </tr>  
                    </table>
                    <table border="0" cellSpacing="0" cellPadding="0" width="80" style={{ textAlign: "center", marginLeft: "10px" }}>
                        <tr>
                            <td valign="bottom" className="map-info-top"><img style={{ height: '12px' }} src="http://localhost:3000/heart.svg" alt="" /></td>
                        </tr>
                        <tr>
                            <td valign="bottom" className="map-info-likes">{recentPopularMap.mapLikes}</td>
                        </tr>  
                    </table>
                </div>
                <div className="map-info-container-top">
                    <img style={{ marginLeft: '10px' }} src={'http://localhost:3000/level_icons/' + recentPopularMap.mapLevel + '.png'} alt="" />
                    <table border="0" cellSpacing="0" cellPadding="0" width="400" style={{ textAlign: "left", marginLeft: "10px" }}>
                        <tr>
                            <td className="map-info-top">Song</td>
                        </tr>
                        <tr>
                            <td valign="bottom" className="map-info-song">{recentPopularMap.songTitle}</td>
                        </tr>  
                    </table>
                    <table border="0" cellSpacing="0" cellPadding="0" width="250" style={{ textAlign: "left", marginLeft: "10px" }}>
                        <tr>
                            <td className="map-info-top">Artist</td>
                        </tr>
                        <tr>
                            <td valign="bottom" className="map-info-artist">{recentPopularMap.songArtist}</td>
                        </tr>  
                    </table>
                    <table border="0" cellSpacing="0" cellPadding="0" width="335" style={{ textAlign: "left", marginLeft: "10px" }}>
                        <tr>
                            <td className="map-info-top">Tags</td>
                        </tr>
                        <tr>
                            <td valign="bottom" className="map-info-tags">
                                {recentPopularMap.tags.map((tag) => (
                                    <MapTags tag={tag} />
                                ))}
                            </td>
                        </tr>  
                    </table>
                </div>
            </div>
        </a>
    )
}

export default MapInfo
