import React from "react";
import { Link } from "react-router-dom";

const RankingItem = ({ rank, index }) => {
  return (
    <article className="ranking-item">
      <div className="ranking-item-rank">#{index + 1}</div>
      <div className="ranking-item-content">
        <div className="ranking-item-name">{rank.name}</div>

        <div className="ranking-item-detail">
          <div className="ranking-item-detail-pp">
            {rank.totalBpm.toFixed(0)}
          </div>

          <div className="ranking-item-detail-highest">
            {/* href={`/levels/${rank.bestPlay.id}`} */}
            <Link
              to={`/levels/${rank.bestPlay.levelId}`}
              className="ranking-item-detail-highest-title"
            >
              {rank.bestPlay.artists[1]
                ? `${rank.bestPlay.artists[0]}…`
                : rank.bestPlay.artists[0]}
              {" - "}
              {rank.bestPlay.title}
            </Link>
            <span className="ranking-item-detail-highest-info">
              x{rank.bestPlay.speed / 100},{" "}
              {rank.bestPlay.rawAccuracy
                ? `Acc ${rank.bestPlay.rawAccuracy.toFixed(1)}%`
                : null}{" "}
              (Lv. {String(rank.bestPlay.difficulty).replace(".5", "+")})
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RankingItem;
