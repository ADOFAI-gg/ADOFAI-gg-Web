import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

// Components
import LevelTags from './LevelTags';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots } from '@fortawesome/free-solid-svg-icons';

const LevelInfo = ({ levelData }) => {
  const [isOpned, setIsOpned] = useState(false);

  const {
    id,
    title,
    difficulty,
    creators,
    // songId,
    song,
    artists,
    minBpm,
    maxBpm,
    tiles,
    comments,
    likes,
    tags,
    epilepsyWarning
  } = levelData;

  const LevelDifficulty = () => {
    return (
      <img
        className='level-item-info-difficulty'
        src={`difficulty_icons/${difficulty}.svg`}
        alt={`Lv. ${difficulty}`}
      />
    );
  };

  return (
    <Link to={'/levels/' + id}>
      <article
        className='level-item-info'
        onMouseLeave={(event) => {
          event.preventDefault();
          setIsOpned(false);
        }}
        onMouseEnter={(event) => {
          event.preventDefault();
          setIsOpned(true);
        }}
      >
        <CSSTransition
          in={!isOpned}
          unmountOnExit
          timeout={500}
          classNames='level-item-info-animation'
        >
          <div className='level-item-info-container-normal'>
            <LevelDifficulty />

            <div className='level-item-info-section' style={{ width: '400px' }}>
              <div
                className={`level-item-info-label ${
                  epilepsyWarning && 'level-item-info-label-ew'
                }`}
              >
                Level<span className='level-item-info-id'>{id}</span>
              </div>
              <div className='level-item-info-value notranslate'>{title}</div>
            </div>

            <div className='level-item-info-section' style={{ width: '200px' }}>
              <div className='level-item-info-label'>Creator</div>
              <div className='level-item-info-value notranslate'>
                {creators.join(' & ')}
              </div>
            </div>

            <div
              className='level-item-info-section level-item-info-section-center'
              style={{ width: '130px' }}
            >
              <div className='level-item-info-label'>BPM</div>
              <div className='level-item-info-value notranslate'>
                {minBpm === maxBpm
                  ? minBpm
                  : minBpm.toString() + '-' + maxBpm.toString()}
              </div>
            </div>

            <div
              className='level-item-info-section level-item-info-section-center'
              style={{ width: '80px' }}
            >
              <div className='level-item-info-label'>Tiles</div>
              <div className='level-item-info-value notranslate'>{tiles}</div>
            </div>

            <div
              className='level-item-info-section level-item-info-section-center'
              style={{ width: '80px' }}
            >
              <div className='level-item-info-label'>
                <FontAwesomeIcon
                  icon={faCommentDots}
                  style={{ height: '12px', weight: '12px', color: 'white' }}
                />
              </div>
              <div className='level-item-info-value notranslate'>
                {comments}
              </div>
            </div>

            <div
              className='level-item-info-section level-item-info-section-center'
              style={{ width: '80px' }}
            >
              <div className='level-item-info-label'>
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ height: '12px', weight: '12px', color: '#FF4E4E' }}
                />
              </div>
              <div className='level-item-info-value notranslate'>{likes}</div>
            </div>
          </div>
        </CSSTransition>

        {/* <div className="level-item-info-background-container ">
          <div
            style={{
              backgroundImage: `url(${
                "level_backgrounds/" + levelData.levelBackground
              })`,
            }}
            className="level-item-info-background"
          ></div>
        </div> */}

        <CSSTransition
          in={isOpned}
          unmountOnExit
          timeout={500}
          classNames='level-item-info-animation'
        >
          <div
            className='level-item-info-container-hover'
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          >
            <LevelDifficulty />
            <div className='level-item-info-section' style={{ width: '400px' }}>
              <div
                className={`level-item-info-label ${
                  epilepsyWarning ? 'level-item-info-label-ew' : ''
                }`}
              >
                Song
              </div>
              <div className='level-item-info-value notranslate'>{song}</div>
            </div>

            <div className='level-item-info-section' style={{ width: '250px' }}>
              <div className='level-item-info-label'>Artist</div>
              <div className='level-item-info-value notranslate'>
                {artists.join(' & ')}
              </div>
            </div>

            <div className='level-item-info-section' style={{ width: '335px' }}>
              <div className='level-item-info-label'>Tags</div>
              <div className='level-item-info-value'>
                {tags.length !== 0
                  ? tags.map((tag, index) => (
                      <LevelTags
                        tag={tag.id}
                        id={id}
                        key={index}
                        styleClass='main-tag'
                      />
                    ))
                  : tags.length === 0 && (
                      <img
                        className='main-tag'
                        src={'/tag/empty.svg'}
                        alt='No Tags'
                      />
                    )}
              </div>
            </div>
          </div>
        </CSSTransition>
      </article>
    </Link>
  );
};

export default LevelInfo;
