import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSortAmountDown, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

const tagDescription = [
  {
    tagName: 'Tag Name 1',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 2',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 3',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 4',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 5',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 6',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 7',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 8',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 9',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 10',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 11',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 12',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 13',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 14',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 15',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 16',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 17',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 18',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 19',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 20',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 21',
    tagDescription: 'This tag means that this level is like this and that.'
  }
]

const SearchSection = ({placeholder, onSearch, filterContent, sortContent}) => {
  const [showFilter, setShowFilter] = React.useState(false);
  const [showSort, setShowSort] = React.useState(false);

  const onClickFilterButton = () => setShowFilter(!showFilter);
  const onClickSortButton = () => setShowSort(!showSort);
  
  return (
    <div className="list-search-container">
      <div className="list-search-section">
        <input className="list-text-input list-search-bar" type="text" placeholder={placeholder} onChange={event => {onSearch(event.target.value)}}/>
        
        <div className="list-search-filter-button" onClick={onClickFilterButton} style={showFilter ? { backgroundColor: 'rgb(255 255 255 / 50%)'} : null}>
          <div className="tooltip-container">
            <span className="tooltiptext">
              Filter
            </span>

            <FontAwesomeIcon icon={faFilter} size="lg" />
          </div>
        </div>

        <div className="list-search-sort-button" onClick={onClickSortButton} style={showSort ? { backgroundColor: 'rgb(255 255 255 / 50%)'} : null}>
          <div className="tooltip-container">
            <span className="tooltiptext">
              Sort
            </span>

            <FontAwesomeIcon icon={faSortAmountDown} size="lg" />
          </div>
        </div>
      </div>

      <SearchFilter show={showFilter}>
        {filterContent}
      </SearchFilter>

      <SearchSort show={showSort}>
        {sortContent}
      </SearchSort>
    </div>
  );
};

const SearchFilter = ({show, children}) => {
  return (
    <div className={`list-search-filter ${show ? 'list-search-content-show' : 'list-search-content-hide'}`}>
      <div className="list-search-content-title">
        Filter
      </div>
      {children}
    </div>
  );
};

const SearchSort = ({show, children}) => {
  return (
    <div className={`list-search-sort ${show ? 'list-search-content-show' : 'list-search-content-hide'}`}>
      <div className="list-search-content-title">
        Sort by
      </div>
      {children}
    </div>
  );
};

const SearchContentItem = ({title, children, isLv}) => {
  return (
    <div style={{ marginRight: '20px' }}>
      <div style={{ display: 'flex' }}>
        <h4 style={{ marginBottom: '5px', marginTop: '5px' }}>{title}</h4>
        {isLv ? 
        <>
          <FontAwesomeIcon data-tip data-for='lvDescription' icon={faQuestionCircle} size="lg" style={{ height: '16px', marginTop: '7px', marginLeft: '5px' }}/> 
          <ReactTooltip id='lvDescription' place='bottom' type='dark' effect='solid'>
            <span style={{ whiteSpace: 'pre-line' }}>
              {'Add 0.5 instead of +\nex) 18+ -> 18.5'}
            </span>
          </ReactTooltip>
        </>
          : null}
      </div>
      <div style={{ display: 'flex' }}>
        {children}
      </div>
    </div>
  );
};

const SearchContentCheckbox = ({onSelect, tooltip, img}) => {
  // TODO Tooltiptext
  return (
    <>
    <div data-tip data-for={'tag_' + tooltip} className="list-search-content-toggle">
      <input type="checkbox" id={tooltip} onChange={tooltip => {onSelect(tooltip.target.id)}} className="list-search-content-toggle-button"/>
      <label for={tooltip}>
        <img src={`/${img}`} alt={tooltip} style={{ width: '28px', marginRight: '8px' }}/>
      </label>
    </div>
    <ReactTooltip id={'tag_' + tooltip} place='bottom' type='dark' effect='solid'>
      <span style={{ whiteSpace: 'pre-line' }}>
        {tagDescription[tooltip - 1].tagName.toString() + '\n' + tagDescription[tooltip - 1].tagDescription.toString()}
      </span>
    </ReactTooltip>
    </>
  );
};

const SearchContentInput = ({onInput, placeholder, isLast}) => {
  return (
    <input className="list-text-input" type="number" placeholder={placeholder} onChange={event => {onInput(event.target.value)}} style={isLast ? {width: '100px', marginLeft: '5px'} : {width: '100px'}}/>
  );
}

const SearchContentRadio = ({onSelect, tooltip, img, isDefault}) => {
  // TODO Tooltiptext
  return (
    <div className="list-search-content-toggle">
      <input type="radio" id={tooltip} onChange={tooltip => {onSelect(tooltip.target.id)}} name="radio" className="list-search-content-toggle-button" defaultChecked={isDefault}/>
      <label for={tooltip}>
        <img src={`/${img}`} alt={tooltip} />
      </label>
    </div>
  );
};

export { SearchSection, SearchContentItem, SearchContentCheckbox, SearchContentInput, SearchContentRadio };