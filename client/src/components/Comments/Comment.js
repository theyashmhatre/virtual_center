import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { downvoteComment, upvoteComment } from "../../utilities/api/comment";
import { DisplayPicture } from "../DisplayPicture";

const Comment = ({ typeId, comment }) => {
  const [isLiked, setIsLiked] = useState(!!comment.isUpvoted);
  const [totalLikes, setTotalLikes] = useState(comment.totalUpvotes || 0);

  const upvote = () => {
    if (!isLiked) {
      upvoteComment(comment.comment_id, typeId)
        .then(() => {
          setIsLiked(true);
          setTotalLikes(totalLikes + 1);
        })
        .catch((e) => console.log(e.response));
    } else {
      downvoteComment(comment.comment_id, typeId)
        .then(() => {
          setIsLiked(false);
          setTotalLikes(totalLikes - 1);
        })
        .catch((e) => console.log(e.response));
    };
  };

  return (
    <div className="flex xs:flex-col xs:items-center border-4 mt-2 p-3 xs:px-1">
      <div className="flex flex-col justify-center w-32 align-middle">
        <div className="flex justify-center w-full mb-3">
          <div className="bg-gray-200 rounded-full h-20 w-20">
            <DisplayPicture
              displayPicture={comment.display_picture}
              size="3x"
              boxSize={20}
            />
          </div>
        </div>
        <div className="text-center w-full">
          <p>{comment.employee_name}</p>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="m-2 mb-1 border-2 sm:text-sm">
          {comment.comment_text}
        </div>
        <div className="ml-2 text-xs text-gray-600">
          Posted on {new Date(comment.posted_on).toISOString().split("T")[0]}{" "}
          {new Date(comment.posted_on).toISOString().split("T")[1].split(".")[0]}
        </div>
        <div>
          <button
            className={`flex flex-row border-2 ${isLiked
              ? "bg-green-700"
              : "bg-pink-700"
            } text-white m-2 p-1 w-22`}
            onClick={upvote}
          >
            <div>Upvote</div>
            <FontAwesomeIcon icon={faThumbsUp} size="1x" className=" p-1" />
            <div className="bg-white text-pink-700 rounded-2xl mx-1 px-1">
              {totalLikes}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
