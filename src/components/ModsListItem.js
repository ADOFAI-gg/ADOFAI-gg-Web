import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle, faHeart, faFolderOpen, faArrowAltCircleDown, faWindowRestore } from '@fortawesome/free-regular-svg-icons'

// modInfo must be ...
const modInfo = {
  name: "AdofaiTweaks",
  version: "2.3.5",
  description: "description",
  likes: "45",
  downloads: "1069",
  supportVersion: "r75",
  category: "Tweaks", // Tweaks, Game Play, Level Editor, Text Edit, Bug Fix, Planet Edit, Library, Other
  author: "PizzaLover007"
};

const ModsListItem = ({ modInfo }) => {
  const categoryIconDict = {
    'Tweaks': 'tweaks',
    'Game Play': 'game_play',
    'Level Editor': 'level_editor',
    'Text Edit': 'text_edit',
    'Bug Fix': 'bug_fix',
    'Planet Edit': 'planet_edit',
    'Library': 'library',
    'Other': 'other'
  };

  const { name, version, description, likes, downloads, supportVersion, category, author } = modInfo;
  const categoryIcon = categoryIconDict[category];

  return (
    <div className="mods-list-item">
      <div className="mods-list-item-left">
        <div className="mods-mod-category">
          <img src={`http://localhost:3000/mod_icons/${categoryIcon}.svg`} alt="category icon"></img>
        </div>

        <div className="mods-mod-info">
          <div className="mods-mod-title">
            {name}
            <span className="mods-mod-version">v{version}</span>
          </div>
          <div className="mods-mod-description">
            {description}
          </div>
          <div className="mods-mod-footer">
            <div className="mods-mod-footer-item">
              <FontAwesomeIcon icon={faHeart} />{likes}
            </div>
            <div className="mods-mod-footer-item">
              <FontAwesomeIcon icon={faArrowAltCircleDown} />{downloads}
            </div>
            <div className="mods-mod-footer-item">
              <FontAwesomeIcon icon={faWindowRestore} />{supportVersion}
            </div>
            <div className="mods-mod-footer-item">
              <FontAwesomeIcon icon={faFolderOpen} />{category}
            </div>
            <div className="mods-mod-footer-item">
              <FontAwesomeIcon icon={faUserCircle} />{author}
            </div>
          </div>
        </div>
      </div>
      <div className="mods-mod-download">
        <FontAwesomeIcon icon={faDownload} size="2x" />
      </div>
    </div>
  );
};

export default ModsListItem;