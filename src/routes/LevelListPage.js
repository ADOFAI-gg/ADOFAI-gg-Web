// import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LevelInfo2 from '../components/LevelInfo2';
import axios from "axios";
import React, { useEffect, useState } from "react";

// Components
import { SearchSection, SearchContentItem, SearchContentCheckbox, SearchContentRadio } from '../components/LevelListSearchSection';

// Stylesheets
import '../stylesheets/levelList.css';

const LevelListPage = () => {

  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [itemCount, setItemCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
	const [sortBy, setSortBy] = useState('RECENT_DESC');
	const [tag, setTag] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);

	function tagChange(value) {
		// console.log(value);
		const newTag = tag;
		newTag[value - 1] = !tag[value - 1];
		setTag([...newTag]);
		// console.log(tag);
		// console.log(tagConvert(tag));
	}

	function tagConvert(tags) {
		let tagNumbers = []
		tags.map(function(bool, index) {
			if(bool) {
				tagNumbers.push(index + 1);
			}
		});
		return tagNumbers;
	}

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
				params.append('queryArtist', searchTerm);
				params.append('queryCreator', searchTerm);
				params.append('includeTags', tagConvert(tag).toString());
				console.log(tagConvert(tag).toString());
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/levels`, { params });
        setItems(response.data.results);
        setItemCount(response.data.count);
      } catch (e) {
        setIsError(e);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [searchTerm, sortBy, tag]);

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
			params.append('sort', sortBy);
      params.append('amount', 15);
			params.append('queryTitle', searchTerm);
			params.append('queryArtist', searchTerm);
			params.append('queryCreator', searchTerm);
			params.append('includeTags', tagConvert(tag).toString());
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/levels`, { params });
      setItems(items.concat(response.data.results));
    } catch (e) {
      setIsError(e);
    }
  };

	// function tagChange2(value) {
	// 	// console.log(value);
	// 	let newTag = tag2;
	// 	if(newTag.includes(value)) {
	// 		newTag = tag2.filter((item) => item !== value);
	// 		// console.log(newTag)
	// 		setTag2(...newTag);
	// 	}
	// 	else {
	// 		newTag.push(value);
	// 		setTag2(newTag);
	// 	}
		
	// 	console.log(tag2);
	// }

  return (
    <div className="mod-list-main">
      <SearchSection
        placeholder='Search Level Title, Song Title, Artist, Creator'  
				onSearch={(value) => setSearchTerm(value)}
        filterContent={
          <div style={{ display: 'flex' }}>
            <SearchContentItem title='Tags'>
              <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="1" img="tag/1.svg" />
              <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="2" img="tag/2.svg" />
              <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="3" img="tag/3.svg" />
              <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="4" img="tag/4.svg" />
              <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="5" img="tag/5.svg" />
              <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="6" img="tag/6.svg" />
              <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="7" img="tag/7.svg" />
              <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="8" img="tag/8.svg" />
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
              <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="19" img="tag/19.svg" />
              <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="20" img="tag/20.svg" />
              <SearchContentCheckbox onSelect={(value) => tagChange(value)} tooltip="21" img="tag/21.svg" />
            </SearchContentItem>
          </div>
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