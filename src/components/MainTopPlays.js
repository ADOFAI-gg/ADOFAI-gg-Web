import MainTopPlay from './MainTopPlay'

const recentTopPlays = [
    {
        id: 1,
        mapId: '000000', 
        mapTitle: 'A very very very long title', 
        mapSubTitle: '(Nerfed)', 
        mapLevel: '18', 
        playerName: 'A very very very long player name', 
        playPitch: '999.99', 
        playAcc: '999.99',
        playVideo: 'https://www.youtube.com/watch?v=kTwAMfwvnz0'
    },
    {
        id: 2,
        mapId: '000000', 
        mapTitle: 'A very very very long title', 
        mapSubTitle: '(Nerfed)', 
        mapLevel: '18', 
        playerName: 'A very very very long player name', 
        playPitch: '999.99', 
        playAcc: '999.99',
        playVideo: 'https://www.youtube.com/watch?v=kTwAMfwvnz0'
    },
    {
        id: 3,
        mapId: '000000', 
        mapTitle: 'A very very very long title', 
        mapSubTitle: '(Nerfed)', 
        mapLevel: '18', 
        playerName: 'A very very very long player name', 
        playPitch: '999.99', 
        playAcc: '999.99',
        playVideo: 'https://www.youtube.com/watch?v=kTwAMfwvnz0'
    },
    {
        id: 4,
        mapId: '000000', 
        mapTitle: 'A very very very long title', 
        mapSubTitle: '(Nerfed)', 
        mapLevel: '18', 
        playerName: 'A very very very long player name', 
        playPitch: '999.99', 
        playAcc: '999.99',
        playVideo: 'https://www.youtube.com/watch?v=kTwAMfwvnz0'
    },
    {
        id: 5,
        mapId: '000000', 
        mapTitle: 'A very very very long title', 
        mapSubTitle: '(Nerfed)', 
        mapLevel: '18', 
        playerName: 'A very very very long player name', 
        playPitch: '999.99', 
        playAcc: '999.99',
        playVideo: 'https://www.youtube.com/watch?v=kTwAMfwvnz0'
    },
    {
        id: 6,
        mapId: '000000', 
        mapTitle: 'A very very very long title', 
        mapSubTitle: '(Nerfed)', 
        mapLevel: '18', 
        playerName: 'A very very very long player name', 
        playPitch: '999.99', 
        playAcc: '999.99',
        playVideo: 'https://www.youtube.com/watch?v=kTwAMfwvnz0'
    },
    {
        id: 7,
        mapId: '000000', 
        mapTitle: 'A very very very long title', 
        mapSubTitle: '(Nerfed)', 
        mapLevel: '18', 
        playerName: 'A very very very long player name', 
        playPitch: '999.99', 
        playAcc: '999.99',
        playVideo: 'https://www.youtube.com/watch?v=kTwAMfwvnz0'
    },
    {
        id: 8,
        mapId: '000000', 
        mapTitle: 'A very very very long title', 
        mapSubTitle: '(Nerfed)', 
        mapLevel: '18', 
        playerName: 'A very very very long player name', 
        playPitch: '999.99', 
        playAcc: '999.99',
        playVideo: 'https://www.youtube.com/watch?v=kTwAMfwvnz0'
    }
]

const MainTopPlays = () => {
    return (
        <div className="main-top-plays">
            {recentTopPlays.map((recentTopPlay) => (
                <MainTopPlay recentTopPlay={recentTopPlay} />
            ))}
        </div>
    )
}

export default MainTopPlays
