import MapInfo from './MapInfo';

const recentPopularMaps = [
    {
        id: 1,
        mapId: '000000',
        mapBackground: 'map-background.png',
        mapLevel: 18,
        mapTitle: 'A very very very very very long map title',
        mapCreator: 'A very very long creator',
        mapBpm: '9999-9999',
        mapTiles: '9999+',
        mapComments: '9999+',
        mapLikes: '9999+',
        songTitle: 'A very very very very very long song title',
        songArtist: 'A very very long artist',
        tags: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    {
        id: 2,
        mapId: '000000',
        mapBackground: 'map-background.png',
        mapLevel: 18,
        mapTitle: 'A very very very very very long map title',
        mapCreator: 'A very very long creator',
        mapBpm: '9999-9999',
        mapTiles: '9999+',
        mapComments: '9999+',
        mapLikes: '9999+',
        songTitle: 'A very very very very very long song title',
        songArtist: 'A very very long artist',
        tags: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    {
        id: 3,
        mapId: '000000',
        mapBackground: 'map-background.png',
        mapLevel: 18,
        mapTitle: 'A very very very very very long map title',
        mapCreator: 'A very very long creator',
        mapBpm: '9999-9999',
        mapTiles: '9999+',
        mapComments: '9999+',
        mapLikes: '9999+',
        songTitle: 'A very very very very very long song title',
        songArtist: 'A very very long artist',
        tags: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    {
        id: 4,
        mapId: '000000',
        mapBackground: 'map-background.png',
        mapLevel: 18,
        mapTitle: 'A very very very very very long map title',
        mapCreator: 'A very very long creator',
        mapBpm: '9999-9999',
        mapTiles: '9999+',
        mapComments: '9999+',
        mapLikes: '9999+',
        songTitle: 'A very very very very very long song title',
        songArtist: 'A very very long artist',
        tags: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    {
        id: 5,
        mapId: '000000',
        mapBackground: 'map-background.png',
        mapLevel: 18,
        mapTitle: 'A very very very very very long map title',
        mapCreator: 'A very very long creator',
        mapBpm: '9999-9999',
        mapTiles: '9999+',
        mapComments: '9999+',
        mapLikes: '9999+',
        songTitle: 'A very very very very very long song title',
        songArtist: 'A very very long artist',
        tags: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    {
        id: 6,
        mapId: '000000',
        mapBackground: 'map-background.png',
        mapLevel: 18,
        mapTitle: 'A very very very very very long map title',
        mapCreator: 'A very very long creator',
        mapBpm: '9999-9999',
        mapTiles: '9999+',
        mapComments: '9999+',
        mapLikes: '9999+',
        songTitle: 'A very very very very very long song title',
        songArtist: 'A very very long artist',
        tags: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    {
        id: 7,
        mapId: '000000',
        mapBackground: 'map-background.png',
        mapLevel: 18,
        mapTitle: 'A very very very very very long map title',
        mapCreator: 'A very very long creator',
        mapBpm: '9999-9999',
        mapTiles: '9999+',
        mapComments: '9999+',
        mapLikes: '9999+',
        songTitle: 'A very very very very very long song title',
        songArtist: 'A very very long artist',
        tags: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    {
        id: 8,
        mapId: '000000',
        mapBackground: 'map-background.png',
        mapLevel: 18,
        mapTitle: 'A very very very very very long map title',
        mapCreator: 'A very very long creator',
        mapBpm: '9999-9999',
        mapTiles: '9999+',
        mapComments: '9999+',
        mapLikes: '9999+',
        songTitle: 'A very very very very very long song title',
        songArtist: 'A very very long artist',
        tags: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    {
        id: 9,
        mapId: '000000',
        mapBackground: 'map-background.png',
        mapLevel: 18,
        mapTitle: 'A very very very very very long map title',
        mapCreator: 'A very very long creator',
        mapBpm: '9999-9999',
        mapTiles: '9999+',
        mapComments: '9999+',
        mapLikes: '9999+',
        songTitle: 'A very very very very very long song title',
        songArtist: 'A very very long artist',
        tags: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    {
        id: 10,
        mapId: '000000',
        mapBackground: 'map-background.png',
        mapLevel: 18,
        mapTitle: 'A very very very very very long map title',
        mapCreator: 'A very very long creator',
        mapBpm: '9999-9999',
        mapTiles: '9999+',
        mapComments: '9999+',
        mapLikes: '9999+',
        songTitle: 'A very very very very very long song title',
        songArtist: 'A very very long artist',
        tags: [0, 1, 2, 3, 4, 5, 6, 7],
    }
]

const MainPopularMaps = () => {
    return (
        <div>
            <div className="content-title">
                <h1 style={{ flexBasis: '80%', textAlign: 'left' }}>Recent Popular Maps</h1>
                <h3 style={{ flexBasis: '20%', textAlign: 'right', paddingTop: '20px' }}><a href="#maps">See All ▹</a></h3>
            </div>
            <div className="main-popular-maps">
                {
                    recentPopularMaps.map((recentPopularMap) => (
                        <MapInfo recentPopularMap={recentPopularMap} />
                    ))
                }
            </div>
        </div>
    )
}

export default MainPopularMaps
