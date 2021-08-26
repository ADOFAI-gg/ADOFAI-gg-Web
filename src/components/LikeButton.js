import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const LikeButton = (likes) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const handleClick = () => setIsLiked(!isLiked);

  likes = typeof likes === "object" ? likes.likes : likes;

  return (
    <div
      className={`like-button ${isLiked ? "like-button-clicked" : ""}`}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faHeart} style={{ height: "12px" }} />
      {!isLiked ? "To be added" : "To be added!!"}
      {/* {isLiked ? Number(likes) + 1 : likes} */}
    </div>
  );
};

export default LikeButton;
