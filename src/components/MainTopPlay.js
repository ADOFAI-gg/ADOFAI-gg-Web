const MainTopPlay = ({ recentTopPlay }) => {
    return (
        <a key={recentTopPlay.id} href={recentTopPlay.playVideo} target="_blank">
            <div className="main-top-plays-container">
              <img className="main-top-plays-image" src={'https://i3.ytimg.com/vi/' + recentTopPlay.playVideo.split('=')[1] + '/0.jpg'} alt="" />
              <div className="main-top-plays-title"><a href={'#map?id=' + recentTopPlay.mapId}>{recentTopPlay.mapTitle}</a></div>
              <img className="main-top-plays-level" src={'http://localhost:3000/level_icons/' + recentTopPlay.mapLevel + '.png'} alt="" />
              <div className="main-top-plays-subtitle">{recentTopPlay.mapSubTitle}</div>
              <div className="main-top-plays-player">{recentTopPlay.playerName}</div>
              <div className="main-top-plays-speed">Speed: <span className="yellow-highlight">{recentTopPlay.playPitch + '%'}</span></div>
              <div className="main-top-plays-acc">Acc: <span className="yellow-highlight">{recentTopPlay.playAcc + '%'}</span></div>
            </div>
          </a>
    )
}

export default MainTopPlay
