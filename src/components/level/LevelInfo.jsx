import React from 'react';
import { Link } from 'react-router-dom';

// Components
import LevelTags from './LevelTags';

const LevelInfo = ({ levelData }) => {
  const {
    id,
    title,
    difficulty,
    creators,
    // songId,
    music,
    tags,
    epilepsyWarning
  } = levelData;

  const { minBpm, maxBpm } = music;

  const LevelDifficulty = () => {
    return (
      <img
        className='level-item-info-difficulty'
        src={`/difficulty_icons/${difficulty}.svg`}
        alt={`Lv. ${difficulty}`}
      />
    );
  };

  return (
    <Link to={'/levels/' + id}>
      <article className='level-item-info'>
        <div
          className={`level-item-info-container ${
            epilepsyWarning ? 'level-item-info-ew' : ''
          }`}
        >
          <LevelDifficulty />

          <div className='level-item-info-section' style={{ width: '360px' }}>
            <div
              className={`level-item-info-label ${
                epilepsyWarning && 'level-item-info-label-ew'
              }`}
            >
              Level<span className='level-item-info-id'>{id}</span>
            </div>
            <div className='level-item-info-value notranslate'>{title}</div>
          </div>

          <div className='level-item-info-section' style={{ width: '180px' }}>
            <div className='level-item-info-label'>Creator</div>
            <div className='level-item-info-value notranslate'>
              {creators.map((x) => x.name).join(' & ')}
            </div>
          </div>

          <div className='level-item-info-section' style={{ width: '180px' }}>
            <div className='level-item-info-label'>Artist</div>
            <div className='level-item-info-value notranslate'>
              {music.artists.map((x) => x.name).join(' & ')}
            </div>
          </div>

          <div
            className='level-item-info-section level-item-info-section-center'
            style={{ width: '110px' }}
          >
            <div className='level-item-info-label'>BPM</div>
            <div className='level-item-info-value notranslate'>
              {
                minBpm === maxBpm // 레벨 bpm이 일정할 때
                  ? minBpm === 0 // bpm이 0이라면
                    ? '?' // ? 표시
                    : minBpm // 아니면 최소 bpm 표시(어차피 최소랑 최대랑 같음)
                  : `${minBpm} - ${maxBpm}` // 아니라면 bpm 범위 표시
              }
            </div>
          </div>

          <div className='level-item-info-section' style={{ width: '150px' }}>
            <div className='level-item-info-label'>Tags</div>
            <div className='level-item-info-value level-item-info-tags'>
              {tags.length !== 0
                ? tags.map((tag, index) => (
                    <LevelTags
                      tag={tag.id}
                      id={id}
                      key={index}
                      styleClass='level-item-info-tag'
                    />
                  ))
                : tags.length === 0 && (
                    <img
                      className='level-item-info-tag'
                      src={'/tag/empty.svg'}
                      alt='No Tags'
                    />
                  )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default LevelInfo;
