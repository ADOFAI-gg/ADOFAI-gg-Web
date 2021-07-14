const MainAddInfo = ({ playersOnline, rankedPlayers, rankedMaps, unclearedMaps }) => {
    return (
        <div className="main-additional-information">
          <table>
            <tr><h3>Players Online</h3></tr>
            <tr><h2><span className="yellow-highlight">{playersOnline}</span></h2></tr>
          </table>
          <table>
            <tr><h3>Ranked Players</h3></tr>
            <tr><h2><span className="yellow-highlight">{rankedPlayers}</span></h2></tr>
          </table>
          <table>
            <tr><h3>Ranked Maps</h3></tr>
            <tr><h2><span className="yellow-highlight">{rankedMaps}</span></h2></tr>
          </table>
          <table>
            <tr><h3>Uncleared Maps</h3></tr>
            <tr><h2><span className="yellow-highlight">{unclearedMaps}</span></h2></tr>
          </table>
        </div>
    )
}

export default MainAddInfo
