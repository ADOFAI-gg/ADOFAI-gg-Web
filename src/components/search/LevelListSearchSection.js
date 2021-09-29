import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSortAmountDown,
  faQuestionCircle,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

const tagDescription = [
  {
    tagName: "Short",
    tagDescription: "Levels that are under a minute.",
  },
  {
    tagName: "Triplet",
    tagDescription: "This level contains triplets.",
  },
  {
    tagName: "No Speed Change",
    tagDescription: "The tile bpm remains constant throughout this level.",
  },
  {
    tagName: "Medium",
    tagDescription: "Levels that are under 4 minutes.",
  },
  {
    tagName: "Memorization",
    tagDescription: "This level requires memorization.",
  },
  {
    tagName: "No Swirls",
    tagDescription: "This level has no swirls.",
  },
  {
    tagName: "Acceleration / Deceleration",
    tagDescription: "This level uses a song that changes BPM.",
  },
  {
    tagName: "Magic Shape",
    tagDescription: "This level contains magic shapes.",
  },
  {
    tagName: "Septuplet",
    tagDescription: "This level contains septuplets.",
  },
  {
    tagName: "64+ Beat",
    tagDescription: "This level contains beats higher than 64.",
  },
  {
    tagName: "Long",
    tagDescription: "Levels that are over 4 minutes.",
  },
  {
    tagName: "Funky Beat",
    tagDescription: "This level contains funky beats.",
  },
  {
    tagName: "Pseudo",
    tagDescription:
      "This level contains parts where you have to press two fingers at once.",
  },
  {
    tagName: "Gallop",
    tagDescription: "This level contains parts where you do fast streams.",
  },
  {
    tagName: "Pseudo +2",
    tagDescription:
      "This level contains parts where you have to press multiple fingers at once.",
  },
  {
    tagName: "Swing",
    tagDescription: "This level contains swing rhythms.",
  },
  {
    tagName: "Slow",
    tagDescription: "This level's BPM is under 300.",
  },
  {
    tagName: "Polyrhythm",
    tagDescription: "This level contains polyrhythms.",
  },
  {
    tagName: "Quintuplet",
    tagDescription: "This level contains quintuplets.",
  },
  {
    tagName: "Subjective",
    tagDescription: "This level's difficulty can vary by person.",
  },
  {
    tagName: "Tresillo",
    tagDescription: "This level contains tresillos.",
  },
];

const SearchSection = ({
  placeholder,
  value,
  onSearch,
  filterContent,
  sortContent,
}) => {
  const [showFilter, setShowFilter] = React.useState(false);
  const [showSort, setShowSort] = React.useState(false);

  const onClickFilterButton = () => setShowFilter(!showFilter);
  const onClickSortButton = () => setShowSort(!showSort);

  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <section className="list-search-container">
      <section className="list-search-section">
        <input
          className="list-text-input list-search-bar"
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(event) => {
            onSearch(event.target.value);
          }}
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

        <div className="list-search-sort-button" onClick={refreshPage}>
          <div className="tooltip-container">
            <span className="tooltiptext">Reset Filter</span>

            <FontAwesomeIcon icon={faEraser} size="lg" />
          </div>
        </div>
      </section>

      <SearchFilter show={showFilter}>{filterContent}</SearchFilter>

      <SearchSort show={showSort}>{sortContent}</SearchSort>
    </section>
  );
};

const SearchFilter = ({ show, children }) => {
  return (
    <section
      className={`list-search-filter ${
        show ? "list-search-content-show" : "list-search-content-hide"
      }`}
    >
      <div className="list-search-content-title">Filter</div>
      {children}
    </section>
  );
};

const SearchSort = ({ show, children }) => {
  return (
    <section
      className={`list-search-sort ${
        show ? "list-search-content-show" : "list-search-content-hide"
      }`}
    >
      <div className="list-search-content-title">Sort by</div>
      {children}
    </section>
  );
};

const SearchContentItem = ({ title, children, isLv }) => {
  return (
    <div style={{ marginRight: "20px" }}>
      <div style={{ display: "flex" }}>
        <h4 style={{ marginBottom: "5px", marginTop: "5px" }}>{title}</h4>
        {isLv ? (
          <>
            <FontAwesomeIcon
              data-tip
              data-for="lvDescription"
              icon={faQuestionCircle}
              size="lg"
              style={{ height: "16px", marginTop: "7px", marginLeft: "5px" }}
            />
            <ReactTooltip
              id="lvDescription"
              place="bottom"
              type="dark"
              effect="solid"
            >
              <span style={{ whiteSpace: "pre-line" }}>
                {"Add 0.5 instead of +\nex) 18+ -> 18.5"}
              </span>
            </ReactTooltip>
          </>
        ) : null}
      </div>
      <div style={{ display: "flex" }}>{children}</div>
    </div>
  );
};

const SearchContentCheckbox = ({ onSelect, tooltip, img }) => {
  // TODO Tooltiptext
  return (
    <>
      <div
        data-tip
        data-for={"tag_" + tooltip}
        className="list-search-content-toggle"
      >
        <input
          type="checkbox"
          id={tooltip}
          onChange={(tooltip) => {
            onSelect(tooltip.target.id);
          }}
          className="list-search-content-toggle-button"
        />
        <label for={tooltip}>
          <img
            src={`/${img}`}
            alt={tooltip}
            style={{ width: "28px", marginRight: "8px" }}
          />
        </label>
      </div>

      <ReactTooltip
        id={"tag_" + tooltip}
        place="bottom"
        type="dark"
        effect="solid"
      >
        <span style={{ whiteSpace: "pre-line" }}>
          {tagDescription[tooltip - 1].tagName.toString() +
            "\n" +
            tagDescription[tooltip - 1].tagDescription.toString()}
        </span>
      </ReactTooltip>
    </>
  );
};

const SearchContentInput = ({ onInput, placeholder, isLast }) => {
  return (
    <input
      className="list-text-input"
      type="number"
      placeholder={placeholder}
      onChange={(event) => {
        onInput(event.target.value);
      }}
      style={
        isLast ? { width: "100px", marginLeft: "5px" } : { width: "100px" }
      }
    />
  );
};

const SearchContentRadio = ({ onSelect, tooltip, img, isDefault }) => {
  // TODO Tooltiptext
  return (
    <div className="list-search-content-toggle">
      <input
        type="radio"
        id={tooltip}
        onChange={(tooltip) => {
          onSelect(tooltip.target.id);
        }}
        name="radio"
        className="list-search-content-toggle-button"
        defaultChecked={isDefault}
      />
      <label for={tooltip}>
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
  SearchContentRadio,
};
