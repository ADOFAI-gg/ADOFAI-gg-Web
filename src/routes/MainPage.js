import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Components
// import MainAddInfo from "../components/MainAddInfo";
import MainTopPlays from '../components/main/MainTopPlays';
import MainPopularLevels from '../components/main/MainPopularLevels';
import { useHistory } from 'react-router-dom';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  let history = useHistory();

  const ReactSwal = withReactContent(Swal);

  const userMenu = () => {
    const sumbitPlayUrl = 'https://forms.gle/XdKNuqVrt974F7Ab6';
    const sumbitLevelUrl = 'https://forms.gle/gGtReGnJnbf4Ck387';
    const requestRelevelingUrl =
      'https://docs.google.com/forms/d/e/1FAIpQLSff8C5U7_aXwwO56uvnZMvLoA6P3iY8YRAg2J2UVAusHOkM2Q/viewform?usp=sf_link';
    // XXX - need short url
    const songCopyrightUrl = 'https://7thbe.at/verified-artists';

    const MenuItem = ({ url, iconName, children }) => {
      return (
        <a
          className='main-user-menu-context'
          target={'_blank'}
          rel='noreferrer'
          href={url}
        >
          <img
            className='main-user-menu-context-icon'
            src={`/usermenu_icons/${iconName}.svg`}
            alt={iconName}
            onDragStart={(e) => e.preventDefault()}
          />
          <span className='main-user-menu-context-text'>{children}</span>
        </a>
      );
    };

    ReactSwal.fire({
      title: 'Submit & Info',
      html: (
        <>
          <MenuItem url={sumbitPlayUrl} iconName={'submit_play'}>
            Submit Your Play
          </MenuItem>
          <MenuItem url={sumbitLevelUrl} iconName={'submit_level'}>
            Submit Your Level
          </MenuItem>
          <MenuItem url={requestRelevelingUrl} iconName={'request_releveling'}>
            Request <br />
            Re-Leveling
          </MenuItem>
          <MenuItem url={songCopyrightUrl} iconName={'copyright'}>
            Song Copyright
          </MenuItem>
        </>
      ),
      customClass: {
        popup: 'main-user-menu',
        htmlContainer: 'main-user-menu-container',
        closeButton: 'main-user-menu-close'
      },
      showConfirmButton: false,
      showCloseButton: true
    });
  };

  return (
    <main>
      <img className='main-logo' src='/logo.svg' alt='' />
      <h2 style={{ marginTop: '10px' }}>
        Based On The{' '}
        <a
          href='https://docs.google.com/spreadsheets/d/1PzLHfWmVWJHrBGnNSsLTsdH0ibdk0hB4MpKHET1nkpU/edit#gid=1848316468'
          target='_blank'
          rel='noreferrer'
          className='main-yellow-highlight'
        >
          Unofficial ADOFAI Forum
        </a>
      </h2>
      <input
        className='main-search-bar'
        type='text'
        placeholder='Search Song, Artist, or Creator'
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(event) =>
          event.key === 'Enter'
            ? history.push('/levels?query=' + searchTerm)
            : ''
        }
      />
      {/* <MainAddInfo playersOnline='999999' rankedPlayers='999999' rankedLevels='999999' unclearedLevels='999999'/> */}
      <MainTopPlays />
      <MainPopularLevels />
      <button
        onClick={userMenu}
        className='user-menu-button'
        style={{ background: 'url("/usermenu_icons/usermenu.svg")' }}
      />
    </main>
  );
};
export default MainPage;
