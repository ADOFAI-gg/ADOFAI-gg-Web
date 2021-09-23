import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import {
  faUserCircle,
  faHeart,
  faFolderOpen,
  faArrowAltCircleDown,
  faWindowRestore,
} from "@fortawesome/free-regular-svg-icons";

/** modInfo must be ...
 * {
 *   id: 123123,
 *   name: "AdofaiTweaks",
 *   version: "2.3.5",
 *   description: "description",
 *   likes: "45",
 *   downloads: "1069",
 *   supportVersion: "r75",
 *   category: "Tweaks", // Tweaks, Game Play, Level Editor, Text Edit, Bug Fix, Planet Edit, Library, Other
 *   author: "PizzaLover007"
 * };
 */

const ModsListItem = ({ modInfo }) => {
  const categoryIconDict = {
    Tweaks: "tweaks",
    "Game Play": "game_play",
    "Level Editor": "level_editor",
    "Text Edit": "text_edit",
    "Bug Fix": "bug_fix",
    "Planet Edit": "planet_edit",
    Library: "library",
    Other: "other",
  };

  const {
    id,
    name,
    version,
    description,
    likes,
    downloads,
    supportVersion,
    category,
    author,
  } = modInfo;
  const categoryIcon = categoryIconDict[category];

  return (
    <article className="mod-list-item">
      <Link to={`/mods/${id}`} className="mod-list-item-left">
        <div className="mod-list-mod-category">
          <img src={`/mod_icons/${categoryIcon}.svg`} alt="category icon"></img>
        </div>

        <div className="mod-list-mod-info">
          <div className="mod-list-mod-title">
            {name}
            <span className="mod-list-mod-version">v{version}</span>
          </div>
          <div className="mod-list-mod-description">{description}</div>
          <div className="mod-list-mod-footer">
            <div className="mod-list-mod-footer-item">
              <FontAwesomeIcon icon={faHeart} />
              {likes}
            </div>
            <div className="mod-list-mod-footer-item">
              <FontAwesomeIcon icon={faArrowAltCircleDown} />
              {downloads}
            </div>
            <div className="mod-list-mod-footer-item">
              <FontAwesomeIcon icon={faWindowRestore} />
              {supportVersion}
            </div>
            <div className="mod-list-mod-footer-item">
              <FontAwesomeIcon icon={faFolderOpen} />
              {category}
            </div>
            <div className="mod-list-mod-footer-item">
              <FontAwesomeIcon icon={faUserCircle} />
              {author}
            </div>
          </div>
        </div>
      </Link>
      <div className="mod-list-mod-download">
        <FontAwesomeIcon icon={faDownload} size="2x" />
      </div>
    </article>
  );
};

export default ModsListItem;
