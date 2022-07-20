import React from 'react';
import { Link } from 'react-router-dom';

const RankingItem = ({ rank, index }) => {
  const { name, totalBpm, bestPlay } = rank;
  const speedFormat = String(bestPlay.speed / 100);

  return (
    <article className='ranking-item'>
      <div className='ranking-item-rank'>#{index + 1}</div>
      <div className='ranking-item-content'>
        <div className='ranking-item-name notranslate'>{name}</div>

        <div className='ranking-item-detail'>
          <div className='ranking-item-detail-pp'>{totalBpm.toFixed(0)}</div>

          <div className='ranking-item-detail-highest notranslate'>
            <Link
              to={`/levels/${bestPlay.levelId}`}
              className='ranking-item-detail-highest-title'
            >
              {bestPlay.level.music.artists[1]
                ? `${bestPlay.level.music.artists[0].name}…`
                : bestPlay.level.music.artists[0].name}
              {' - '}
              {bestPlay.title}
            </Link>

            <span className='ranking-item-detail-highest-info'>
              <div className='ranking-item-detail-highest-info-speed'>
                <img
                  src={'other_icons/speed.svg'}
                  alt='Speed Trial: '
                  style={{ height: '0.9em', marginRight: '3px' }}
                />
                {speedFormat.startsWith('0.')
                  ? speedFormat.replace('0', '')
                  : speedFormat}
                x
              </div>

              <div className='ranking-item-detail-highest-info-accuracy'>
                <img
                  src={'other_icons/accuracy.svg'}
                  alt='Accurancy: '
                  style={{
                    height: '0.9em',
                    marginRight: '3px'
                  }}
                />
                {bestPlay.accuracy
                  ? `${bestPlay.accuracy.toFixed(1)}%`
                  : `///./%`}
              </div>

              <div className='ranking-item-detail-highest-info-difficulty'>
                Lv.
                {bestPlay.difficulty < 20
                  ? String(bestPlay.difficulty).replace('.5', '+')
                  : bestPlay.difficulty}
              </div>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RankingItem;
