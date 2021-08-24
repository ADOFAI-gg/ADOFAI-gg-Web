// import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LevelInfo2 from '../components/LevelInfo2';
import axios from "axios";
import React, { useEffect, useState } from "react";

// Components
import { SearchSection, SearchContentItem, SearchContentCheckbox, SearchContentInput, SearchContentRadio } from '../components/LevelListSearchSection';
import ScrollButton from '../components/ScrollButton';

// Stylesheets
import '../stylesheets/levelList.css';

const LevelListPage = () => {
  const [items, setItems] = useState([]);
  const [isError, setIsError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [itemCount, setItemCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(getQuery());
  const [sortBy, setSortBy] = useState('RECENT_DESC');
  const [tag, setTag] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
  const [numbers, setNumbers] = useState(['', '', '', '', '', '']);

  const fetchParams = (offset) => {
    const params = new URLSearchParams();
    params.append('offset', offset);
    params.append('amount', 15);
    params.append('sort', sortBy);
    params.append('queryTitle', searchTerm);
    params.append('queryArtist', searchTerm);
    params.append('queryCreator', searchTerm);
    params.append('includeTags', tagConvert(tag).toString());
    params.append('minDifficulty', numbers[0]);
    params.append('maxDifficulty', numbers[1]);
    params.append('minBpm', numbers[2]);
    params.append('maxBpm', numbers[3]);
    params.append('minTiles', numbers[4]);
    params.append('maxTiles', numbers[5]);

    return params;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsError(null);
        setHasMore(true);

        const params = fetchParams(0);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/levels`, { params });
        
        setItems(response.data.results);
        setItemCount(response.data.count);
      } catch (e) {
        setIsError(e);
      }
    };

    fetchData();
  }, [searchTerm, sortBy, tag, numbers]);

  const fetchMoreData = async () => {
    if (items.length >= itemCount) {
      setHasMore(false);
      return;
    }

    try {
      setIsError(null);

      const params = fetchParams(items.length);
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/levels`, { params });

      setItems(items.concat(response.data.results));
    } catch (e) {
      setIsError(e);
    }
  };

  const tagChange = (value) => {
    const newTag = tag;
    newTag[value - 1] = !tag[value - 1];
    setTag([...newTag]);
  }

  const tagConvert = (tags) => {
    let tagNumbers = []
    tags.forEach((bool, index) => {
      if (bool) {
        tagNumbers.push(index + 1);
      }
    });
    return tagNumbers;
  }

  const numberChange = (index, value) => {
    let newNumbers = numbers;
    newNumbers[index] = value;
    setNumbers([...newNumbers]);
  }

	function getQuery()
	{
    var query = decodeURI(window.location.search).substring(7);
    return query;
	}

  return (
    <div className="mod-list-main">
			<ScrollButton />
      <SearchSection
        placeholder='Search Level Title, Song Title, Artist, Creator'  
				value={searchTerm}
        onSearch={(value) => setSearchTerm(value)}
        filterContent={
          <>
            <div style={{ display: 'flex' }}>
              <SearchContentItem title='Chart Related'>
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="1" img="tag/1.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="2" img="tag/2.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="3" img="tag/3.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="4" img="tag/4.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="5" img="tag/5.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="6" img="tag/6.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="7" img="tag/7.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="8" img="tag/8.svg" />
              </SearchContentItem>
              <SearchContentItem title='Rhythm Related'>
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="9" img="tag/9.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="10" img="tag/10.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="11" img="tag/11.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="12" img="tag/12.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="13" img="tag/13.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="14" img="tag/14.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="15" img="tag/15.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="16" img="tag/16.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="17" img="tag/17.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="18" img="tag/18.svg" />
              </SearchContentItem>
              <SearchContentItem title='Length'>
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="19" img="tag/19.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="20" img="tag/20.svg" />
                <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="21" img="tag/21.svg" />
              </SearchContentItem>
            </div>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <SearchContentItem title='Lv.' isLv>
                <SearchContentInput onInput={(value) => numberChange(0, value)} placeholder='Min Lv.'/>
                <SearchContentInput onInput={(value) => numberChange(1, value)} placeholder='Max Lv.' isLast/>
              </SearchContentItem>
              <SearchContentItem title='BPM'>
                <SearchContentInput onInput={(value) => numberChange(2, value)} placeholder='Min BPM'/>
                <SearchContentInput onInput={(value) => numberChange(3, value)} placeholder='Max BPM' isLast/>
              </SearchContentItem>
              <SearchContentItem title='Tiles'>
                <SearchContentInput onInput={(value) => numberChange(4, value)} placeholder='Min Tiles'/>
                <SearchContentInput onInput={(value) => numberChange(5, value)} placeholder='Max Tiles' isLast/>
              </SearchContentItem>
            </div>
          </>
        }
        sortContent={
          <form style={{ display: 'flex' }}>
            <SearchContentItem title='Difficulty'>
              <SearchContentRadio onSelect={(value) => setSortBy(value)} isRadio tooltip="DIFFICULTY_DESC" img="mod_icons/download_up.svg" />
              <SearchContentRadio onSelect={(value) => setSortBy(value)} isRadio tooltip="DIFFICULTY_ASC" img="mod_icons/download_down.svg" />
            </SearchContentItem>
            <SearchContentItem title='Likes'>
              <SearchContentRadio onSelect={(value) => setSortBy(value)} isRadio tooltip="LIKE_DESC" img="mod_icons/heart_up.svg" />
              <SearchContentRadio onSelect={(value) => setSortBy(value)} isRadio tooltip="LIKE_ASC" img="mod_icons/heart_down.svg" />
            </SearchContentItem>
            <SearchContentItem title="Recent">
              <SearchContentRadio onSelect={(value) => setSortBy(value)} isRadio tooltip="RECENT_DESC" img="mod_icons/created_at_up.svg" isDefault/>
              <SearchContentRadio onSelect={(value) => setSortBy(value)} isRadio tooltip="RECENT_ASC" img="mod_icons/created_at_down.svg" />
            </SearchContentItem>
          </form>
        }
      /> 
      <div className="mod-list">
      { !items ? null
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