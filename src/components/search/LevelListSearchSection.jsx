import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter,
  faSortAmountDown,
  faEraser
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import TagTooltip from '../level/TagTooltip';
import { SearchSettingContext } from '../../utils/context/SearchSettingContextProvider';

const SearchContentAnimator = ({ children, key }) => {
  return (
    <motion.div
      key={key}
      initial={{
        height: 0,
        marginTop: 0,
        opacity: 0
      }}
      animate={{
        height: 'auto',
        marginTop: 10,
        opacity: 1
      }}
      exit={{
        height: 0,
        marginTop: 0,
        opacity: 0
      }}
    >
      {children}
    </motion.div>
  );
};

const SearchSection = ({
  placeholder,
  value,
  onSearch,
  filterContent,
  sortContent,
  disabled
}) => {
  const {state} = React.useContext(SearchSettingContext)

  const firstShowFilter = React.useMemo(() => {
    return !!state.tag.find(x=>x) || !!state.filterInput.find(x=>x)
  }, [state])

  const firstShowSort = React.useMemo(() => {
    return state.sortBy !== 'RECENT_DESC'
  }, [state])

  const [showFilter, setShowFilter] = useState(firstShowFilter);
  const [showSort, setShowSort] = useState(firstShowSort);

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
                  ? { backgroundColor: 'rgb(255 255 255 / 40%)' }
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
                showSort ? { backgroundColor: 'rgb(255 255 255 / 40%)' } : null
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
          <AnimatePresence>
            {showFilter && (
              <SearchContentAnimator>
                <SearchFilter>{filterContent}</SearchFilter>
              </SearchContentAnimator>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showSort && (
              <SearchContentAnimator>
                <SearchSort>{sortContent}</SearchSort>
              </SearchContentAnimator>
            )}
          </AnimatePresence>
        </>
      ) : null}
    </section>
  );
};

const SearchFilter = ({ show, children }) => {
  return (
    <section className='list-search-filter'>
      <div className='list-search-content-title'>Filter</div>
      {children}
    </section>
  );
};

const SearchSort = ({ show, children }) => {
  return (
    <section className='list-search-sort'>
      <div className='list-search-content-title'>Sort</div>
      {children}
    </section>
  );
};

const SearchContentItem = ({ title, children, isLv }) => {
  return (
    <div style={{ marginRight: '20px' }}>
      <div style={{ display: 'flex' }}>
        <h4 style={{ marginBottom: '5px', marginTop: '5px' }}>{title}</h4>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>{children}</div>
    </div>
  );
};

const SearchContentCheckbox = ({ onSelect, tooltip, img, defaultState }) => {
  const [btnState, setBtnState] = useState(defaultState);

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
            onSelect(event.target, btnState);

            if (btnState === 'unchecked') {
              setBtnState('include');
            } else if (btnState === 'include') {
              setBtnState('exclude');
            } else {
              setBtnState('unchecked');
            }
          }}
          ref={(input) => {
            if (input) {
              input.checked = btnState === 'include';
              input.indeterminate = btnState === 'exclude';
            }
          }}
          className='list-search-content-toggle-button level-list-filter-tag'
        />
        <label htmlFor={tooltip}>
          <img
            src={`/${img}`}
            alt={tooltip}
            style={{
              width: '28px'
            }}
          />
          {btnState !== 'unchecked' && (
            <img
              src={`/tag/${btnState}.svg`}
              alt=''
              className='list-search-content-toggle-button-indicator'
            />
          )}
        </label>
      </div>

      <TagTooltip tag={tooltip} id={'tag_' + tooltip} />
    </>
  );
};

const SearchContentInput = ({ onInput, placeholder }) => {
  return (
    <input
      className='list-text-input'
      type='number'
      placeholder={placeholder}
      onChange={(event) => {
        onInput(event.target.value);
      }}
      style={{ width: 100 }}
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
