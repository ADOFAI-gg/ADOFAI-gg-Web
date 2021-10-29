import React from "react";
import { Link } from "react-router-dom";

const RankingItem = ({ rank, index }) => {
  const speed = String(rank.bestPlay.speed / 100);

  return (
    <article className="ranking-item">
      <div className="ranking-item-rank">#{index + 1}</div>
      <div className="ranking-item-content">
        <div className="ranking-item-name notranslate">{rank.name}</div>

        <div className="ranking-item-detail">
          <div className="ranking-item-detail-pp">
            {rank.totalBpm.toFixed(0)}
          </div>

          <div className="ranking-item-detail-highest notranslate">
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
              <div className="ranking-item-detail-highest-info-speed">
                <img
                  src={"other_icons/speed.svg"}
                  alt="Speed Trial: "
                  style={{ height: "0.9em", marginRight: "3px" }}
                />
                {speed.startsWith("0.") ? speed.replace("0", "") : speed}x
              </div>

              <div className="ranking-item-detail-highest-info-accuracy">
                <img
                  src={"other_icons/accuracy.svg"}
                  alt="Accurancy: "
                  style={{
                    height: "0.9em",
                    marginRight: "3px",
                  }}
                />
                {rank.bestPlay.rawAccuracy
                  ? `${rank.bestPlay.rawAccuracy.toFixed(1)}%`
                  : `///./%`}
              </div>

              <div className="ranking-item-detail-highest-info-difficulty">
                Lv.
                {rank.bestPlay.difficulty < 20
                  ? String(rank.bestPlay.difficulty).replace(".5", "+")
                  : rank.bestPlay.difficulty}
              </div>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RankingItem;
