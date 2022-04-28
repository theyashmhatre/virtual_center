import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getTotalLikes, like, unlike } from "../utilities/api/like";

export const Like = ({ typeId, postId }) => {
  const [totalLikes, setTotalLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    getTotalLikes(postId, typeId)
      .then(({ data }) => {
        setIsLiked(data.isLiked);
        setTotalLikes(data.noOfLikes);
      })
      .catch(() => {});
  }, []);

  const likeFunction = () => {
    if (!isLiked)
      like(postId, typeId)
        .then(() => {
          setIsLiked(true)
          setTotalLikes(totalLikes+1)
        })
        .catch(() => {});
    else
      unlike(postId, typeId)
        .then(() => {
          setIsLiked(false)
          setTotalLikes(totalLikes-1)
        })
        .catch(() => {});
  }

  return (
    <div className="flex">
      <div className="bg-green-500 text-white rounded-2xl mx-2 py-1 px-2 h-fit">
        {totalLikes}
      </div>
      <FontAwesomeIcon
        icon={faThumbsUp}
        size="2x"
        className="cursor-pointer"
        color={isLiked ? "green" : "black"}
        onClick={likeFunction}
      />
    </div>
  )
}