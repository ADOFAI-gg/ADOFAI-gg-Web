import React from 'react';
import { Link } from 'react-router-dom';

const RankingItem = ({ rank, index }) => {
  const { name, totalPp, bestPlay } = rank;
  const speedFormat = String(bestPlay.speed / 100);

  const artists = bestPlay.level.music.artists;

  return (
    <article className='ranking-item'>
      <div className='ranking-item-rank'>#{index + 1}</div>
      <div className='ranking-item-content'>
        <div className='ranking-item-name notranslate'>{name}</div>

        <div className='ranking-item-detail'>
          <div className='ranking-item-detail-pp'>{totalPp.toFixed(0)}</div>

          <div className='ranking-item-detail-highest notranslate'>
            <Link
              to={`/levels/${bestPlay.level.id}`}
              className='ranking-item-detail-highest-title'
            >
              {artists.length ? artists[0].name + (artists.length > 1 ? '...' : '') : 'Unknown Artist'}
              {' - '}
              {bestPlay.level.name}
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
                  src={'other_icons/xaccuracy.svg'}
                  alt='X Accurancy: '
                  style={{
                    height: '0.9em',
                    marginRight: '3px'
                  }}
                />
                {bestPlay.xAccuracy
                  ? `${bestPlay.xAccuracy.toFixed(1)}%`
                  : `///./%`}
              </div>

              <div className='ranking-item-detail-highest-info-difficulty'>
                Lv.
                {bestPlay.level.difficulty < 20
                  ? String(bestPlay.level.difficulty).replace('.5', '+')
                  : bestPlay.level.difficulty}
              </div>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RankingItem;
