import React from 'react';

// Stylesheets
import '../stylesheets/ranking.css';

const RankingPage = () => {
  // Imported from Forum Ranking Page
  const exampleUserName = [
    'Nephrolepis',  '조미래',     '라임쿠키',       '으악',
    '유수찬',       'Alpha',      '양성현',         'andygames',
    '유천',         '엘가말',     'RainB',          '완두콩',
    '파곰',         '곰돌이x4',   '호밀깜빠뉴',     'REGEN',
    'yyy123454321', '바퀴',       'peterpeom1',     '거신_Kushin',
    '성훈',         '컨피안',     'AcoldogA',       'Yee',
    '연석이2',      '딜러조아',   'Wndrks',         '덕키',
    '평사냥이',     'TrusionSFM', 'SilverCube',     'Luxus',
    '꼬깔콘_',      '동타개쉽노', '오룡이',         '아기우니',
    'Ra리안',       'Lupel_2',    '공백',           'PatrickKR',
    '으헿',         '7_Even',     'Editor AlriC',   'DFTX',
    '제브리디',     '지네고',     '파이호크',       'REVERSE',
    '코튼',         '뇌절추',     '썩은 완두콩',    'Format_Kim',
    'qazplmr81',    '파랑이',     '79brue',         '태영이',
    '탱글이곰',     '커티skuty',  '마포',           'Redredman',
    '와플',         'Fri',        '바지',           '유경',
    'justHydro.',   '빈소기',     '플마(Plma75)',   'ROSY',
    '토끼로봇',     'Plash',      '궈니',           '초고도비만',
    '감자',         'Neo_',       '짜요',           '소소한마술사',
    'DJ KIM',       '나션',       '스으으으노우볼', '이하님',
    'iko',          'st4re',      'Lupel_2#1214',   'leehig'
  ];
  
  return (
    <div className="ranking-main">
      <div className="content-title" style={{ margin: '15px', fontSize: '2em' }}>
        Ranking
      </div>

      <div className="ranking-content">
        {Array.from({ length: 100 }).map((i, index) => {
          return (
          <div className="ranking-item">
            <div className="ranking-item-rank">
              #{index + 1}
            </div>
            <div className="ranking-item-content">
              <div className="ranking-item-name">
                {exampleUserName[Math.floor(Math.random() * exampleUserName.length)]}
              </div>

              <div className="ranking-item-detail">
                <div className="ranking-item-detail-pp">
                  276.49
                </div>

                <div className="ranking-item-detail-highest">
                  <span className="ranking-item-detail-highest-title">
                    かめりあ
                    -
                    Tentaclar Aliens' Epic Extraterretterrestrial Jungle Dance Party Inside Of A Super-Ultra-Mega-Gigantic U.F.O. (It Maybe U.U.F.O.) Silently Flying Over Illinois St.
                  </span>
                  <span className="ranking-item-detail-highest-info">
                    x{1.2} (Lv. 20+)
                  </span>
                </div>
              </div>
            </div>
          </div>
          );
        })}

      </div>
    </div>
  );
};

export default RankingPage;