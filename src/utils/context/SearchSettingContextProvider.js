import React from 'react';

export const SearchSettingContext = React.createContext(null);

function getQuery() {
  return decodeURI(window.location.search).substring(7);
}

const reduce = (state, action) => {
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
        isError: !!action.error
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

/**
 * @type {React.FC}
 */
const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reduce, {
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

  return (
    <SearchSettingContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchSettingContext.Provider>
  );
};

export default ContextProvider;
