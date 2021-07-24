import LevelInfo from './LevelInfo';

const recentPopularLevels = [
  {
    id: 1,
    levelId: '000000',
    levelBackground: 'level-background-1.jpg',
    levelDifficulty: 14,
    levelTitle: 'A very very very very very long level title',
    levelCreator: 'A very very long creator',
    levelBpm: '9999-9999',
    levelTiles: '9999+',
    levelComments: '9999+',
    levelLikes: '9999+',
    songTitle: 'A very very very very very long song title',
    songArtist: 'A very very long artist',
    tags: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 2,
    levelId: '000000',
    levelBackground: 'level-background-2.jpg',
    levelDifficulty: 20.5,
    levelTitle: 'A very very very very very long level title',
    levelCreator: 'A very very long creator',
    levelBpm: '9999-9999',
    levelTiles: '9999+',
    levelComments: '9999+',
    levelLikes: '9999+',
    songTitle: 'A very very very very very long song title',
    songArtist: 'A very very long artist',
    tags: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 3,
    levelId: '000000',
    levelBackground: 'level-background-3.jpg',
    levelDifficulty: 2,
    levelTitle: 'A very very very very very long level title',
    levelCreator: 'A very very long creator',
    levelBpm: '9999-9999',
    levelTiles: '9999+',
    levelComments: '9999+',
    levelLikes: '9999+',
    songTitle: 'A very very very very very long song title',
    songArtist: 'A very very long artist',
    tags: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 4,
    levelId: '000000',
    levelBackground: 'level-background-4.jpg',
    levelDifficulty: 7,
    levelTitle: 'A very very very very very long level title',
    levelCreator: 'A very very long creator',
    levelBpm: '9999-9999',
    levelTiles: '9999+',
    levelComments: '9999+',
    levelLikes: '9999+',
    songTitle: 'A very very very very very long song title',
    songArtist: 'A very very long artist',
    tags: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 5,
    levelId: '000000',
    levelBackground: 'level-background-5.jpg',
    levelDifficulty: 19.5,
    levelTitle: 'A very very very very very long level title',
    levelCreator: 'A very very long creator',
    levelBpm: '9999-9999',
    levelTiles: '9999+',
    levelComments: '9999+',
    levelLikes: '9999+',
    songTitle: 'A very very very very very long song title',
    songArtist: 'A very very long artist',
    tags: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 6,
    levelId: '000000',
    levelBackground: 'level-background-6.jpg',
    levelDifficulty: 16,
    levelTitle: 'A very very very very very long level title',
    levelCreator: 'A very very long creator',
    levelBpm: '9999-9999',
    levelTiles: '9999+',
    levelComments: '9999+',
    levelLikes: '9999+',
    songTitle: 'A very very very very very long song title',
    songArtist: 'A very very long artist',
    tags: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 7,
    levelId: '000000',
    levelBackground: 'level-background-7.jpg',
    levelDifficulty: 5,
    levelTitle: 'A very very very very very long level title',
    levelCreator: 'A very very long creator',
    levelBpm: '9999-9999',
    levelTiles: '9999+',
    levelComments: '9999+',
    levelLikes: '9999+',
    songTitle: 'A very very very very very long song title',
    songArtist: 'A very very long artist',
    tags: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 8,
    levelId: '000000',
    levelBackground: 'level-background-8.jpg',
    levelDifficulty: 9,
    levelTitle: 'A very very very very very long level title',
    levelCreator: 'A very very long creator',
    levelBpm: '9999-9999',
    levelTiles: '9999+',
    levelComments: '9999+',
    levelLikes: '9999+',
    songTitle: 'A very very very very very long song title',
    songArtist: 'A very very long artist',
    tags: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 9,
    levelId: '000000',
    levelBackground: 'level-background-9.jpg',
    levelDifficulty: 17,
    levelTitle: 'A very very very very very long level title',
    levelCreator: 'A very very long creator',
    levelBpm: '9999-9999',
    levelTiles: '9999+',
    levelComments: '9999+',
    levelLikes: '9999+',
    songTitle: 'A very very very very very long song title',
    songArtist: 'A very very long artist',
    tags: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 10,
    levelId: '000000',
    levelBackground: 'level-background-10.jpg',
    levelDifficulty: 3,
    levelTitle: 'A very very very very very long level title',
    levelCreator: 'A very very long creator',
    levelBpm: '9999-9999',
    levelTiles: '9999+',
    levelComments: '9999+',
    levelLikes: '9999+',
    songTitle: 'A very very very very very long song title',
    songArtist: 'A very very long artist',
    tags: [0, 1, 2, 3, 4, 5, 6, 7],
  }
];

const MainPopularLevels = () => {
  return (
    <div>
      <div className="content-title">
        <h1 style={{ flexBasis: '80%', textAlign: 'left' }}>Recent Popular Levels</h1>
        <h3 style={{ flexBasis: '20%', textAlign: 'right', paddingTop: '20px' }}><a href="#levels">See All ▹</a></h3>
      </div>
      <div className="main-popular-levels">
        {
          recentPopularLevels.map((recentPopularLevel) => (
            <LevelInfo recentPopularLevel={recentPopularLevel} />
          ))
        }
      </div>
    </div>
  );
}

export default MainPopularLevels;