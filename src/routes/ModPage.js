import React from "react";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faUserCircle,
  faFileDownload,
  faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// Components
import LikeButton from "../components/global/LikeButton";

const markdownExample = `
## 기능

아래 기능들을 사용자가 활성화/비활성화할 수 있음.

- 레벨 에디터에서:
    - 첫 번째 타일에 이벤트 추가가 가능해짐
    - BPM, 피치 등 여러 값들의 한도를 제거
    - [mXparser의 math eval](https://mathparser.org/mxparser-math-collection/) 기능 제공:
        - 연산자 (더하기 +, 빼기 - , 곱하기 *, 나누기 /, 팩토리얼 !, 거듭제곱 ^ 등)
        - 삼각 함수 (sin, cos, tan 등)
        - e를 표현한 숫자 표현 (1e+10)
        - 수학에서 쓰이는 상수 (pi, e 등)
        - 비트 연산자 (앞에 \`@\`를 붙여 사용함, \`@~\`)
    - 허가된 아티스트를 추가할 경우, 아티스트 URL을 자동으로 추가함
    - \`Ctrl + Alt + , 또는 .\` 키를 사용했을 때 90° 대신 15°로 회전하게 하기

## 안내 사항

- \`v1.1.0-r73+\` 버전은 게임 버전 r71 이하와 호환되지 않음.
`;

const ModPage = () => {
  // detailModInfo must be ...
  const exampleModInfo = {
    id: 123,
    name: "oh no there are too many adofai tweaks22",
    version: "2.3.5",
    detailDescription: markdownExample,
    likes: "124780345",
    downloads: "1069",
    supportVersion: [
      "r75",
      "r76",
      "r77",
      "r78",
      "r79",
      "r80",
      "r81",
      "r82",
      "r83",
      "r84",
      "r85",
    ],
    category: "Level Editor",
    author: "PizzaLover007",
    updatedAt: new Date(),
    createdAt: new Date(-1),
    githubRepository: "https://github.com/",
  };

  const categoryIconDict = {
    Tweaks: "tweaks",
    "Game Play": "game_play",
    "Level Editor": "level_editor",
    "Text Edit": "text_edit",
    "Bug Fix": "bug_fix",
    "Planet Edit": "planet_edit",
    Library: "library",
    Other: "other",
  };

  const {
    /* id, */ name,
    version,
    detailDescription,
    likes,
    downloads,
    supportVersion,
    category,
    author,
    updatedAt,
    createdAt,
    githubRepository,
  } = exampleModInfo;
  const categoryIcon = categoryIconDict[category];

  return (
    <main>
      <header className="mod-info-feature">
        <div className="mod-info-feature-top">
          <div>
            <div className="mod-info-title">
              <img
                className="mod-info-category-icon"
                src={`/mod_icons/${categoryIcon}.svg`}
                alt="category icon"
              />
              <div className="mod-info-name">{name}</div>
              <div className="mod-info-version">v{version}</div>
            </div>
            <div className="mod-info-date">
              <div>Uploaded On {createdAt.toLocaleDateString()}</div>
              <div>Last Updated On {updatedAt.toLocaleDateString()}</div>
            </div>
          </div>
          <div className="mod-info-buttons">
            {githubRepository !== null ? (
              <a
                href={githubRepository}
                target="_blank"
                rel="noreferrer"
                className="mod-info-button"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            ) : null}

            <a href="#ay" target="_blank" className="mod-info-button">
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
                {supportVersion.map((version) => (
                  <span style={{ marginRight: "10px" }}>{version}</span>
                ))}
              </div>
            </div>
          </div>

          <LikeButton likes={likes} />
        </div>
      </header>

      <div className="mod-info-body">
        <ReactMarkdown unwrapDisallowed className="mod-info-markdown">
          {detailDescription}
        </ReactMarkdown>
      </div>
    </main>
  );
};

export default ModPage;
