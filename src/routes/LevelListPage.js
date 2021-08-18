// import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LevelInfo2 from '../components/LevelInfo2';
import axios from "axios";
import React, { useEffect, useState } from "react";

// Components
import { SearchSection, SearchContentItem, SearchContentBtn } from '../components/LevelListSearchSection';

// Stylesheets
import '../stylesheets/levelList.css';

const LevelListPage = () => {

  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [itemCount, setItemCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
	const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setItems(null);
        setIsError(null);
        setIsLoading(true);
				const params = new URLSearchParams();
        params.append('offset', 0);
        params.append('amount', 15);
				params.append('sort', sortBy);
				params.append('queryTitle', searchTerm);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/levels`, { params });
        setItems(response.data.results);
        setItemCount(response.data.count);
      } catch (e) {
        setIsError(e);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [searchTerm, sortBy]);

  const fetchMoreData = async () => {
    // console.log(items);
    if (items.length >= itemCount) {
      setHasMore(false);
      return;
    }

    try {
      setIsError(null);

      const params = new URLSearchParams();
      params.append('offset', items.length);
      params.append('amount', 15);
			params.append('queryTitle', searchTerm);
			params.append('sort', sortBy);
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/levels`, { params });
      setItems(items.concat(response.data.results));
    } catch (e) {
      setIsError(e);
    }
  };

  return (
    <div className="mod-list-main">
      <SearchSection
        placeholder='Search Level Title, Song Title, Artist, Creator'  
				onSearch={(value) => setSearchTerm(value)}
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
            <SearchContentItem title='Difficulty'>
              <SearchContentBtn onSelect={(value) => setSortBy(value)} isRadio tooltip="DIFFICULTY_DESC" img="mod_icons/download_up.svg" />
              <SearchContentBtn onSelect={(value) => setSortBy(value)} isRadio tooltip="DIFFICULTY_ASC" img="mod_icons/download_down.svg" />
            </SearchContentItem>
            <SearchContentItem title='Likes'>
              <SearchContentBtn onSelect={(value) => setSortBy(value)} isRadio tooltip="LIKE_DESC" img="mod_icons/heart_up.svg" />
              <SearchContentBtn onSelect={(value) => setSortBy(value)} isRadio tooltip="LIKE_ASC" img="mod_icons/heart_down.svg" />
            </SearchContentItem>
            <SearchContentItem title="Recent">
              <SearchContentBtn onSelect={(value) => setSortBy(value)} isRadio tooltip="RECENT_ASC" img="mod_icons/created_at_up.svg" />
              <SearchContentBtn onSelect={(value) => setSortBy(value)} isRadio tooltip="RECENT_DESC" img="mod_icons/created_at_down.svg" />
            </SearchContentItem>
          </form>
        }
      /> 
      <div className="mod-list">
			{ isLoading ? null
        : !items ? null
        : isError ? (<h2>Oops! An error occurred.</h2>)
        : (
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
              <LevelInfo2 levelData={i} key={index} />
            ))}
          </InfiniteScroll>
        )}
			</div>
    </div> 
  );
};

export default LevelListPage;