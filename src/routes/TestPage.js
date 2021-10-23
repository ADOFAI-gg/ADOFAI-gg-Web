import React, {
  // useRef,
  useState,
  // useEffect
} from "react";
import InfiniteLoading from "react-simple-infinite-loading";

const TestPage = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMore = () => {
    setTimeout(() => {
      setItems(
        items.concat(Array.from({ length: 25 }).map((_) => Math.random()))
      );

      setHasMore(items.length < 100000);
    }, 0);
  };

  return (
    <main>
      <div style={{ width: "100vw", height: "100vh" }}>
        <InfiniteLoading
          hasMoreItems={hasMore}
          itemHeight={84}
          loadMoreItems={fetchMore}
        >
          {items.map((item, index) => (
            <div
              key={item}
              style={{
                padding: "30px",
                fontSize: "1.2em",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <img
                className="level-item-info-difficulty"
                src={`difficulty_icons/${Math.floor(item * 22)}.svg`}
                alt={`Lv. ${Math.floor(item * 22)}`}
              />
              Ah my favorite level, #{index}!
            </div>
          ))}
        </InfiniteLoading>
      </div>
    </main>
  );
};

export default TestPage;
