import React from 'react';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUserCircle, faFileDownload, faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

// Components
import LikeButton from '../components/LikeButton';

// Stylesheets
import '../stylesheets/mod.css';

const ModPage = () => {
  // detailModInfo must be ...
  const exampleModInfo = {
    id: 123,
    name: "oh no there are too many adofai tweaks22",
    version: "2.3.5",
    detailDescription: `
    ## 기능

    아래 기능들을 사용자가 활성화/비활성화할 수 있음.
    
    - 특정 이펙트 비활성화
        - VFX 필터 (흑백, 아케이드 등) 끄기
        - 블룸 끄기
        - 스크린 플래시 끄기
        - "필터 설정" 이펙트 끄기
        - 화면 흔들림 끄기
    - 특정 UI 숨기기
        - 판정 텍스트 숨기기 (정확, 빠름 등)
        - 미스 표시 아이콘 숨기기
    
            ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ad753c46-6382-4d3b-82ef-e0f644dd830f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ad753c46-6382-4d3b-82ef-e0f644dd830f/Untitled.png)
    
        - 노래 이름 및 작곡가 숨기기
            - 오토, 자동 플레이 텍스트, 판정 조정 아이콘(보통 판정, 엄격한 판정 등) 숨기기
        - Beta Build 텍스트 숨기기
    - 판정 표시
        - 입력 실수 미터 표시
    
            ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/99c3e491-5f96-4d73-b714-08f11f6e14b3/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/99c3e491-5f96-4d73-b714-08f11f6e14b3/Untitled.png)
    
        - "정확" 텍스트 숨기기
    - 입력되는 키 제한하기
    - 키뷰어
    - 행성 색상과 행성 불투명도
    - 기타
        - 레벨 에디터에서 플레이 도중 마우스 휠로 확대/축소 사용 안 함
        - "글리치" 필터에서 화면이 뒤집히는 것을 방지
    
    ## 안내 사항
    
    - 키뷰어에서는 초당 입력 수, 총 입력 횟수를 표시하는 기능을 지원하지 않으며, 입력 횟수는 게임 실행마다 초기화됨.
  `,
    likes: "124780345",
    downloads: "1069",
    supportVersion: ["r75", "r76", "r77", "r78", "r79", "r80", "r81", "r82", "r83", "r84", "r85"],
    category: "Level Editor",
    author: "PizzaLover007",
    updatedAt: new Date(),
    createdAt: new Date(-1),
    githubRepository: "https://github.com/"
  };
  
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

  const { /* id, */ name, version, detailDescription, likes, downloads, supportVersion, category, author, updatedAt, createdAt, githubRepository } = exampleModInfo;
  const categoryIcon = categoryIconDict[category];
  
  return (
    <div className="mod-info-main">
      <div className="mod-info-feature">
        <div className="mod-info-feature-top">
          <div>
            <div className="mod-info-title">
              <img className="mod-info-category-icon" src={`/mod_icons/${categoryIcon}.svg`} alt="category icon" />
              <div className="mod-info-name">{name}</div>
              <div className="mod-info-version">v{version}</div>
            </div>
            <div className="mod-info-date">
              <div>Uploaded On {createdAt.toLocaleDateString()}</div>
              <div>Last Updated On {updatedAt.toLocaleDateString()}</div>
            </div>
          </div>
          <div className="mod-info-buttons">
            {githubRepository !== null ?
              <a href={githubRepository} target="_blank" rel="noreferrer" className="mod-info-button">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            : null}
            
            <a href='#ay' target="_blank" className="mod-info-button">
              <FontAwesomeIcon icon={faDownload} />
            </a>
          </div>
        </div>

        <div className="mod-info-feature-bottom">
          <div className="mod-info-feature-bottom-detail">
            <div className="mod-info-feature-bottom-item">
              <div className="mod-info-feature-bottom-item-title">
                <FontAwesomeIcon icon={faUserCircle} />
                Creator
              </div>
              <div className="mod-info-feature-bottom-item-content">
                {author}
              </div>
            </div>

            <div className="mod-info-feature-bottom-item">
              <div className="mod-info-feature-bottom-item-title">
                <FontAwesomeIcon icon={faFileDownload} />
                Download
              </div>
              <div className="mod-info-feature-bottom-item-content">
                {downloads}
              </div>
            </div>

            <div className="mod-info-feature-bottom-item">
              <div className="mod-info-feature-bottom-item-title">
                <FontAwesomeIcon icon={faWindowRestore} />
                Supported Version
              </div>
              <div className="mod-info-feature-bottom-item-content">
                {supportVersion.map(version => <span style={{ marginRight: '10px' }}>{version}</span>)}
              </div>
            </div>
          </div>

          <LikeButton likes={likes} />
        </div>
      </div>

      <div className="mod-info-body">
        {console.log(detailDescription)}
        <ReactMarkdown remarkPlugins={[gfm]} children={detailDescription} />
      </div>
    </div>
  );
};

export default ModPage;