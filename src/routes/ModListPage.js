import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle, faHeart, faFolderOpen, faArrowAltCircleDown, faWindowRestore } from '@fortawesome/free-regular-svg-icons'

// Components
import { SearchSection, SearchContentItem, SearchContentBtn } from '../components/SearchSection';

// Stylesheets
import '../stylesheets/modList.css';

const ModListPage = () => {
  const [items, setItems] = React.useState(Array.from({ length: 20 }));
  const [hasMore, setHasMore] = React.useState(true);

  const fetchMoreData = () => {
    if (items.length >= 300) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 20 })));
    }, 500);
  };

  return (
    <>
      <div className="mods-main">
        <SearchSection
          placeholder='Search to Mod Name'

          filterContent={
            <div style={{ display: 'flex' }}>
              <SearchContentItem title='Support Version'>
                <input className="list-text-input" type="text" value='r' />
              </SearchContentItem>

              <SearchContentItem title='Category'>
                <SearchContentBtn tooltip="tweaks" img="mod_icons/tweaks.svg" />
                <SearchContentBtn tooltip="game_play" img="mod_icons/game_play.svg" />
                <SearchContentBtn tooltip="level_editor" img="mod_icons/level_editor.svg" />
                <SearchContentBtn tooltip="text_edit" img="mod_icons/text_edit.svg" />
                <SearchContentBtn tooltip="bug_fix" img="mod_icons/bug_fix.svg" />
                <SearchContentBtn tooltip="planet_edit" img="mod_icons/planet_edit.svg" />
                <SearchContentBtn tooltip="library" img="mod_icons/library.svg" />
                <SearchContentBtn tooltip="other" img="mod_icons/other.svg" />
              </SearchContentItem>
            </div>
          }

          sortContent={
            <form style={{ display: 'flex' }}>
              <SearchContentItem title='Downloads'>
                <SearchContentBtn isRadio tooltip="download_up" img="mod_icons/download_up.svg" />
                <SearchContentBtn isRadio tooltip="download_down" img="mod_icons/download_down.svg" />
              </SearchContentItem>

              <SearchContentItem title='Likes'>
                <SearchContentBtn isRadio tooltip="heart_up" img="mod_icons/heart_up.svg" />
                <SearchContentBtn isRadio tooltip="heart_down" img="mod_icons/heart_down.svg" />
              </SearchContentItem>

              <SearchContentItem title="Created Time">
                <SearchContentBtn isRadio tooltip="created_at_up" img="mod_icons/created_at_up.svg" />
                <SearchContentBtn isRadio tooltip="created_at_down" img="mod_icons/created_at_down.svg" />
              </SearchContentItem>
            </form>
          }
        />

        <div className="mods-list">
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 style={{textAlign: 'center'}}>Wait a second please!</h4>}
        >
          {items.map((i, index) => (
            // TODO ok i think it must be component
            <div className="mods-list-item">
              <div className="mods-list-item-left">
                <div className="mods-mod-category">
                  <img src="http://localhost:3000/mod_icons/tweaks.svg" alt="category icon" />
                </div>

                <div className="mods-mod-info">
                  <div className="mods-mod-title">
                    AdofaiTweaks
                    <span className="mods-mod-version">v2.3.5</span>
                  </div>
                  <div className="mods-mod-description">
                    wow! the {index + 1}st/nd/rd/th article!
                  </div>
                  <div className="mods-mod-footer">
                    <div className="mods-mod-footer-item">
                      <FontAwesomeIcon icon={faHeart} />45
                    </div>
                    <div className="mods-mod-footer-item">
                      <FontAwesomeIcon icon={faArrowAltCircleDown} />1069
                    </div>
                    <div className="mods-mod-footer-item">
                      <FontAwesomeIcon icon={faWindowRestore} />r75
                    </div>
                    <div className="mods-mod-footer-item">
                      <FontAwesomeIcon icon={faFolderOpen} />Tweaks
                    </div>
                    <div className="mods-mod-footer-item">
                      <FontAwesomeIcon icon={faUserCircle} />PizzaLover007
                    </div>
                  </div>
                </div>
              </div>
              <div className="mods-mod-download">
                <FontAwesomeIcon icon={faDownload} size="2x" />
              </div>
            </div>
          ))}
          
        </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default ModListPage;