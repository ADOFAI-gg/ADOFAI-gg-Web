import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// Components
import { SearchSection, SearchContentItem, SearchContentBtn } from '../components/SearchSection';
import ModsListItem from '../components/ModsListItem';

// Stylesheets
import '../stylesheets/modList.css';

const ModListPage = () => {
  const exampleModInfo = {
    id: 123,
    name: "AdofaiTweaks",
    version: "2.3.5",
    description: "description",
    likes: "45",
    downloads: "1069",
    supportVersion: "r75",
    category: "Level Editor",
    author: "PizzaLover007"
  };

  const [items, setItems] = React.useState([exampleModInfo, exampleModInfo, exampleModInfo, exampleModInfo, exampleModInfo, exampleModInfo, exampleModInfo, exampleModInfo, exampleModInfo, exampleModInfo, ]);
  const [hasMore, setHasMore] = React.useState(true);

  const fetchMoreData = () => {
    // in order for this to work => need to send me the number of modes that the API has
    // wouldnt it be possible for the backend developer to make it????
    if (items.length >= 300) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      // TEST CODE START  
      fetch('https://official-joke-api.appspot.com/jokes/ten').then((res) => {
        return res.json();
      }).then((data) => {
        console.log('fetch')
        const newItems = Array.from({ length: 10 });
        
        data.map((item, index) => {
          newItems[index] = { ...exampleModInfo };
          newItems[index].description = item.setup;
          newItems[index].name = item.punchline;
          newItems[index].version = `${item.id}-${item.type}`;

          /* XXX
           * i put it(return null) in bcz of a FUCKING EXCEPTION:
           * Expected to return a value in arrow function  array-callback-return
           * 
           * if u know the solution, plz fix it!
           */
          return null;
        });

        setItems(items.concat(newItems));
      });
      // TEST CODE END

    }, 500);
  };

  return (
    <>
      <div className="mods-main">
        <SearchSection
          placeholder='Search Mod'  

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
          loader={
            <h4 style={{ textAlign: 'center', fontWeight: '300', marginTop: '10px', marginBottom: '10px' }}>
              Wait a second please!
            </h4>
          }
        >
          {items.map((i, index) => (
            <ModsListItem modInfo={i}/>
          ))}
          
        </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default ModListPage;