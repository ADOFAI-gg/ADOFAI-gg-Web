import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSortAmountDown } from "@fortawesome/free-solid-svg-icons";

const SearchSection = ({ placeholder, filterContent, sortContent }) => {
  const [showFilter, setShowFilter] = React.useState(false);
  const [showSort, setShowSort] = React.useState(false);

  const onClickFilterButton = () => setShowFilter(!showFilter);
  const onClickSortButton = () => setShowSort(!showSort);

  return (
    <section className="list-search-container">
      <div className="list-search-section">
        <input
          className="list-text-input list-search-bar"
          type="text"
          placeholder={placeholder}
        />

        <div
          className="list-search-filter-button"
          onClick={onClickFilterButton}
          style={
            showFilter ? { backgroundColor: "rgb(255 255 255 / 50%)" } : null
          }
        >
          <div className="tooltip-container">
            <span className="tooltiptext">Filter</span>

            <FontAwesomeIcon icon={faFilter} size="lg" />
          </div>
        </div>

        <div
          className="list-search-sort-button"
          onClick={onClickSortButton}
          style={
            showSort ? { backgroundColor: "rgb(255 255 255 / 50%)" } : null
          }
        >
          <div className="tooltip-container">
            <span className="tooltiptext">Sort</span>

            <FontAwesomeIcon icon={faSortAmountDown} size="lg" />
          </div>
        </div>
      </div>

      <SearchFilter show={showFilter}>{filterContent}</SearchFilter>

      <SearchSort show={showSort}>{sortContent}</SearchSort>
    </section>
  );
};

const SearchFilter = ({ show, children }) => {
  return (
    <div
      className={`list-search-filter ${
        show ? "list-search-content-show" : "list-search-content-hide"
      }`}
    >
      <div className="list-search-content-title">Filter</div>
      {children}
    </div>
  );
};

const SearchSort = ({ show, children }) => {
  return (
    <div
      className={`list-search-sort ${
        show ? "list-search-content-show" : "list-search-content-hide"
      }`}
    >
      <div className="list-search-content-title">Sort by</div>
      {children}
    </div>
  );
};

const SearchContentItem = ({ title, children }) => {
  return (
    <div style={{ marginRight: "20px" }}>
      <h4 style={{ marginBottom: "5px", marginTop: "5px" }}>{title}</h4>
      <div style={{ display: "flex" }}>{children}</div>
    </div>
  );
};

const SearchContentBtn = ({ tooltip, img, isRadio }) => {
  // TODO Tooltiptext
  return (
    <div className="list-search-content-toggle">
      <input
        type={isRadio ? "radio" : "checkbox"}
        id={tooltip}
        name={isRadio ? "radio" : null}
        className="list-search-content-toggle-button"
      />
      <label for={tooltip}>
        <img src={`/${img}`} alt={tooltip} />
      </label>
    </div>
  );
};

export { SearchSection, SearchContentItem, SearchContentBtn };
