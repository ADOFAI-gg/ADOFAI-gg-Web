// import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import React, { useEffect, useReducer } from "react";
// import { useLocation } from "react-router-dom";

// Components
import {
  SearchSection,
  SearchContentItem,
  SearchContentCheckbox,
  SearchContentInput,
  SearchContentRadio,
} from "../components/search/LevelListSearchSection";
import LevelInfo from "../components/level/LevelInfo";
import ScrollButton from "../components/global/ScrollButton";

const LevelListPage = ({ history }) => {
  const recude = (state, action) => {
    switch (action.type) {
      case "FETCH_RESULT":
        return {
          ...state,
          items: action.items,
        };

      case "FETCH_ERROR":
        return {
          ...state,
          error: action.error,
          isError: action.error ? true : false,
        };

      case "HAS_MORE_ITEMS":
        return {
          ...state,
          hasMoreItems: action.hasMore,
        };

      case "ITEM_COUNT":
        return {
          ...state,
          itemCount: action.itemCount,
        };

      case "SEARCH_TERM":
        return {
          ...state,
          searchTerm: action.searchTerm,
        };

      case "SORT_BY":
        return {
          ...state,
          sortBy: action.sortBy,
        };

      case "TAG_CHANGE":
        return {
          ...state,
          tag: action.tag,
        };

      case "FILTER_INPUT":
        return {
          ...state,
          filterInput: action.filterInput,
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
    sortBy: "RECENT_DESC",
    tag: Array.from({ length: 20 }, () => false),
    filterInput: ["", "", "", "", "", ""],
  });

  const fetchParams = (offset) => {
    const params = new URLSearchParams();

    params.append("offset", offset);
    params.append("amount", 15);
    params.append("sort", state.sortBy);
    params.append("query", state.searchTerm);
    params.append("includeTags", tagConvert(state.tag).toString());
    params.append("minDifficulty", state.filterInput[0]);
    params.append("maxDifficulty", state.filterInput[1]);
    params.append("minBpm", state.filterInput[2]);
    params.append("maxBpm", state.filterInput[3]);
    params.append("minTiles", state.filterInput[4]);
    params.append("maxTiles", state.filterInput[5]);

    return params;
  };

  useEffect(() => {
    const setParamsFromState = () => {
      const locationState = history.location.state;

      if (locationState !== undefined) {
        locationState.filterInput &&
          dispatch({
            type: "FILTER_INPUT",
            filterInput: locationState.filterInput,
          });

        locationState.term &&
          dispatch({
            type: "SEARCH_TERM",
            searchTerm: locationState.term,
          });

        locationState.tag &&
          dispatch({ type: "TAG_CHANGE", tag: locationState.tag });

        locationState.sortBy &&
          dispatch({ type: "SORT_BY", sortBy: locationState.sortBy });
      }
    };

    setParamsFromState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_ERROR", error: null });
        dispatch({ type: "HAS_MORE_ITEMS", hasMore: true });

        const params = fetchParams(0);
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/levels`,
          { params }
        );

        dispatch({ type: "FETCH_RESULT", items: response.data.results });
        dispatch({ type: "ITEM_COUNT", itemCount: response.data.count });
      } catch (e) {
        dispatch({ type: "FETCH_ERROR", error: e });
      }
    };

    fetchData();

    // disable warning because fetchParams method is intentionally not added
    // eslint-disable-next-line
  }, [state.searchTerm, state.sortBy, state.tag, state.filterInput]);

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
      dispatch({ type: "HAS_MORE_ITEMS", hasMore: false });
      return;
    }

    try {
      dispatch({ type: "FETCH_ERROR", error: null });

      const params = fetchParams(state.items.length);
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/levels`,
        { params }
      );

      dispatch({
        type: "FETCH_RESULT",
        items: state.items.concat(response.data.results),
      });
    } catch (e) {
      dispatch({ type: "FETCH_ERROR", error: e });
    }
  };

  const tagChange = (value) => {
    const newTag = state.tag;
    newTag[value - 1] = !state.tag[value - 1];
    dispatch({ type: "TAG_CHANGE", tag: [...newTag] });
  };

  const tagConvert = (tags) => {
    let tagNumbers = [];
    tags.forEach((bool, index) => {
      if (bool) {
        tagNumbers.push(index + 1);
      }
    });
    return tagNumbers;
  };

  const numberChange = (index, value) => {
    let newNumbers = state.filterInput;
    newNumbers[index] = value;
    dispatch({ type: "FILTER_INPUT", filterInput: [...newNumbers] });
  };

  function getQuery() {
    var query = decodeURI(window.location.search).substring(7);
    return query;
  }

  return (
    <main>
      <ScrollButton />
      <SearchSection
        placeholder="Search Level Title, Song Title, Artist, Creator"
        value={state.searchTerm}
        onSearch={(value) =>
          dispatch({ type: "SEARCH_TERM", searchTerm: value })
        }
        filterContent={
          <>
            <div style={{ display: "flex" }}>
              <SearchContentItem title="Chart Related">
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="20"
                  img="tag/20.svg"
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="13"
                  img="tag/13.svg"
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="15"
                  img="tag/15.svg"
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="14"
                  img="tag/14.svg"
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="8"
                  img="tag/8.svg"
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="5"
                  img="tag/5.svg"
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="3"
                  img="tag/3.svg"
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="6"
                  img="tag/6.svg"
                />
              </SearchContentItem>
              <SearchContentItem title="Rhythm Related">
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="2"
                  img="tag/2.svg"
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="19"
                  img="tag/19.svg"
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="9"
                  img="tag/9.svg"
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="18"
                  img="tag/18.svg"
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="16"
                  img="tag/16.svg"
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="21"
                  img="tag/21.svg"
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="12"
                  img="tag/12.svg"
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="10"
                  img="tag/10.svg"
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="7"
                  img="tag/7.svg"
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="17"
                  img="tag/17.svg"
                />
              </SearchContentItem>
              <SearchContentItem title="Length">
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="1"
                  img="tag/1.svg"
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="11"
                  img="tag/11.svg"
                />
              </SearchContentItem>
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <SearchContentItem title="Lv." isLv>
                <SearchContentInput
                  onInput={(value) => numberChange(0, value)}
                  placeholder="Min Lv."
                />
                <SearchContentInput
                  onInput={(value) => numberChange(1, value)}
                  placeholder="Max Lv."
                  isLast
                />
              </SearchContentItem>
              <SearchContentItem title="BPM">
                <SearchContentInput
                  onInput={(value) => numberChange(2, value)}
                  placeholder="Min BPM"
                />
                <SearchContentInput
                  onInput={(value) => numberChange(3, value)}
                  placeholder="Max BPM"
                  isLast
                />
              </SearchContentItem>
              <SearchContentItem title="Tiles">
                <SearchContentInput
                  onInput={(value) => numberChange(4, value)}
                  placeholder="Min Tiles"
                />
                <SearchContentInput
                  onInput={(value) => numberChange(5, value)}
                  placeholder="Max Tiles"
                  isLast
                />
              </SearchContentItem>
            </div>
          </>
        }
        sortContent={
          <form style={{ display: "flex" }}>
            <SearchContentItem title="Difficulty">
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: "SORT_BY", sortBy: value })
                }
                tooltip="DIFFICULTY_DESC"
                img="sort_icons/difficulty_up.svg"
              />
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: "SORT_BY", sortBy: value })
                }
                tooltip="DIFFICULTY_ASC"
                img="sort_icons/difficulty_down.svg"
              />
            </SearchContentItem>
            <SearchContentItem title="Likes">
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: "SORT_BY", sortBy: value })
                }
                tooltip="LIKE_DESC"
                img="sort_icons/heart_up.svg"
              />
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: "SORT_BY", sortBy: value })
                }
                tooltip="LIKE_ASC"
                img="sort_icons/heart_down.svg"
              />
            </SearchContentItem>
            <SearchContentItem title="Recent">
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: "SORT_BY", sortBy: value })
                }
                tooltip="RECENT_DESC"
                img="sort_icons/created_at_up.svg"
                isDefault
              />
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: "SORT_BY", sortBy: value })
                }
                tooltip="RECENT_ASC"
                img="sort_icons/created_at_down.svg"
              />
            </SearchContentItem>
          </form>
        }
      />
      <div className="mod-list">
        {!state.items ? null : state.isError ? (
          <h2>{state.error}</h2>
        ) : (
          <InfiniteScroll
            dataLength={state.items.length}
            next={fetchMoreData}
            hasMore={state.hasMore}
            scrollThreshold={0.8}
          >
            {state.items.map((i, index) => (
              <LevelInfo levelData={i} key={index} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </main>
  );
};

export default LevelListPage;
