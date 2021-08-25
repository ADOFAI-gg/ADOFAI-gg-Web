import React from "react";

const RankingItem = ({ rank, index }) => {
  return (
    <div className="ranking-item">
      <div className="ranking-item-rank">#{index + 1}</div>
      <div className="ranking-item-content">
        <div className="ranking-item-name">{rank.name}</div>

        <div className="ranking-item-detail">
          <div className="ranking-item-detail-pp">
            {rank.totalPp.toFixed(2)}
          </div>

          <div className="ranking-item-detail-highest">
            {/* href={`/levels/${rank.bestPlay.id}`} */}
            <a
              href={`/levels/${rank.bestPlay.levelId}`}
              target="_blank"
              rel="noreferrer"
              className="ranking-item-detail-highest-title"
            >
              {rank.bestPlay.artists[1]
                ? `${rank.bestPlay.artists[0]}…`
                : rank.bestPlay.artists[0]}
              {" - "}
              {rank.bestPlay.title}
            </a>
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
    </div>
  );
};

export default RankingItem;
