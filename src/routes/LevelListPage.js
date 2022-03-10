import React, { useEffect, useReducer } from 'react';
import { get } from '../utils/http';
import { Virtuoso } from 'react-virtuoso';
import Select from 'react-select';
import difficulty from '../constants/difficulty';

// Components
import {
  SearchSection,
  SearchContentItem,
  SearchContentCheckbox,
  SearchContentInput,
  SearchContentRadio
} from '../components/search/LevelListSearchSection';
import LevelInfo from '../components/level/LevelInfo';
import ScrollButton from '../components/global/ScrollButton';

const LevelListPage = ({ history }) => {
  const recude = (state, action) => {
    switch (action.type) {
      case 'FETCH_RESULT':
        return {
          ...state,
          items: action.items
        };

      case 'FETCH_ERROR':
        return {
          ...state,
          error: action.error,
          isError: action.error ? true : false
        };

      case 'HAS_MORE_ITEMS':
        return {
          ...state,
          hasMoreItems: action.hasMore
        };

      case 'ITEM_COUNT':
        return {
          ...state,
          itemCount: action.itemCount
        };

      case 'SEARCH_TERM':
        return {
          ...state,
          searchTerm: action.searchTerm
        };

      case 'SORT_BY':
        return {
          ...state,
          sortBy: action.sortBy
        };

      case 'TAG_CHANGE':
        return {
          ...state,
          tag: action.tag
        };

      case 'FILTER_INPUT':
        return {
          ...state,
          filterInput: action.filterInput
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(recude, {
    items: [],
    error: null,
    isError: false,
    hasMore: true,
    itemCount: 0,
    searchTerm: getQuery(),
    sortBy: 'RECENT_DESC',
    tag: Array.from({ length: 20 }, () => false),
    filterInput: [null, null, null, null, null, null]
  });

  const fetchParams = (offset) => {
    const params = new URLSearchParams();

    params.append('offset', offset);
    params.append('amount', 15);
    state.sortBy && params.append('sort', state.sortBy);
    state.searchTerm && params.append('query', state.searchTerm);
    state.filterInput[0] &&
      params.append('minDifficulty', state.filterInput[0]);
    state.filterInput[1] &&
      params.append('maxDifficulty', state.filterInput[1]);
    state.filterInput[2] && params.append('minBpm', state.filterInput[2]);
    state.filterInput[3] && params.append('maxBpm', state.filterInput[3]);
    state.filterInput[4] && params.append('minTiles', state.filterInput[4]);
    state.filterInput[5] && params.append('maxTiles', state.filterInput[5]);

    params.append('includeTags', tagConvert(state.tag));
    params.append('excludeTags', tagConvert(state.tag, true));

    return params;
  };

  const fetchData = async () => {
    try {
      dispatch({ type: 'FETCH_ERROR', error: null });
      dispatch({ type: 'HAS_MORE_ITEMS', hasMore: true });

      const params = fetchParams(0);
      const response = await get(`/levels`, params);

      dispatch({ type: 'FETCH_RESULT', items: response.data.results });
      dispatch({ type: 'ITEM_COUNT', itemCount: response.data.count });
    } catch (e) {
      dispatch({ type: 'FETCH_ERROR', error: e });
    }
  };

  useEffect(() => {
    const setParamsFromState = () => {
      const locationState = history.location.state;

      if (locationState !== undefined) {
        locationState.filterInput &&
          dispatch({
            type: 'FILTER_INPUT',
            filterInput: locationState.filterInput
          });

        locationState.term &&
          dispatch({
            type: 'SEARCH_TERM',
            searchTerm: locationState.term
          });

        locationState.tag &&
          dispatch({ type: 'TAG_CHANGE', tag: locationState.tag });

        locationState.sortBy &&
          dispatch({ type: 'SORT_BY', sortBy: locationState.sortBy });
      }
    };

    setParamsFromState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();

    // disable warning because fetchData method is intentionally not added
    // eslint-disable-next-line
  }, [state.sortBy, state.tag, state.filterInput]);

  useEffect(() => {
    console.log('term changed');

    const delayDebounceFn = setTimeout(() => {
      console.log('debounce');
      fetchData();
    }, 100);

    return () => clearTimeout(delayDebounceFn);
    // disable warning because fetchData method is intentionally not added
    // eslint-disable-next-line
  }, [state.searchTerm]);

  // useEffect(() => {
  //   history.push({
  //     state: {
  //       ...history.location.state,
  //       tag: state.tag,
  //       filterInput: state.filterInput,
  //       sortBy: state.sortBy,
  //       term  : state.searchTerm,
  //     },
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const fetchMoreData = async () => {
    if (state.items.length >= state.itemCount) {
      dispatch({ type: 'HAS_MORE_ITEMS', hasMore: false });
      return;
    }

    try {
      dispatch({ type: 'FETCH_ERROR', error: null });

      const params = fetchParams(state.items.length);
      const response = await get(`/levels`, params);

      dispatch({
        type: 'FETCH_RESULT',
        items: state.items.concat(response.data.results)
      });
    } catch (e) {
      dispatch({ type: 'FETCH_ERROR', error: e });
    }
  };

  const tagChange = (value, btnState) => {
    // What? why tf?
    // : beacuse STATE UPATE DOES NOT SUPPORT ASYNC FUCK ;)
    let _btnState;

    if (btnState === 'unchecked') {
      _btnState = 'include';
    } else if (btnState === 'include') {
      _btnState = 'exclude';
    } else {
      _btnState = 'unchecked';
    }

    const newTag = state.tag;

    newTag[value - 1] = _btnState;
    dispatch({ type: 'TAG_CHANGE', tag: [...newTag] });
  };

  const tagConvert = (tags, isForExclude) => {
    let tagNumbers = [];

    tags.forEach((tag, index) => {
      if (!isForExclude) {
        if (tag === 'include') {
          tagNumbers.push(index + 1);
        }
      } else {
        if (tag === 'exclude') {
          tagNumbers.push(index + 1);
        }
      }
    });

    return tagNumbers.toString();
  };

  const numberChange = (index, value) => {
    let newNumbers = state.filterInput;
    newNumbers[index] = value;
    dispatch({ type: 'FILTER_INPUT', filterInput: [...newNumbers] });
  };

  function getQuery() {
    var query = decodeURI(window.location.search).substring(7);
    return query;
  }

  const dropdownStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'black',
      backgroundColor: state.isDisabled ? '#ddd' : 'white',
      opacity: state.isDisabled ? 0.5 : 1,
      ':hover': {
        backgroundColor: !state.isDisabled ? '#ddd' : '#ddd'
      }
    }),
    menu: (provided) => ({
      ...provided,
      color: 'black',
      colorScheme: 'white'
    }),
    control: (provided) => ({
      ...provided,
      fontSize: 15,
      padding: 6,
      paddingLeft: 10,
      width: 120,
      minHeight: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      boxShadow: 'none'
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      margin: '0 6px',
      backgroundColor: 'rgba(255, 255, 255, 0.4)'
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0
    }),
    input: (provided) => ({
      ...provided,
      padding: 0,
      margin: 0,
      color: 'white',
      fontWeight: 300
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'white',
      opacity: 0.7,
      fontWeight: 300
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white'
    })
  };

  const dropdownProps = {
    styles: dropdownStyles,
    options: difficulty.filter((i) => !i.isHidden),
    isSearchable: true,
    isClearable: true,
    closeMenuOnSelect: false,

    classNamePrefix: 'list-dropdown'
  };

  return (
    <main>
      <ScrollButton />
      <SearchSection
        placeholder='Search Level Title, Song Title, Artist, Creator'
        value={state.searchTerm}
        onSearch={(value) =>
          dispatch({ type: 'SEARCH_TERM', searchTerm: value })
        }
        disabled={state.isError}
        filterContent={
          <>
            <div style={{ display: 'flex' }}>
              <SearchContentItem title='Chart&VFX Tags'>
                {[13, 15, 14, 8, 22, 5, 3, 6].map((id) => {
                  return (
                    <SearchContentCheckbox
                      onSelect={(target, btnState) => {
                        tagChange(target.id, btnState);
                      }}
                      tooltip={id}
                      key={`search${id}`}
                      img={`tag/${id}.svg`}
                    />
                  );
                })}
              </SearchContentItem>

              <SearchContentItem title='Pattern Tags'>
                {[2, 19, 9, 18, 16, 21, 12, 10, 23, 17, 24].map((id) => {
                  return (
                    <SearchContentCheckbox
                      onSelect={(target, btnState) => {
                        tagChange(target.id, btnState);
                      }}
                      tooltip={id}
                      key={`search${id}`}
                      img={`tag/${id}.svg`}
                    />
                  );
                })}
              </SearchContentItem>

              <SearchContentItem title='Music Tags'>
                {[11, 4].map((id) => {
                  return (
                    <SearchContentCheckbox
                      onSelect={(target, btnState) => {
                        tagChange(target.id, btnState);
                      }}
                      tooltip={id}
                      key={`search${id}`}
                      img={`tag/${id}.svg`}
                    />
                  );
                })}
              </SearchContentItem>
            </div>

            <div style={{ display: 'flex', marginTop: '10px' }}>
              <SearchContentItem title='Lv.' isLv>
                <Select
                  {...dropdownProps}
                  placeholder='Min Lv.'
                  onChange={(i) => numberChange(0, i ? i.value : null)}
                  isOptionDisabled={(i) =>
                    state.filterInput[1] && i.value > state.filterInput[1]
                  }
                  formatOptionLabel={(i) => (
                    <div className='list-dropdown-option'>
                      <img
                        src={`/difficulty_icons/${i.value}.svg`}
                        alt={`${i.label} icon`}
                      />
                    </div>
                  )}
                />

                <Select
                  {...dropdownProps}
                  placeholder='Max Lv.'
                  onChange={(i) => numberChange(1, i ? i.value : null)}
                  isOptionDisabled={(i) =>
                    state.filterInput[0] && i.value < state.filterInput[0]
                  }
                  formatOptionLabel={(i) => (
                    <div className='list-dropdown-option'>
                      <img
                        src={`/difficulty_icons/${i.value}.svg`}
                        alt={`${i.label} icon`}
                      />
                    </div>
                  )}
                />
              </SearchContentItem>

              <SearchContentItem title='BPM'>
                <SearchContentInput
                  onInput={(value) => numberChange(2, value)}
                  placeholder='Min BPM'
                />

                <SearchContentInput
                  onInput={(value) => numberChange(3, value)}
                  placeholder='Max BPM'
                />
              </SearchContentItem>

              <SearchContentItem title='Tiles'>
                <SearchContentInput
                  onInput={(value) => numberChange(4, value)}
                  placeholder='Min Tiles'
                />

                <SearchContentInput
                  onInput={(value) => numberChange(5, value)}
                  placeholder='Max Tiles'
                />
              </SearchContentItem>
            </div>
          </>
        }
        sortContent={
          <form style={{ display: 'flex' }}>
            <SearchContentItem title='Difficulty'>
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: 'SORT_BY', sortBy: value })
                }
                tooltip='DIFFICULTY_DESC'
                img='sort_icons/difficulty_up.svg'
              />
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: 'SORT_BY', sortBy: value })
                }
                tooltip='DIFFICULTY_ASC'
                img='sort_icons/difficulty_down.svg'
              />
            </SearchContentItem>
            {/* <SearchContentItem title='Likes'>
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: 'SORT_BY', sortBy: value })
                }
                tooltip='LIKE_DESC'
                img='sort_icons/heart_up.svg'
              />
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: 'SORT_BY', sortBy: value })
                }
                tooltip='LIKE_ASC'
                img='sort_icons/heart_down.svg'
              />
            </SearchContentItem> */}
            <SearchContentItem title='Recent'>
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: 'SORT_BY', sortBy: value })
                }
                tooltip='RECENT_DESC'
                img='sort_icons/created_at_up.svg'
                isDefault
              />
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: 'SORT_BY', sortBy: value })
                }
                tooltip='RECENT_ASC'
                img='sort_icons/created_at_down.svg'
              />
            </SearchContentItem>
          </form>
        }
      />
      <div className='mod-list'>
        {!state.items ? null : state.isError ? (
          <h2 style={{ margin: '10px' }}>Oops! An error occurred.</h2>
        ) : (
          <Virtuoso
            useWindowScroll
            data={state.items}
            endReached={fetchMoreData}
            fixedItemHeight={78}
            itemContent={(index, i) => <LevelInfo levelData={i} key={index} />}
          />
        )}
      </div>
    </main>
  );
};

export default LevelListPage;
