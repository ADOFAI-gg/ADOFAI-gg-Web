import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter,
  faSortAmountDown,
  faQuestionCircle,
  faEraser
} from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

// Components
import TagTooltip from '../level/TagTooltip';

const SearchSection = ({
  placeholder,
  value,
  onSearch,
  filterContent,
  sortContent,
  disabled
}) => {
  const [showFilter, setShowFilter] = React.useState(false);
  const [showSort, setShowSort] = React.useState(false);

  const onClickFilterButton = () => setShowFilter(!showFilter);
  const onClickSortButton = () => setShowSort(!showSort);

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <section className='list-search-container'>
      <section className='list-search-section'>
        <input
          className='list-text-input list-search-bar'
          type='text'
          value={value}
          placeholder={placeholder}
          onChange={(event) => {
            onSearch(event.target.value);
          }}
          disabled={disabled}
        />

        {!disabled ? (
          <>
            <div
              className='list-search-filter-button'
              onClick={onClickFilterButton}
              style={
                showFilter
                  ? { backgroundColor: 'rgb(255 255 255 / 50%)' }
                  : null
              }
            >
              <div className='tooltip-container'>
                <span className='tooltiptext'>Filter</span>

                <FontAwesomeIcon icon={faFilter} size='lg' />
              </div>
            </div>

            <div
              className='list-search-sort-button'
              onClick={onClickSortButton}
              style={
                showSort ? { backgroundColor: 'rgb(255 255 255 / 50%)' } : null
              }
            >
              <div className='tooltip-container'>
                <span className='tooltiptext'>Sort</span>

                <FontAwesomeIcon icon={faSortAmountDown} size='lg' />
              </div>
            </div>

            <div className='list-search-sort-button' onClick={refreshPage}>
              <div className='tooltip-container'>
                <span className='tooltiptext'>Reset Filter</span>

                <FontAwesomeIcon icon={faEraser} size='lg' />
              </div>
            </div>
          </>
        ) : null}
      </section>

      {!disabled ? (
        <>
          <SearchFilter show={showFilter}>{filterContent}</SearchFilter>

          <SearchSort show={showSort}>{sortContent}</SearchSort>
        </>
      ) : null}
    </section>
  );
};

const SearchFilter = ({ show, children }) => {
  return (
    <section
      className={`list-search-filter ${
        show ? 'list-search-content-show' : 'list-search-content-hide'
      }`}
    >
      <div className='list-search-content-title'>Filter</div>
      {children}
    </section>
  );
};

const SearchSort = ({ show, children }) => {
  return (
    <section
      className={`list-search-sort ${
        show ? 'list-search-content-show' : 'list-search-content-hide'
      }`}
    >
      <div className='list-search-content-title'>Sort by</div>
      {children}
    </section>
  );
};

const SearchContentItem = ({ title, children, isLv }) => {
  return (
    <div style={{ marginRight: '20px' }}>
      <div style={{ display: 'flex' }}>
        <h4 style={{ marginBottom: '5px', marginTop: '5px' }}>{title}</h4>
        {isLv ? (
          <>
            <FontAwesomeIcon
              data-tip
              data-for='lvDescription'
              icon={faQuestionCircle}
              size='lg'
              style={{ height: '16px', marginTop: '7px', marginLeft: '5px' }}
            />

            <ReactTooltip
              id='lvDescription'
              place='bottom'
              type='dark'
              effect='solid'
            >
              <span style={{ whiteSpace: 'pre-line' }}>
                {'Add 0.5 instead of +\nex) 18+ -> 18.5'}
              </span>
            </ReactTooltip>
          </>
        ) : null}
      </div>
      <div style={{ display: 'flex' }}>{children}</div>
    </div>
  );
};

const SearchContentCheckbox = ({ onSelect, tooltip, img }) => {
  return (
    <>
      <div
        data-tip
        data-for={'tag_' + tooltip}
        className='list-search-content-toggle'
      >
        <input
          type='checkbox'
          id={tooltip}
          onChange={(event) => {
            onSelect(event.target.id);
          }}
          className='list-search-content-toggle-button'
        />
        <label htmlFor={tooltip}>
          <img
            src={`/${img}`}
            alt={tooltip}
            style={{ width: '28px', marginRight: '8px' }}
          />
        </label>
      </div>

      <TagTooltip tag={tooltip} id={'tag_' + tooltip} />
    </>
  );
};

const SearchContentInput = ({ onInput, placeholder, isLast }) => {
  return (
    <input
      className='list-text-input'
      type='number'
      placeholder={placeholder}
      onChange={(event) => {
        onInput(event.target.value);
      }}
      style={
        isLast ? { width: '100px', marginLeft: '5px' } : { width: '100px' }
      }
    />
  );
};

const SearchContentRadio = ({ onSelect, tooltip, img, isDefault }) => {
  return (
    <div className='list-search-content-toggle'>
      <input
        type='radio'
        id={tooltip}
        onChange={(tooltip) => {
          onSelect(tooltip.target.id);
        }}
        name='radio'
        className='list-search-content-toggle-button'
        defaultChecked={isDefault}
      />
      <label htmlFor={tooltip}>
        <img src={`/${img}`} alt={tooltip} />
      </label>
    </div>
  );
};

export {
  SearchSection,
  SearchContentItem,
  SearchContentCheckbox,
  SearchContentInput,
  SearchContentRadio
};
