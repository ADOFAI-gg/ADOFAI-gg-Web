import MainTopPlay from "./MainTopPlay";

const recentTopPlays = [
  {
    id: 1,
    levelId: "000000",
    levelTitle: "A very very very long title",
    levelSubTitle: "(Nerfed)",
    levelDifficulty: "18.5",
    playerName: "A very very very long player name",
    playPitch: "999.99",
    playAcc: "999.99",
    playVideo: "https://www.youtube.com/watch?v=kTwAMfwvnz0",
  },
  {
    id: 2,
    levelId: "000000",
    levelTitle: "A very very very long title",
    levelSubTitle: "(Nerfed)",
    levelDifficulty: "19",
    playerName: "A very very very long player name",
    playPitch: "999.99",
    playAcc: "999.99",
    playVideo: "https://www.youtube.com/watch?v=ELOLmVDLC8w",
  },
  {
    id: 3,
    levelId: "000000",
    levelTitle: "A very very very long title",
    levelSubTitle: "(Nerfed)",
    levelDifficulty: "20.5",
    playerName: "A very very very long player name",
    playPitch: "999.99",
    playAcc: "999.99",
    playVideo: "https://www.youtube.com/watch?v=SW0dTKOse-U",
  },
  {
    id: 4,
    levelId: "000000",
    levelTitle: "A very very very long title",
    levelSubTitle: "(Nerfed)",
    levelDifficulty: "17.5",
    playerName: "A very very very long player name",
    playPitch: "999.99",
    playAcc: "999.99",
    playVideo: "https://www.youtube.com/watch?v=xGoPVsl3n1c",
  },
  {
    id: 5,
    levelId: "000000",
    levelTitle: "A very very very long title",
    levelSubTitle: "(Nerfed)",
    levelDifficulty: "20.5",
    playerName: "A very very very long player name",
    playPitch: "999.99",
    playAcc: "999.99",
    playVideo: "https://www.youtube.com/watch?v=B9iDpTEcTMM",
  },
  {
    id: 6,
    levelId: "000000",
    levelTitle: "A very very very long title",
    levelSubTitle: "(Nerfed)",
    levelDifficulty: "18",
    playerName: "A very very very long player name",
    playPitch: "999.99",
    playAcc: "999.99",
    playVideo: "https://www.youtube.com/watch?v=1kn5PflT0l4",
  },
  {
    id: 7,
    levelId: "000000",
    levelTitle: "A very very very long title",
    levelSubTitle: "(Nerfed)",
    levelDifficulty: "17",
    playerName: "A very very very long player name",
    playPitch: "999.99",
    playAcc: "999.99",
    playVideo: "https://www.youtube.com/watch?v=b8FDJfqQ82Y",
  },
  {
    id: 8,
    levelId: "000000",
    levelTitle: "A very very very long title",
    levelSubTitle: "(Nerfed)",
    levelDifficulty: "20",
    playerName: "A very very very long player name",
    playPitch: "999.99",
    playAcc: "999.99",
    playVideo: "https://www.youtube.com/watch?v=SXvUH-fiHgU",
  },
];

const MainTopPlays = () => {
  return (
    <div>
      <div className="content-title">
        <h1 style={{ flexBasis: "80%", textAlign: "left" }}>
          Recent Top Plays
        </h1>
        <h3
          style={{ flexBasis: "20%", textAlign: "right", paddingTop: "20px" }}
        >
          <a href="#top-plays">See All ▹</a>
        </h3>
      </div>
      <div className="main-top-plays">
        {recentTopPlays.map((recentTopPlay) => (
          <MainTopPlay recentTopPlay={recentTopPlay} />
        ))}
      </div>
    </div>
  );
};

export default MainTopPlays;
