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
              <img
                src={"other_icons/speed.svg"}
                alt="Speed Trial: "
                style={{ height: "0.9em", marginRight: "3px" }}
              />
              {rank.bestPlay.speed / 100}x
              {rank.bestPlay.rawAccuracy ? (
                <>
                  <img
                    src={"other_icons/accuracy.svg"}
                    alt="Accurancy: "
                    style={{
                      height: "0.9em",
                      marginLeft: "5px",
                      marginRight: "3px",
                    }}
                  />
                  {rank.bestPlay.rawAccuracy.toFixed(1)}%
                </>
              ) : null}{" "}
              (Lv. {String(rank.bestPlay.difficulty).replace(".5", "+")})
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RankingItem;
