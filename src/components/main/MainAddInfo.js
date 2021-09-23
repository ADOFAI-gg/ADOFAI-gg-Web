const MainAddInfo = ({
  playersOnline,
  rankedPlayers,
  rankedLevels,
  unclearedLevels,
}) => {
  return (
    <section className="main-additional-information">
      <table>
        <tr>
          <h3>Players Online</h3>
        </tr>
        <tr>
          <h2>
            <span className="main-yellow-highlight">{playersOnline}</span>
          </h2>
        </tr>
      </table>
      <table>
        <tr>
          <h3>Ranked Players</h3>
        </tr>
        <tr>
          <h2>
            <span className="main-yellow-highlight">{rankedPlayers}</span>
          </h2>
        </tr>
      </table>
      <table>
        <tr>
          <h3>Ranked Levels</h3>
        </tr>
        <tr>
          <h2>
            <span className="main-yellow-highlight">{rankedLevels}</span>
          </h2>
        </tr>
      </table>
      <table>
        <tr>
          <h3>Uncleared Levels</h3>
        </tr>
        <tr>
          <h2>
            <span className="main-yellow-highlight">{unclearedLevels}</span>
          </h2>
        </tr>
      </table>
    </section>
  );
};

export default MainAddInfo;
